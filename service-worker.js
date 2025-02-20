self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('gias-note-cache').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/style.css',
                '/script.js',
                '/app-icon.png',
                '/app-icon.png'
            ]);
        })
    );
    console.log("Service Worker Installed!");
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
