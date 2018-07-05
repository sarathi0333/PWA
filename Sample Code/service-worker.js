var CACHE_NAME = 'my-site-cache-v2';
var urlsToCache = [
    '/',
    '/index.html',
    '/script/jquery.js',
    '/script/pooper.min.js',   
    '/script/holder.js',         
    '/styles/main.css',
    '/styles/bootstrap.min.css',
    '/script/main.js'
];

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            // Cache hit - return response
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});
