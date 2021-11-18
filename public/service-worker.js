const CACHE_NAME = 'static';
const DATA_CACHE_NAME = 'data-cache';

const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/styles.css',
    '/index.js',
    '/indexedDb.js',
    '/dist/manifest.json',
    '/dist/bundle.js',
    '/icons/icon-192x192.png',
    'icons/icon-512x512.png'
];

self.addEventListener('install', (evt) => {
    evt.waitUntil(
      caches
        .open(CACHE_NAME)
        .then((cache) => cache.addAll(FILES_TO_CACHE))
        .then(self.skipWaiting())
    );
  });

self.addEventListener('activate', (evt) => {
    const currentCaches = [CACHE_NAME, DATA_CACHE_NAME];
    evt.waitUntil(
      caches
        .keys()
        .then((cacheNames) => {
          return cacheNames.filter((cacheName) => !currentCaches.includes(cacheName));
        })
        .then((cachesToDelete) => {
          return Promise.all(
            cachesToDelete.map((cacheToDelete) => {
              return caches.delete(cacheToDelete);
            })
          );
        })
        .then(() => self.clients.claim())
    );
  });

self.addEventListener('fetch', (evt) => {
    if (evt.request.url.startsWith(self.location.origin)) {
      evt.respondWith(
        caches.match(evt.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
  
          return caches.open(CACHE_NAME).then((cache) => {
            return fetch(evt.request).then((response) => {
              return cache.put(evt.request, response.clone()).then(() => {
                return response;
              });
            });
          });
        })
      );
    }
  });