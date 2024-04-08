self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('my-cache').then(function (cache) {
            return cache.addAll([
                '/{repository}/',
                '/{repository}/index.html',
                '/{repository}/static/style.css',
                '/{repository}/static/script.js',
                '/{repository}/img/easter.js',
                '/{repository}/img/end.png',
                '/{repository}/img/bag-heart.svg',
                '/{repository}/img/favicon.ico',
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
