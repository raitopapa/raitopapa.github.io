(() => {
  const FORM_URL = 'https://preview.mailerlite.io/forms/2314734/186533995281908738/share';
  const EXCLUDED = new Set(['/contact.html', '/privacy.html']);

  function currentPath() {
    const path = window.location.pathname || '/';
    if (path === '/') return '/';
    return path.endsWith('/') ? path : path.replace(/\/index\.html$/, '/');
  }

  function injectStyle() {
    if (document.getElementById('newsletter-style')) return;
    const style = document.createElement('style');
    style.id = 'newsletter-style';
    style.textContent = `
      [data-newsletter-cta] {
        max-width: 1040px;
        margin: 34px auto;
        padding: 0 clamp(18px, 4vw, 32px);
      }
      .newsletter-panel {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: 18px;
        align-items: center;
        border: 1px solid #D4DFD0;
        border-radius: 6px;
        background: linear-gradient(135deg, #E8F0E1, #fffdf8);
        padding: 22px;
      }
      .newsletter-kicker {
        margin: 0 0 7px;
        color: #3D5A3E;
        font-size: 11px;
        font-weight: 900;
        letter-spacing: .14em;
        text-transform: uppercase;
      }
      .newsletter-panel h2 {
        margin: 0 0 8px;
        color: #1A1208;
        font-size: 22px;
        line-height: 1.4;
      }
      .newsletter-panel p {
        margin: 0;
        color: #4d5d4d;
        font-size: 14px;
        line-height: 1.8;
      }
      .newsletter-button {
        min-height: 44px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        background: #3D5A3E;
        color: #fff;
        padding: 10px 16px;
        text-decoration: none;
        font-size: 14px;
        font-weight: 900;
        white-space: nowrap;
      }
      .newsletter-button:hover { background: #2C1A0E; }
      @media (max-width: 780px) {
        .newsletter-panel { grid-template-columns: 1fr; }
        .newsletter-button { width: 100%; }
      }
    `;
    document.head.appendChild(style);
  }

  function ensureMount() {
    const existing = document.querySelector('[data-newsletter-cta]');
    if (existing) return existing;

    const mount = document.createElement('aside');
    mount.setAttribute('data-newsletter-cta', '');
    const target =
      document.querySelector('[data-internal-links]') ||
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

  function render() {
    const path = currentPath();
    if (EXCLUDED.has(path)) return;

    const mount = ensureMount();
    if (!mount || mount.dataset.rendered === 'true') return;
    mount.dataset.rendered = 'true';

    const panel = document.createElement('div');
    panel.className = 'newsletter-panel';
    panel.innerHTML = `
      <div>
        <p class="newsletter-kicker">Seasonal Reminder</p>
        <h2>樹木ナビ 季節リマインダー</h2>
        <p>剪定時期、病害虫の注意、台風前点検など、季節ごとの樹木管理ポイントをメールで受け取れます。</p>
      </div>
      <a class="newsletter-button" href="${FORM_URL}" target="_blank" rel="noopener">無料で登録する</a>
    `;
    mount.appendChild(panel);
    injectStyle();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
