const CACHE_NAME = "Voice Assistant"
const urlsToCache = ['index.html']

const self = this;

//Install SW
self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(CACHE_NAME)
    .then(cache => {
        console.log('Opened Cache')
        
        return cache.addAll(urlsToCache)
    })
    )
})

//Listen for requests
self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request)
    .then(() => fetch(event.request))
    )
})

//Activate the SW
self.addEventListener('activate', (event) => {
    // window.document.getElementById('install-pwa-btn').innerHTML == 'Open in app';
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME)
    
    event.waitUntil(caches.keys().then(cacheNames => Promise.all(cacheNames.map(cacheName => {
        if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName)
        }
    })
    ))
    
    )
});


// customization
// var buttonInstall = window.document.getElementById('install-pwa-btn');
// buttonInstall.addEventListener('click', (e) => {
//     // Hide the app provided install promotion
//     hideMyInstallPromotion();
//     // Show the install prompt
//     deferredPrompt.prompt();
//     // Wait for the user to respond to the prompt
//     deferredPrompt.userChoice.then((choiceResult) => {
//       if (choiceResult.outcome === 'accepted') {
//         console.log('User accepted the install prompt');
//       } else {
//         console.log('User dismissed the install prompt');
//       }
//     });
//   });