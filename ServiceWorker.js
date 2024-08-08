const cacheName = "DefaultCompany-Plank Pushers-0.9";
const contentToCache = [
    "Build/build.loader.js",
    "Build/7469918ec7a206f485dcee173a5b1bff.js",
    "Build/bbd733f31f590bde6fd7a2db106906fe.data",
    "Build/be484f9acaed95cc7aadb36bbfc36f83.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
