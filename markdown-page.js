document.addEventListener('DOMContentLoaded', async () => {
  const outputElement = document.getElementById('markdown-output');

  if (!outputElement) {
    return;
  }

  let markdown = '';
  const pathname = window.location.pathname.replace(/\\/g, '/');
  const pageDepthPrefix = pathname.includes('/pages/projects/') ? '../../' : pathname.includes('/pages/') ? '../' : './';

  const resolveAssetUrl = (value) => {
    if (!value) {
      return value;
    }

    if (/^(https?:|data:|mailto:|tel:|#|\/)/i.test(value)) {
      return value;
    }

    try {
      return new URL(`${pageDepthPrefix}${value}`, window.location.href).href;
    } catch {
      return value;
    }
  };

  const rewriteAssetUrlsInHtml = (html) => html
    .replace(/\b(src|href)=("|')([^"']+)\2/gi, (match, attr, quote, value) => {
      return `${attr}=${quote}${resolveAssetUrl(value)}${quote}`;
    });

  // Try to get markdown from data-file attribute (external file)
  const dataFile = outputElement.dataset.file;
  if (dataFile) {
    try {
      const response = await fetch(dataFile);
      if (response.ok) {
        markdown = await response.text();
      } else {
        console.error(`Failed to load markdown file: ${dataFile}`);
        return;
      }
    } catch (error) {
      console.error(`Error loading markdown file: ${error}`);
      return;
    }
  } else {
    // Fall back to inline markdown in <script type="text/markdown" id="markdown-source">
    const sourceElement = document.getElementById('markdown-source');
    if (!sourceElement) {
      return;
    }
    markdown = sourceElement.textContent.replace(/^\s+|\s+$/g, '');
  }

  outputElement.innerHTML = renderMarkdown(markdown);

  function renderMarkdown(input) {
    const lines = input.split(/\r?\n/);
    const html = [];
    const stack = [];
    let inCodeBlock = false;
    let codeBuffer = [];

    const closeLists = () => {
      while (stack.length && (stack[stack.length - 1] === 'ul' || stack[stack.length - 1] === 'ol')) {
        html.push(`</${stack.pop()}>`);
      }
    };

    const escapeHtml = (value) => value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

    const formatInline = (value) => {
      let output = escapeHtml(value);
      output = output.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      output = output.replace(/__(.+?)__/g, '<strong>$1</strong>');
      output = output.replace(/\*(.+?)\*/g, '<em>$1</em>');
      output = output.replace(/_(.+?)_/g, '<em>$1</em>');
      output = output.replace(/`(.+?)`/g, '<code>$1</code>');
      output = output.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, url) => `<a href="${resolveAssetUrl(url)}" target="_blank" rel="noopener noreferrer">${text}</a>`);
      return output;
    };

    for (const rawLine of lines) {
      const line = rawLine.trimEnd();
      const trimmed = line.trim();

      if (trimmed.startsWith('```')) {
        if (inCodeBlock) {
          html.push(`<pre class="markdown-code"><code>${escapeHtml(codeBuffer.join('\n'))}</code></pre>`);
          codeBuffer = [];
          inCodeBlock = false;
        } else {
          closeLists();
          inCodeBlock = true;
        }
        continue;
      }

      if (inCodeBlock) {
        codeBuffer.push(rawLine);
        continue;
      }

      if (!trimmed) {
        closeLists();
        continue;
      }

      if (/^<[^>]+>/.test(trimmed)) {
        closeLists();
        html.push(rewriteAssetUrlsInHtml(trimmed));
        continue;
      }

      const headingMatch = trimmed.match(/^(#{1,3})\s+(.*)$/);
      if (headingMatch) {
        closeLists();
        const level = headingMatch[1].length + 1;
        html.push(`<h${level} class="markdown-heading level-${level}">${formatInline(headingMatch[2])}</h${level}>`);
        continue;
      }

      const unorderedMatch = trimmed.match(/^[-*+]\s+(.*)$/);
      if (unorderedMatch) {
        if (stack[stack.length - 1] !== 'ul') {
          closeLists();
          stack.push('ul');
          html.push('<ul class="markdown-list">');
        }
        html.push(`<li>${formatInline(unorderedMatch[1])}</li>`);
        continue;
      }

      const orderedMatch = trimmed.match(/^\d+\.\s+(.*)$/);
      if (orderedMatch) {
        if (stack[stack.length - 1] !== 'ol') {
          closeLists();
          stack.push('ol');
          html.push('<ol class="markdown-list">');
        }
        html.push(`<li>${formatInline(orderedMatch[1])}</li>`);
        continue;
      }

      closeLists();
      html.push(`<p>${formatInline(trimmed)}</p>`);
    }

    if (inCodeBlock) {
      html.push(`<pre class="markdown-code"><code>${escapeHtml(codeBuffer.join('\n'))}</code></pre>`);
    }

    closeLists();
    return html.join('\n');
  }
});
