
const VERSION = 'v1';

async function precache() {
  const cache = await caches.open(VERSION); // De esta forma abrimos uan instancia del cache
  return cache.addAll([
    // '/',
    // '/css/mediaPlayer.css',
    // '/css/font-icon.css',
    // '/fonts/icomoon.eot?rwaqaw',
    // '/fonts/icomoon.svg?rwaqaw',
    // '/fonts/icomoon.ttf?rwaqaw',
    // '/fonts/icomoon.woff?rwaqaw',
    // '/images/Corto.mp4',
    // '/pages/mediaPlayer.html',
    // '/script/index.js',
    // '/script/mediaPlayer.js',
    // '/script/plugins/AutoPlay.js',
    // '/script/plugins/AutoPause.js',
  ]);
}

async function cachedResponse(request) {
  const cache = await caches.open(VERSION);
  const response = await cache.match(request);
  return response || fetch(request);
}

async function updateCache(request) {
  const cache = await caches.open(VERSION);
  const response = await fetch(request);
  return cache.put(request, response);
}

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') {
    // Solo queremos trabajar con get, ya que post y demas peticiones traen 
    // otra información que no queremos cacher
    return;
  }

  //buscar en cache
  event.respondWith(cachedResponse(request));

  //actualizar el cache
  event.waitUntil(updateCache(request));
});

self.addEventListener('install', (event) => {
  event.waitUntil(precache());
});
