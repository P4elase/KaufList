self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('my-cache').then(function (cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/static/style.css',
                '/static/script.js',
                '/img/easter.js',
                '/img/end.png',
                '/img/bag-heart.svg',
                '/img/favicon.ico',
                // Add other assets your app needs
            ]);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});
