importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

const firebaseConfigObj = {
  apiKey: "AIzaSyBKQnF11wlutkK3O9zwfBA70DHIPxIT5mg",
  authDomain: "superarea-c52e6.firebaseapp.com",
  projectId: "superarea-c52e6",
  storageBucket: "superarea-c52e6.firebasestorage.app",
  messagingSenderId: "886404114542",
  appId: "1:886404114542:web:abfc0b5e33fa0dfd751e7f",
  measurementId: "G-0ZS5D9Z8CX"
};

firebase.initializeApp(firebaseConfigObj)
const messaging = firebase.messaging()


messaging.onBackgroundMessage((payload) => {

    try {
        self.clients.matchAll({
            type: "window",
            includeUncontrolled: true
        }).then((clients) => {
            
            const clientIsVisible = clients.some(client => {
                return client.visibilityState === "visible";
            });


            // Always notify all open tabs       
            clients.forEach(client => {
                client.postMessage({
                    firebaseMessaging: true,
                    payload,
                    isBackground: true
                });
            });

            // Show notification when no client is visible       
            if (!clientIsVisible) {
                const notificationTitle = payload.data.title || "New Notification";
                const notificationOptions = {
                    body: payload.data.body || payload.data.text || "You have a new message",
                    icon: `${self.location.origin}/logo-icon.svg`,
                    data: {
                        ...payload.data
                    },
                };


                self.registration.showNotification(notificationTitle, notificationOptions);
            }
        }).catch(err => {
            console.error("Error in clients.matchAll:", err);
        });
    } catch (err) {
        console.error("Error in background handler:", err);
    }
});

self.addEventListener("notificationclick", (event) => {
  try {

    
    event.notification.close();

    event.waitUntil(
      self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
        // Get the click_action URL from the notification data
        const targetUrl = event.notification.data?.click_action || self.location.origin;

        

        const existingClient = clientList.find(client =>
          client.url.startsWith(self.location.origin)
        );

        if (existingClient) {
          // Focus existing window and navigate to target URL
          existingClient.focus();
          existingClient.postMessage({
            firebaseMessaging: true,
            payload: event.notification.data,
            notificationClick: true,
            targetUrl: targetUrl  // Send the URL to the client
          });
        } else {
          // Open new window with target URL
          self.clients.openWindow(targetUrl);
        }
      })
    );
  } catch (error) {
    console.error("error in service worker event listener", error)
  }
});
