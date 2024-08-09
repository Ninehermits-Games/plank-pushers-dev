const cacheName = "DefaultCompany-Plank Pushers-0.9";
const contentToCache = [
    "Build/build.loader.js",
    "Build/085f769b234d1c593ac5a52c62b80ea8.js",
    "Build/2bbbce51d402ba0707933a3b686e058f.data",
    "Build/5ea5596f4fbf3d5a6b26b7026ad88b7a.wasm",
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
