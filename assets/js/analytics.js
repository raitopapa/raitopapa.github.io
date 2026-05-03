(function () {
  const GA_MEASUREMENT_ID = 'G-RFMM494C4W';
  const CONSENT_KEY = 'arborist-analytics-consent';
  const isConfigured = /^G-[A-Z0-9]+$/.test(GA_MEASUREMENT_ID) && !GA_MEASUREMENT_ID.includes('REPLACE');

  function injectBanner() {
    if (window.ARBORIST_ANALYTICS_SUPPRESS_BANNER) return;
    if (!isConfigured || localStorage.getItem(CONSENT_KEY)) return;

    const style = document.createElement('style');
    style.textContent = [
      '.analytics-consent{position:fixed;left:16px;right:16px;bottom:16px;z-index:500;background:#2C1A0E;color:#F5F0E8;border:1px solid rgba(255,255,255,.18);border-radius:6px;padding:14px 16px;box-shadow:0 12px 32px rgba(0,0,0,.24);font-family:system-ui,-apple-system,BlinkMacSystemFont,"Noto Sans JP",sans-serif;display:flex;gap:12px;align-items:center;justify-content:space-between;max-width:760px;margin:0 auto;}',
      '.analytics-consent p{margin:0;font-size:12px;line-height:1.7;}',
      '.analytics-consent div{display:flex;gap:8px;flex-shrink:0;}',
      '.analytics-consent button{border:1px solid rgba(255,255,255,.35);border-radius:3px;padding:8px 12px;font-size:12px;cursor:pointer;background:transparent;color:#F5F0E8;}',
      '.analytics-consent button[data-accept]{background:#7AAE6E;border-color:#7AAE6E;color:#1A1208;font-weight:700;}',
      '@media(max-width:560px){.analytics-consent{flex-direction:column;align-items:flex-start}.analytics-consent div{width:100%}.analytics-consent button{flex:1}}'
    ].join('');
    document.head.appendChild(style);

    const banner = document.createElement('section');
    banner.className = 'analytics-consent';
    banner.setAttribute('aria-label', 'アクセス解析の同意');
    banner.innerHTML = '<p>サイト改善のため、匿名の利用状況を Google Analytics で計測します。位置情報・写真・入力内容は送信しません。</p><div><button type="button" data-decline>拒否</button><button type="button" data-accept>同意する</button></div>';
    document.body.appendChild(banner);

    banner.querySelector('[data-accept]').addEventListener('click', () => {
      localStorage.setItem(CONSENT_KEY, 'granted');
      banner.remove();
      loadGA();
    });
    banner.querySelector('[data-decline]').addEventListener('click', () => {
      localStorage.setItem(CONSENT_KEY, 'denied');
      banner.remove();
    });
  }

  function loadGA() {
    if (!isConfigured || localStorage.getItem(CONSENT_KEY) !== 'granted' || window.gtag) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      send_page_view: true
    });

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_MEASUREMENT_ID);
    document.head.appendChild(script);
  }

  window.trackToolEvent = function (eventName, params) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', eventName, Object.assign({
      page_path: location.pathname
    }, params || {}));
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (localStorage.getItem(CONSENT_KEY) === 'granted') loadGA();
      injectBanner();
    });
  } else {
    if (localStorage.getItem(CONSENT_KEY) === 'granted') loadGA();
    injectBanner();
  }
})();
