const CACHE_NAME = 'static';
const DATA_CACHE_NAME = 'data-cache';

const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/styles.css',
    '/icons/icon-192x192.png',
    'icons/icon-512x512.png'
];

self.addEventListener('install', function (evt) {
    evt.WaitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE)));

    self.skipWaiting();
});

self.addEventListener('activate', function (evt) {
    evt.waitUntil(caches.keys().then(keyList => {
        return Promise.all(keyList.map(key => {
            if (key != CACHE_NAME && key != DATA_CACHE_NAME) {
                console.log ('Removing old data cache', key);
                return caches.delete(key);
            }
        }))
    }));
    self.clients.claim();
})