const cacheName = "DefaultCompany-Plank Pushers-0.1";
const contentToCache = [
    "Build/build.loader.js",
    "Build/0a51fdd55f964c6e02d2edf66a2bb033.js.unityweb",
    "Build/bfedc0e093a8e8ee0941e7bd03145d32.data.unityweb",
    "Build/714ceea8006e5a7f40b952fabd7f66f1.wasm.unityweb",
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
