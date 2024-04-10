self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('my-cache').then(function (cache) {
            return cache.addAll([
                '/KaufList/',
                '/KaufList/index.html',
                '/KaufList/static/style.css',
                '/KaufList/static/script.js',
                '/KaufList/img/easter.js',
                '/KaufList/img/end.png',
                '/KaufList/img/bag-heart.svg',
                '/KaufList/img/favicon.ico',
                '/KaufList/manifest.json',
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
