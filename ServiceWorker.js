const cacheName = "DefaultCompany-Plank Pushers-0.1";
const contentToCache = [
    "Build/build.loader.js",
    "Build/3cf10c2881f441311e577a5c25d9b6cc.js.unityweb",
    "Build/1667a2841e1aa14b65a4d88e939c1282.data.unityweb",
    "Build/0713f9b102cf167619eecc770e58ce87.wasm.unityweb",
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
