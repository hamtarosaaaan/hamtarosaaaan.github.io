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
    if (window.location.pathname.includes('new_index.html') && link.getAttribute('href').includes('new_index.html')) {
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
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 24px;
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 999;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
  `;

  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  button.addEventListener('mouseenter', () => {
    button.style.transform = 'translateY(-5px)';
    button.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.4)';
  });

  button.addEventListener('mouseleave', () => {
    button.style.transform = 'translateY(0)';
    button.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.3)';
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

// ==================== FILTER TABS & ROBOT DELIVERY ====================
document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');

  function setActiveButton(activeBtn) {
    filterButtons.forEach(b => b.classList.toggle('active', b === activeBtn));
  }

  function applyFilter(filter) {
    const cards = document.querySelectorAll('.work-card');
    cards.forEach(card => {
      const tags = card.dataset.tags ? card.dataset.tags.split(',').map(s => s.trim()) : [];
      const robotEl = card.querySelector('.robot');
      if (filter === 'all' || tags.includes(filter)) {
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
        return filter === 'all' || tags.includes(filter);
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
      matching.forEach((card, idx) => {
        // prepare as offscreen-right then remove to animate in
        card.classList.remove('filtered-out');
        card.classList.add('offscreen-right');
        // ensure robot is reset
        const robot = card.querySelector('.robot');
        if (robot) {
          robot.classList.remove('retreat');
          robot.classList.remove('attention');
        }
        setTimeout(() => {
          card.classList.remove('offscreen-right');
          card.classList.add('delivered');
        }, idx * 120 + 160);
      });

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
    for (let i = 0; i < visible.length; i++) {
      const card = visible[i];
      // stagger a bit more for a slower, smoother entrance
      setTimeout(() => {
        card.classList.remove('offscreen-right');
        card.classList.add('delivered');
      }, i * 260 + 180);
    }
    // wait until last animation likely finished
    const wait = visible.length * 140 + 700;
    return new Promise(r => setTimeout(r, wait));
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
