const CACHE_NAME = 'karni-pro-v1';
const urlsToCache = ['index.html', 'IMG-20260602-WA0000.jpg', 'manifest.webmanifest'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
