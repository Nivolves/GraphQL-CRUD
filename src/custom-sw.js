/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

workbox.precaching.precacheAndRoute(self.__precacheManifest);

workbox.routing.registerRoute('/', workbox.strategies.networkFirst());
