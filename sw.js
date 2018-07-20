let staticCacheName = "mws-static-v1";

/**
 * Add static assets to cache on install event.
 */
self.addEventListener("install", event => {
  event.waitUntil(
    caches
      .open(staticCacheName)
      .then(cache => {
        return cache.addAll([
          "/",
          "/manifest.json",
          "/restaurant.html",
          "css/styles.css",
          "data/restaurants.json",
          "js/main.js",
          "js/dbhelper.js",
          "js/restaurant_info.js",
          "img/1.jpg",
          "img/2.jpg",
          "img/3.jpg",
          "img/4.jpg",
          "img/5.jpg",
          "img/6.jpg",
          "img/7.jpg",
          "img/8.jpg",
          "img/9.jpg",
          "img/10.jpg",
          "img/hamburger.svg"
        ]);
      })
      .catch(error => {
        console.log("Failed to open:", error);
      })
  );
});

/**
 * Get cache on service worker activation.
 */
self.addEventListener("activate", event => {
  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => {
              return (
                cacheName.startsWith("mws-") && cacheName != staticCacheName
              );
            })
            .map(cacheName => {
              return caches.delete(cacheName);
            })
        );
      })
      .catch(error => {
        console.log("Failed to find key:", error);
      })
  );
});

/**
 * Try to fetch from cache otherwise fetch from network.
 */
self.addEventListener("fetch", event => {
  event.respondWith(
    caches
      .match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
      .catch(error => {
        console.log("Failed to fetch:", error);
      })
  );
});
