/**
 * Fetch event listener for service worker.
 */
self.addEventListener('fetch', (event) => {
    console.log('fetching: ', event);
});