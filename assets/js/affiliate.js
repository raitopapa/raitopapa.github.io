(function () {
  const AMAZON_ASSOCIATE_TAG = '';
  const RAKUTEN_AFFILIATE_ID = '';

  const catalog = {
    'diagnosis.html': [
      { name: '園芸用手袋', query: '園芸用 手袋 防虫 作業', note: '病害虫確認時の素手接触を避ける' },
      { name: '剪定ばさみ', query: '剪定ばさみ 園芸 枝切り', note: '被害枝の除去や軽剪定に' },
      { name: '防虫ネット', query: '防虫ネット 園芸 樹木', note: '若木や低木の食害対策に' }
    ],
    'pruning.html': [
      { name: '剪定ばさみ', query: '剪定ばさみ プロ 園芸', note: '細枝の基本剪定に' },
      { name: '高枝切りばさみ', query: '高枝切りばさみ 伸縮', note: '届きにくい枝の軽作業に' },
      { name: '剪定のこぎり', query: '剪定のこぎり 枝打ち', note: '太枝の切断に' }
    ],
    'checklist.html': [
      { name: '巻尺・直径メジャー', query: '樹木 直径 メジャー 巻尺', note: 'DBHや根元周囲の記録に' },
      { name: 'ヘルメット', query: '作業用 ヘルメット 軽量', note: '落枝リスクのある現場確認に' },
      { name: '防水クリップボード', query: '防水 クリップボード 野外', note: '現地チェック記録に' }
    ],
    'traq.html': [
      { name: 'レーザー距離計', query: 'レーザー距離計 屋外 測定', note: '対象物との距離確認に' },
      { name: '双眼鏡', query: '双眼鏡 軽量 野鳥 観察', note: '樹冠・枯枝の遠望確認に' },
      { name: '安全ベスト', query: '反射ベスト 作業用', note: '道路沿い調査の視認性確保に' }
    ],
    'ctla.html': [
      { name: '直径メジャー', query: '直径メジャー 樹木 DBH', note: '幹径計測の精度向上に' },
      { name: 'レーザー距離計', query: 'レーザー距離計 高さ 測定', note: '樹高・離隔確認の補助に' },
      { name: '樹木図鑑', query: '樹木 図鑑 日本 庭木', note: '樹種確認・説明資料に' }
    ],
    'survey.html': [
      { name: 'モバイルバッテリー', query: 'モバイルバッテリー 大容量 屋外', note: 'GPS・地図利用時の電源確保に' },
      { name: '防水スマホケース', query: '防水 スマホケース 屋外 作業', note: '雨天・水場の現地調査に' },
      { name: 'ラベルシール', query: '耐水 ラベル シール QRコード', note: '樹木ID・QR管理の準備に' }
    ]
  };

  function encode(value) {
    return encodeURIComponent(value).replace(/%20/g, '+');
  }

  function amazonUrl(query) {
    const base = 'https://www.amazon.co.jp/s?k=' + encode(query);
    return AMAZON_ASSOCIATE_TAG ? base + '&tag=' + encodeURIComponent(AMAZON_ASSOCIATE_TAG) : base;
  }

  function rakutenUrl(query) {
    const base = 'https://search.rakuten.co.jp/search/mall/' + encodeURIComponent(query) + '/';
    return RAKUTEN_AFFILIATE_ID ? base + '?scid=af_pc_etc&sc2id=af_' + encodeURIComponent(RAKUTEN_AFFILIATE_ID) : base;
  }

  function currentPage() {
    const path = location.pathname.split('/').pop();
    return path || 'index.html';
  }

  function render(items) {
    const section = document.createElement('section');
    section.className = 'affiliate-section no-print';
    section.innerHTML = [
      '<div class="affiliate-head">',
      '<span class="affiliate-label">PR</span>',
      '<h2>現地作業に役立つ道具</h2>',
      '</div>',
      '<p class="affiliate-note">道具選びの参考リンクです。一部リンクは Amazon アソシエイト・楽天アフィリエイトを含む場合があります。</p>',
      '<div class="affiliate-grid">',
      items.map(item => [
        '<article class="affiliate-card">',
        '<h3>' + item.name + '</h3>',
        '<p>' + item.note + '</p>',
        '<div class="affiliate-links">',
        '<a href="' + amazonUrl(item.query) + '" target="_blank" rel="sponsored noopener">Amazonで探す</a>',
        '<a href="' + rakutenUrl(item.query) + '" target="_blank" rel="sponsored noopener">楽天で探す</a>',
        '</div>',
        '</article>'
      ].join('')).join(''),
      '</div>'
    ].join('');
    return section;
  }

  function injectStyles() {
    if (document.getElementById('affiliate-style')) return;
    const style = document.createElement('style');
    style.id = 'affiliate-style';
    style.textContent = [
      '.affiliate-section{margin:28px 0;padding:22px 24px;background:rgba(255,255,255,.72);border:1px solid var(--mist,#D4DFD0);border-radius:4px;}',
      '.affiliate-head{display:flex;align-items:center;gap:10px;margin-bottom:8px;}',
      '.affiliate-label{font-family:monospace;font-size:10px;letter-spacing:.12em;background:var(--amber,#C8842A);color:white;border-radius:2px;padding:3px 7px;}',
      '.affiliate-section h2{font-family:"Shippori Mincho",serif;font-size:15px;color:var(--bark,#2C1A0E);margin:0;}',
      '.affiliate-note{font-size:11px;line-height:1.7;color:#6b7e6b;margin:0 0 14px;}',
      '.affiliate-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;}',
      '.affiliate-card{border:1px solid var(--mist,#D4DFD0);background:var(--cream,#F5F0E8);border-radius:4px;padding:14px;}',
      '.affiliate-card h3{font-family:"Shippori Mincho",serif;font-size:14px;color:var(--bark,#2C1A0E);margin:0 0 6px;}',
      '.affiliate-card p{font-size:11px;line-height:1.7;color:#5a6e5a;margin:0 0 12px;}',
      '.affiliate-links{display:flex;gap:8px;flex-wrap:wrap;}',
      '.affiliate-links a{font-size:11px;text-decoration:none;color:var(--moss,#3D5A3E);border:1px solid var(--moss-l,#5A7A5B);border-radius:3px;padding:6px 9px;background:white;}',
      '@media print{.affiliate-section{display:none!important;}}'
    ].join('');
    document.head.appendChild(style);
  }

  document.addEventListener('DOMContentLoaded', function () {
    const items = catalog[currentPage()];
    if (!items) return;
    const anchor = document.querySelector('.ref-section') || document.querySelector('footer');
    if (!anchor) return;
    injectStyles();
    anchor.insertAdjacentElement('afterend', render(items));
  });
})();
