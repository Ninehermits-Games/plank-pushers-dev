const cacheName = "DefaultCompany-Plank Pushers-0.1";
const contentToCache = [
    "Build/build.loader.js",
    "Build/8a8f3ce2bcf5f475c2e92a61b1257979.js.unityweb",
    "Build/662fa2c992c9c9ba4995b81c64475e29.data.unityweb",
    "Build/cb90416141d5ffe08a98ff0d6935e7ef.wasm.unityweb",
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
