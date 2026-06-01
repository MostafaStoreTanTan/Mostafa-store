self.addEventListener('install', e => {
  e.waitUntil(caches.open('karni-v1').then(cache => cache.addAll(['index.html', 'route.html', 'route-map.html', 'IMG-20260531-WA0000.jpg'])));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
