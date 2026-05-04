(() => {
  const DATA_URL = '/assets/data/internal-links.json';

  function normalizePath(pathname) {
    if (pathname === '/') return '/';
    return pathname.endsWith('/') ? pathname : pathname.replace(/\/index\.html$/, '/');
  }

  function currentKey() {
    const path = normalizePath(window.location.pathname);
    if (path.startsWith('/blog/') && path !== '/blog/') return 'blog-post';
    return path;
  }

  function createLink(item) {
    const link = document.createElement('a');
    link.href = item.url;
    link.textContent = item.title;
    return link;
  }

  function appendGroup(root, title, items) {
    if (!items.length) return;
    const section = document.createElement('section');
    section.className = 'internal-link-group';
    const heading = document.createElement('h3');
    heading.textContent = title;
    section.appendChild(heading);
    const list = document.createElement('div');
    list.className = 'internal-link-list';
    items.forEach(item => list.appendChild(createLink(item)));
    section.appendChild(list);
    root.appendChild(section);
  }

  function resolveItems(keys, source) {
    const current = normalizePath(window.location.pathname);
    return (keys || [])
      .map(key => source[key])
      .filter(item => item && normalizePath(new URL(item.url, window.location.origin).pathname) !== current);
  }

  function ensureMount() {
    const existing = document.querySelector('[data-internal-links]');
    if (existing) return existing;

    const mount = document.createElement('aside');
    mount.setAttribute('data-internal-links', '');
    const target =
      document.querySelector('.ref-section') ||
      document.querySelector('footer') ||
      document.body.lastElementChild;

    if (target && target.parentNode) {
      target.parentNode.insertBefore(mount, target);
    } else {
      document.body.appendChild(mount);
    }
    return mount;
  }

  function injectStyle() {
    if (document.getElementById('internal-links-style')) return;
    const style = document.createElement('style');
    style.id = 'internal-links-style';
    style.textContent = `
      [data-internal-links] {
        max-width: 1040px;
        margin: 34px auto;
        padding: 0 clamp(18px, 4vw, 32px);
      }
      .internal-links-panel {
        border: 1px solid #D4DFD0;
        border-radius: 6px;
        background: #fffdf8;
        padding: 22px;
      }
      .internal-links-panel > h2 {
        margin: 0 0 16px;
        color: #1A1208;
        font-size: 19px;
        line-height: 1.45;
      }
      .internal-link-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 16px;
      }
      .internal-link-group h3 {
        margin: 0 0 10px;
        color: #3D5A3E;
        font-size: 13px;
        line-height: 1.4;
      }
      .internal-link-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .internal-link-list a {
        display: block;
        border: 1px solid #D4DFD0;
        border-radius: 4px;
        background: #F5F0E8;
        color: #2C1A0E;
        padding: 9px 10px;
        text-decoration: none;
        font-size: 12px;
        font-weight: 700;
        line-height: 1.45;
      }
      .internal-link-list a:hover {
        border-color: #3D5A3E;
        color: #3D5A3E;
      }
      @media (max-width: 780px) {
        .internal-link-grid { grid-template-columns: 1fr; }
      }
    `;
    document.head.appendChild(style);
  }

  function render(data) {
    const page = data.pages[currentKey()] || data.pages[normalizePath(window.location.pathname)];
    if (!page) return;

    const mount = ensureMount();
    if (!mount || mount.dataset.rendered === 'true') return;
    mount.dataset.rendered = 'true';

    const panel = document.createElement('div');
    panel.className = 'internal-links-panel';
    const heading = document.createElement('h2');
    heading.textContent = '関連情報';
    panel.appendChild(heading);

    const grid = document.createElement('div');
    grid.className = 'internal-link-grid';
    appendGroup(grid, '関連記事', resolveItems(page.articles, data.articles));
    appendGroup(grid, '関連用語', resolveItems(page.glossary, data.glossary));
    appendGroup(grid, '関連ツール', resolveItems(page.tools, data.tools));

    if (!grid.children.length) return;
    panel.appendChild(grid);
    mount.appendChild(panel);
    injectStyle();
  }

  fetch(DATA_URL, { cache: 'no-cache' })
    .then(response => response.ok ? response.json() : null)
    .then(data => { if (data) render(data); })
    .catch(() => {});
})();
