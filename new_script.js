// ==================== SMOOTH SCROLL ==================== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ==================== NAVBAR ACTIVE LINK ==================== 
const navLinks = document.querySelectorAll('.navbar-menu a');
const sections = document.querySelectorAll('section');

function updateActiveLink() {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (current && link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
    // Keep home active on home page
    const pathname = window.location.pathname.replace(/\\/g, '/');
    const isHomePage = pathname.endsWith('/pages/index.html') || pathname.endsWith('/new_index.html');
    if (isHomePage && (link.getAttribute('href').includes('index.html') || link.getAttribute('href').includes('new_index.html'))) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveLink);
updateActiveLink();

// ==================== INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS ==================== 
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.about-card, .project-card, .timeline-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ==================== SCROLL TO TOP BUTTON ==================== 
const createScrollToTopButton = () => {
  const button = document.createElement('button');
  button.innerHTML = '↑';
  button.className = 'scroll-to-top';
  button.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: white;
    color: black;
    border: 2px solid black;
    border-radius: 0;
    cursor: pointer;
    font-size: 24px;
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 999;
    transition: all 0.3s ease;
    box-shadow: none;
  `;

  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  button.addEventListener('mouseenter', () => {
    button.style.transform = 'translateY(-5px)';
    button.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
  });

  button.addEventListener('mouseleave', () => {
    button.style.transform = 'translateY(0)';
    button.style.boxShadow = 'none';
  });

  document.body.appendChild(button);

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      button.style.display = 'flex';
    } else {
      button.style.display = 'none';
    }
  });
};

createScrollToTopButton();

// ==================== PARALLAX EFFECT ==================== 
const parallaxElements = document.querySelectorAll('[data-parallax]');

if (parallaxElements.length > 0) {
  window.addEventListener('scroll', () => {
    parallaxElements.forEach(element => {
      const scrollPosition = window.pageYOffset;
      const elementOffset = element.offsetTop;
      const distance = scrollPosition - elementOffset;
      
      if (distance > -element.offsetHeight) {
        element.style.transform = `translateY(${distance * 0.5}px)`;
      }
    });
  });
}

// ==================== LOADING ANIMATION ==================== 
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '1';
});

// ==================== FORM VALIDATION (for future contact form) ==================== 
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// ==================== CONSOLE MESSAGE ==================== 
console.log('%c👋 Welcome to Tomoya Itagaki\'s Portfolio!', 'font-size: 16px; color: #667eea; font-weight: bold;');
console.log('%cMade with ❤️ and clean code', 'font-size: 12px; color: #764ba2;');

// ==================== PROJECT LIST FROM MANIFEST ====================
const loadProjectCards = async () => {
  const grid = document.getElementById('projects-grid');
  if (!grid) {
    return [];
  }

  const source = grid.dataset.source || 'content/projects.json';
  const pathname = window.location.pathname.replace(/\\/g, '/');
  const pageDepthPrefix = pathname.includes('/pages/projects/') ? '../../' : pathname.includes('/pages/') ? '../' : './';
  const resolveCardAsset = (assetPath) => {
    if (!assetPath) {
      return '';
    }

    try {
      return new URL(`${pageDepthPrefix}${assetPath}`, window.location.href).href;
    } catch {
      return assetPath;
    }
  };

  try {
    const response = await fetch(source);
    if (!response.ok) {
      throw new Error(`Failed to load ${source}`);
    }

    const projects = await response.json();
    grid.innerHTML = '';

    if (!Array.isArray(projects) || projects.length === 0) {
      grid.innerHTML = '<p class="projects-empty">表示できるプロジェクトがありません。</p>';
      return [];
    }

    projects.forEach(project => {
      const card = document.createElement('a');
      card.className = 'work-card';
      card.href = project.href || '#';
      card.dataset.tags = Array.isArray(project.tags) ? project.tags.join(',') : '';
      card.dataset.categories = Array.isArray(project.categories) ? project.categories.join(',') : (project.category || '');
      card.setAttribute('aria-label', `${project.title} の詳細へ`);

      const robot = document.createElement('div');
      robot.className = 'card-robot robot';
      robot.setAttribute('aria-hidden', 'true');

      const header = document.createElement('div');
      header.className = 'work-header';
      if (project.image) {
        header.classList.add('has-image');
        const image = document.createElement('img');
        image.src = resolveCardAsset(project.image);
        image.alt = project.imageAlt || project.title || '';
        image.className = 'work-header-image';
        header.appendChild(image);
      } else {
        header.style.background = project.headerStyle || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      }

      const content = document.createElement('div');
      content.className = 'work-content';

      const title = document.createElement('h3');
      title.textContent = project.title || '';

      const category = document.createElement('p');
      category.className = 'work-category';
      category.textContent = project.projectType || '';

      const description = document.createElement('p');
      description.className = 'work-description';
      description.textContent = project.description || '';

      const tags = document.createElement('div');
      tags.className = 'work-tags';
      (project.tags || []).forEach(tag => {
        const tagSpan = document.createElement('span');
        tagSpan.className = 'tag';
        tagSpan.textContent = tag;
        tags.appendChild(tagSpan);
      });

      content.append(title, category, description, tags);
      card.append(robot, header, content);
      grid.appendChild(card);
    });

    return projects;
  } catch (error) {
    console.error(error);
    grid.innerHTML = '<p class="projects-empty">プロジェクト一覧の読み込みに失敗しました。</p>';
    return [];
  }
};

document.addEventListener('DOMContentLoaded', () => {
  window.__projectCardsPromise = loadProjectCards();
});

// ==================== RANDOM TOIO BACKGROUND ====================
document.addEventListener('DOMContentLoaded', () => {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  if (document.getElementById('toio-background-layer')) {
    return;
  }

  const scriptElement = document.querySelector('script[src$="new_script.js"]');
  const toioImageSrc = scriptElement ? new URL('toio.svg', scriptElement.src).href : 'toio.svg';

  const layer = document.createElement('div');
  layer.id = 'toio-background-layer';
  document.body.prepend(layer);

  const robotCount = Math.max(14, Math.min(22, Math.round(window.innerWidth / 90)));

  const createRobot = ({ startX, startY, endX, endY, duration, opacity, size, repeat = true, fadeOut = true }) => {
    const robot = document.createElement('div');
    robot.className = 'toio-background-robot';

    const image = document.createElement('img');
    image.src = toioImageSrc;
    image.alt = '';
    image.setAttribute('aria-hidden', 'true');
    robot.appendChild(image);

    robot.style.left = '0';
    robot.style.top = '0';
    robot.style.width = `${size.toFixed(0)}px`;
    robot.style.setProperty('--from-x', `${startX}vw`);
    robot.style.setProperty('--from-y', `${startY}vh`);
    robot.style.setProperty('--to-x', `${endX}vw`);
    robot.style.setProperty('--to-y', `${endY}vh`);
    robot.style.setProperty('--robot-opacity', opacity.toFixed(2));
    robot.style.setProperty('--robot-opacity-end', fadeOut ? '0' : opacity.toFixed(2));
    robot.style.animationDuration = `${duration.toFixed(1)}s`;
    robot.style.animationDelay = `${(-(Math.random() * duration)).toFixed(1)}s`;
    robot.style.animationIterationCount = repeat ? 'infinite' : '1';
    robot.style.animationFillMode = repeat ? 'none' : 'forwards';

    if (!repeat) {
      robot.addEventListener('animationend', () => {
        robot.remove();
      }, { once: true });
    }

    layer.appendChild(robot);
    return robot;
  };

  for (let index = 0; index < robotCount; index++) {
    const startX = Math.random() * 100;
    const startY = 12 + Math.random() * 82;
    const travelX = 16 + Math.random() * 20;
    const travelY = 14 + Math.random() * 24;
    createRobot({
      startX,
      startY,
      endX: Math.min(112, startX + travelX),
      endY: Math.max(-8, startY - travelY),
      duration: 40 + Math.random() * 22,
      opacity: 0.05 + Math.random() * 0.05,
      size: 56 + Math.random() * 42,
      repeat: true
    });
  }

  const spawnFastSwarm = () => {
    const swarmDuration = 900;
    const swarmSize = 18;
    const clusterStartX = -8 + Math.random() * 6;
    const clusterStartY = 18 + Math.random() * 58;
    const clusterSpreadX = 1.6 + Math.random() * 2.4;
    const clusterSpreadY = 1.0 + Math.random() * 2.0;
    for (let index = 0; index < swarmSize; index++) {
      const stagger = index * (swarmDuration / Math.max(1, swarmSize - 1));
      window.setTimeout(() => {
        const startX = clusterStartX + (Math.random() - 0.5) * clusterSpreadX;
        const startY = clusterStartY + (Math.random() - 0.5) * clusterSpreadY;
        const travelX = 116 + Math.random() * 10;
        const travelY = 2 + Math.random() * 14;
        createRobot({
          startX,
          startY,
          endX: Math.min(112, startX + travelX),
          endY: Math.max(-10, startY - travelY),
          duration: 1.5 + Math.random() * 0.6,
          opacity: 0.12 + Math.random() * 0.07,
          size: 54 + Math.random() * 26,
          repeat: false,
          fadeOut: false
        });
      }, stagger);
    }
  };

  const createSwarmButton = () => {
    let button = document.getElementById('toio-swarm-button');
    let note = document.getElementById('toio-swarm-note');

    if (!button) {
      button = document.createElement('button');
      button.id = 'toio-swarm-button';
      button.type = 'button';
      button.className = 'toio-swarm-button';
      button.textContent = '群れを出す';
    }

    if (!note) {
      note = document.createElement('div');
      note.id = 'toio-swarm-note';
      note.className = 'toio-swarm-note';
      note.textContent = '特に意味はないです';
      note.setAttribute('role', 'status');
      note.setAttribute('aria-live', 'polite');
    }

    button.title = '特に意味はありません';
    button.setAttribute('aria-label', '特に意味はありません');

    if (button.dataset.swarmBound === 'true') {
      return;
    }

    button.dataset.swarmBound = 'true';

    button.addEventListener('click', () => {
      if (button.classList.contains('is-disabled')) {
        return;
      }

      note.classList.remove('is-visible');
      window.requestAnimationFrame(() => {
        note.classList.add('is-visible');
      });
      window.clearTimeout(note.hideTimer);
      note.hideTimer = window.setTimeout(() => {
        note.classList.remove('is-visible');
      }, 1800);

      button.classList.add('is-disabled');
      spawnFastSwarm();
      window.setTimeout(() => {
        button.classList.remove('is-disabled');
      }, 3200);
    });

    if (!button.parentElement) {
      const anchor = document.querySelector('.toio-swarm-actions') || document.querySelector('.markdown-page .container') || document.body;
      anchor.prepend(button);
    }

    if (!note.parentElement) {
      const anchor = button.parentElement || document.querySelector('.toio-swarm-actions') || document.querySelector('.markdown-page .container') || document.body;
      anchor.appendChild(note);
    }
  };

  createSwarmButton();
});

// ==================== FILTER TABS & ROBOT DELIVERY ====================
document.addEventListener('DOMContentLoaded', async () => {
  const filterButtons = document.querySelectorAll('.filter-btn');

  await (window.__projectCardsPromise || Promise.resolve([]));

  function setActiveButton(activeBtn) {
    filterButtons.forEach(b => b.classList.toggle('active', b === activeBtn));
  }

  function applyFilter(filter) {
    const cards = document.querySelectorAll('.work-card');
    cards.forEach(card => {
      const tags = card.dataset.tags ? card.dataset.tags.split(',').map(s => s.trim()) : [];
      const categories = card.dataset.categories ? card.dataset.categories.split(',').map(s => s.trim()) : [];
      const robotEl = card.querySelector('.robot');
      if (filter === 'all' || tags.includes(filter) || categories.includes(filter)) {
        card.classList.remove('filtered-out');
        card.classList.remove('delivered');
        card.classList.remove('on-robot');
        if (robotEl) {
          robotEl.classList.remove('retreat');
          robotEl.classList.remove('attention');
        }
      } else {
        card.classList.add('filtered-out');
        card.classList.remove('delivered');
        card.classList.remove('on-robot');
        if (robotEl) {
          robotEl.classList.add('retreat');
          robotEl.classList.remove('attention');
        }
      }
    });
  }

  async function animateVisible() {
    const visible = Array.from(document.querySelectorAll('.work-card:not(.filtered-out)'));
    for (let i = 0; i < visible.length; i++) {
      const card = visible[i];
      const robotEl = card.querySelector('.robot');
      if (!robotEl) continue;
      // approach: only robot attention (no card vertical motion)
      robotEl.classList.remove('retreat');
      robotEl.classList.add('attention');
      await new Promise(r => setTimeout(r, 380));
      robotEl.classList.remove('attention');
      // ensure card is marked delivered
      card.classList.add('delivered');
      await new Promise(r => setTimeout(r, 90));
    }
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const filter = btn.dataset.filter;
      setActiveButton(btn);

      const cards = Array.from(document.querySelectorAll('.work-card'));
      const matching = cards.filter(card => {
        const tags = card.dataset.tags ? card.dataset.tags.split(',').map(s => s.trim()) : [];
        const categories = card.dataset.categories ? card.dataset.categories.split(',').map(s => s.trim()) : [];
        return filter === 'all' || tags.includes(filter) || categories.includes(filter);
      });

      // 1) Lock grid height so footer won't jump, then make all cards escape left (staggered)
      const grid = document.querySelector('.works-grid');
      const prevHeight = grid ? grid.offsetHeight : null;
      if (grid && prevHeight) grid.style.minHeight = prevHeight + 'px';

      cards.forEach((card, idx) => {
        const robot = card.querySelector('.robot');
        if (robot) robot.classList.add('retreat');
        setTimeout(() => {
          card.classList.add('escape-left');
          card.classList.remove('delivered', 'on-robot');
        }, idx * 50);
      });

      // 2) After all have escaped, hide them and bring matching ones from right
      const escapeWait = cards.length * 50 + 420;
      await new Promise(r => setTimeout(r, escapeWait));

      // mark all as filtered-out and clear escape-left
      cards.forEach(card => {
        card.classList.add('filtered-out');
        card.classList.remove('escape-left');
      });

      // small delay before bringing matching ones from right
      await new Promise(r => setTimeout(r, 120));

      // bring matching cards from right (staggered)
      // Show matching cards quickly and simultaneously
      matching.forEach((card) => {
        card.classList.remove('filtered-out');
        card.classList.add('offscreen-right');
        const robot = card.querySelector('.robot');
        if (robot) {
          robot.classList.remove('retreat');
          robot.classList.remove('attention');
        }
      });
      // remove offscreen class for all at once (fast simultaneous entrance)
      setTimeout(() => {
        matching.forEach(card => {
          card.classList.remove('offscreen-right');
          card.classList.add('delivered');
        });
      }, 120);

      // wait for entrance of matching ones then run robot attention
      const enterWait = matching.length * 120 + 380;
      await new Promise(r => setTimeout(r, enterWait));
          // if (matching.length > 0) await animateVisible();

      // clear the locked grid height so page can reflow normally
      if (grid) {
        // allow a slight delay so final transitions finish
        setTimeout(() => { grid.style.minHeight = ''; }, 160);
      }
    });
  });

  // initial load
  applyFilter('all');
  // entrance: make cards come from off-screen together with their robots
  async function animateEntrance() {
    const visible = Array.from(document.querySelectorAll('.work-card:not(.filtered-out)'));
    // mark all as offscreen-right first (enter from right)
    visible.forEach(card => card.classList.add('offscreen-right'));
    // force reflow
    void document.body.offsetHeight;
    // Remove offscreen class for all at once to make entrance simultaneous and faster
    setTimeout(() => {
      visible.forEach(card => {
        card.classList.remove('offscreen-right');
        card.classList.add('delivered');
      });
    }, 120);
    // short wait for transitions to finish
    return new Promise(r => setTimeout(r, 320));
  }

  // run entrance; do not trigger card vertical motions afterward
  animateEntrance();
});

// Expose layout configuration helpers so the user can change spacing from code
document.addEventListener('DOMContentLoaded', () => {
  window.layoutConfig = {
    setVar(name, value) {
      if (!name.startsWith('--')) name = `--${name}`;
      document.documentElement.style.setProperty(name, value);
    },
    setCardVerticalGap(px) { document.documentElement.style.setProperty('--card-vertical-gap', typeof px === 'number' ? px + 'px' : px); },
    setCardMinWidth(px) { document.documentElement.style.setProperty('--card-min-width', typeof px === 'number' ? px + 'px' : px); },
    setRobotGap(px) { document.documentElement.style.setProperty('--robot-gap', typeof px === 'number' ? px + 'px' : px); },
    setCardLowerOffset(px) { document.documentElement.style.setProperty('--card-lower-offset', typeof px === 'number' ? px + 'px' : px); },
    setRobotSize(px) { document.documentElement.style.setProperty('--robot-size', typeof px === 'number' ? px + 'px' : px); },
    setRobotWidth(px) { document.documentElement.style.setProperty('--robot-width', typeof px === 'number' ? px + 'px' : px); },
    getVar(name) { if (!name.startsWith('--')) name = `--${name}`; return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }
  };
});

