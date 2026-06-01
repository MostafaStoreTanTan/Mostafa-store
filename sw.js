const CACHE_NAME = 'karni-v3';
const urlsToCache = [
  '/index.html',
  '/route.html',
  '/route-map.html',
  '/person.html',
  '/calendar.html',
  '/IMG-20260531-WA0000.jpg'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
