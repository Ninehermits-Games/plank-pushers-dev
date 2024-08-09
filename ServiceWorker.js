const cacheName = "DefaultCompany-Plank Pushers-0.9";
const contentToCache = [
    "Build/build.loader.js",
    "Build/abeeee40317173ae01f5d4eaf68783c0.js",
    "Build/f0823f73e51ac05ebc4dec491e5c817c.data",
    "Build/d0291647f5d843d87bcda665d2ff473e.wasm",
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
