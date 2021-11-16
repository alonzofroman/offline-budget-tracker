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

self.addEventListener('fetch', function (evt) {
    
})