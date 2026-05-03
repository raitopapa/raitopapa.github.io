// 樹木医ツール Service Worker v3.3
const CACHE_NAME = 'arborist-tools-v3.3';

// オフラインでキャッシュするファイル
const CACHE_FILES = [
  '/',
  '/index.html',
  '/diagnosis.html',
  '/pruning.html',
  '/checklist.html',
  '/traq.html',
  '/ctla.html',
  '/survey.html',
  '/privacy.html',
  '/contact.html',
  '/assets/css/layout.css',
  '/assets/js/analytics.js',
  '/assets/js/affiliate.js',
  '/assets/js/layout.js',
  '/assets/partials/langbar.html',
  '/assets/partials/navbar.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

// インストール：キャッシュを構築
self.addEventListener('install', event => {
  console.log('[SW] Installing v3.3...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Google Fontsなど外部リソースは失敗してもOK
      return cache.addAll(
        CACHE_FILES.filter(f => !f.startsWith('https://fonts.googleapis'))
      ).then(() => {
        // Fontsは個別にtry
        return cache.add('https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;600;800&family=Noto+Serif+JP:wght@400;500&family=DM+Mono:wght@400;500&display=swap')
          .catch(() => console.log('[SW] Google Fonts cache skipped (offline install)'));
      });
    }).then(() => self.skipWaiting())
  );
});

// アクティベート：古いキャッシュを削除
self.addEventListener('activate', event => {
  console.log('[SW] Activating v3.3...');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          })
      )
    ).then(() => self.clients.claim())
  );
});

// フェッチ：Cache First戦略（オフライン優先）
self.addEventListener('fetch', event => {
  // POSTリクエストはキャッシュしない
  if (event.request.method !== 'GET') return;

  // AdSenseなど広告リクエストはキャッシュしない
  const url = event.request.url;
  if (url.includes('googlesyndication') || url.includes('googletagmanager') || url.includes('doubleclick')) {
    return;
  }

  // HTMLは常にネットワーク優先。問い合わせフォーム等の更新が古いキャッシュで残る事故を防ぐ。
  if (event.request.destination === 'document') {
    event.respondWith(
      fetch(event.request)
        .then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => caches.match(event.request).then(cached => cached || caches.match('/index.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        // キャッシュヒット：バックグラウンドで更新（stale-while-revalidate）
        const fetchPromise = fetch(event.request)
          .then(networkResponse => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, responseClone);
              });
            }
            return networkResponse;
          })
          .catch(() => cached); // ネットワーク失敗時はキャッシュを使用
        return cached; // まずキャッシュを即返す
      }

      // キャッシュミス：ネットワークから取得してキャッシュに保存
      return fetch(event.request)
        .then(networkResponse => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type === 'opaque') {
            return networkResponse;
          }
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
          return networkResponse;
        })
        .catch(() => {
          // 完全オフライン時はオフラインページを返す
          if (event.request.destination === 'document') {
            return caches.match('/index.html');
          }
        });
    })
  );
});

// バックグラウンド同期（将来の拡張用）
self.addEventListener('sync', event => {
  console.log('[SW] Background sync:', event.tag);
});

// プッシュ通知（将来の拡張用）
self.addEventListener('push', event => {
  if (!event.data) return;
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png'
  });
});
