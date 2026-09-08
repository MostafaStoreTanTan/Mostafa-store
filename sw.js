const CACHE_NAME = 'karni-pro-v17';
const IMAGE_CACHE = 'karni-images-v1';
const urlsToCache = ['./','./index.html','./menu.html','./person.html','./Raport.html','./products.html','./route.html','./route-map.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))); self.skipWaiting(); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.map(key => { if (key !== CACHE_NAME && key !== IMAGE_CACHE) return caches.delete(key); })))); self.clients.claim(); });
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.destination === 'image' && /^https?:/i.test(request.url)) {
    event.respondWith((async () => {
      const cache = await caches.open(IMAGE_CACHE);
      const cached = await cache.match(request, {ignoreVary:true});
      if (cached) return cached;
      try {
        const response = await fetch(request);
        if (response && (response.ok || response.type === 'opaque')) cache.put(request, response.clone()).catch(()=>{});
        return response;
      } catch (_) {
        return new Response('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="100%" height="100%" fill="#f1f5f9"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="#94a3b8">Image unavailable</text></svg>', {headers:{'Content-Type':'image/svg+xml'}});
      }
    })());
    return;
  }
  event.respondWith(caches.match(request).then(response => response || fetch(request)));
});
