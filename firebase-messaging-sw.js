// firebase-messaging-sw.js
// This file MUST be in the root of your GitHub repo
// Upload it alongside your index.html

importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey:            "AIzaSyAs-M8VVM_hN3smKLmqWSowuUrOFeKVA5s",
  authDomain:        "pulsechat-ae532.firebaseapp.com",
  databaseURL:       "https://pulsechat-ae532-default-rtdb.firebaseio.com",
  projectId:         "pulsechat-ae532",
  storageBucket:     "pulsechat-ae532.firebasestorage.app",
  messagingSenderId: "605174393419",
  appId:             "1:605174393419:web:37b2eaae15b294bf757bce"
});

const messaging = firebase.messaging();

// Handle background messages (when app is closed or hidden)
messaging.onBackgroundMessage((payload) => {
  const { title, body, icon } = payload.notification || {};
  self.registration.showNotification(title || "PulseChat", {
    body: body || "You have a new message",
    icon: icon || "/pulsechat/pulsechat-logo.png",
    badge: "/pulsechat/pulsechat-logo.png",
    vibrate: [200, 100, 200],
    data: payload.data,
    actions: [
      { action: "open", title: "Open Chat" },
      { action: "close", title: "Dismiss" }
    ]
  });
});

// Click on notification → open the app
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  if (event.action === "close") return;
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const client of list) {
        if (client.url.includes("pulsechat") && "focus" in client)
          return client.focus();
      }
      return clients.openWindow("https://minegameing50.github.io/pulsechat/");
    })
  );
});
