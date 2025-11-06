import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { messaging } from '../firebase'
import { getToken, onMessage } from 'firebase/messaging'
import { useAuth } from "./auth";
import axios from "axios";

const NotificationContext = createContext()
const useNotification = () => useContext(NotificationContext)

const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([])
    const [unreadCount, setUnreadCount] = useState(0)

    const [auth] = useAuth()
    const isAuthenticated = Boolean(auth?.token && auth?.userResult)

    const fetchNotification = useCallback(async () => {
        if (!isAuthenticated) {
            console.error("Unauthenticated user")
            return
        }
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API}notification/list-Notification`)

            if (res.data.message) {
                setNotifications(res.data.notifications)
                setUnreadCount(res.data.unreadCount)
            }

        } catch (err) {
            console.error("There is an error in fetchNotification ", err)
        }
    }, [isAuthenticated])

    const storeNotification = async ({ userId, title, text, notificationType, propertyId, time, meetingTime, userStatus, approvalStatus, listingStatus, subNotificationType, locationVerificationStatus }) => {
        
        if (!notificationType) {
            console.error('userId and Notification Type are required parameters')
            return
        }
        
        const payload = {
            userId: userId,
            text:text,
            title:title
        }
        if (notificationType) {
            payload.notificationType = notificationType
        }
        if (propertyId) {
            payload.propertyId = propertyId.toString()
        }
        if (time) {
            payload.timeSensitivity = time
        }
        if (meetingTime) {
            payload.meetingTime = meetingTime
        }
        if (userStatus) {
            payload.userStatus = userStatus
        }
        if (approvalStatus) {
            payload.approvalStatus = approvalStatus
        }
        if (listingStatus) {
            payload.listingStatus = listingStatus
        }
        if (subNotificationType) {
            payload.subNotificationType = subNotificationType
        }
        if (locationVerificationStatus) {
            payload.locationVerificationStatus = locationVerificationStatus
        }
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API}notification/send`, payload)

        } catch (err) {
            console.error("Error while sending notifications", err)
        }
    }

    const markAsRead = async (notificationId) => {
        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API}notification/${notificationId}/read`)

            if (res.data.status === 200) {
                setNotifications(prev =>
                    prev.map(notif =>
                        notif._id === notificationId ? { ...notif, viewed: true } : notif
                    )
                );
                setUnreadCount(prev => prev < 0 ? 0 : prev - 1);
            }

        } catch (err) {
            console.error("Error while reading notification", err)
        }
    }

    const markAllAsRead = async () => {
        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API}notification/read-all`)
            if (res.data.message == "ok") {
                setNotifications(prev =>
                    prev.map(noti => ({ ...noti, viewed: true }))
                )
                setUnreadCount(0)
            }
        } catch (err) {
            console.error("Error while marking notifications as read ", err)
        }
    }

    useEffect(() => {
        const saveFcmToken = async () => {
            try {
                if (!("Notification" in window)) {
                    return;
                }

                if ('Notification' in window) {
                    let permission = await Notification.requestPermission();
                    if (permission === "granted") {
                        const fcmToken = await getToken(messaging, { vapidKey: process.env.FIREBASE_VAPID_KEY })
                        if (!auth?.userResult?.fcmToken?.includes(fcmToken)) {
                            try {
                                await axios.post(`${process.env.NEXT_PUBLIC_API}notification/token`, { fcmToken })
                            } catch (err) {
                                console.error("error while adding new fcm token", err)
                            }
                        }
                    }
                }
            } catch (err) {
                console.error("error in requestPermission in notification context", err)
            }
        }
        saveFcmToken()
    }, [isAuthenticated])

    useEffect(() => {
        // Fetch initial notifications
        if (isAuthenticated) {
            fetchNotification()
        }
    }, [isAuthenticated, fetchNotification])

    useEffect(() => {
        const unsubscribe = onMessage(messaging, (payload) => {

            const newNotification = { ...payload.data };
            setNotifications((prev) => [newNotification, ...prev]);
            setUnreadCount((prev) => prev + 1);
        });

        const handleServiceWorkerMessage = (event) => {
            if (event.data?.firebaseMessaging) {

                const targetUserId = event.data.targetUserId;
                const currentUserId = auth?.userResult?.id || auth?.userResult?._id;

                if (!targetUserId || targetUserId === currentUserId) {
                    if (event.data.notificationClick) {
                        fetchNotification()
                    } else if (event.data.isBackground) {
                        fetchNotification()

                        const newNotification = { ...event.data.payload.data };
                        setNotifications((prev) => {
                            const exists = prev.some(n =>
                                n.notificationId === newNotification.notificationId ||
                                (n.title === newNotification.title && n.text === newNotification.text)
                            );

                            if (!exists) {
                                setUnreadCount((prev) => prev + 1);
                                return [newNotification, ...prev];
                            }
                            return prev;
                        });
                    }
                }
            } else if (event.data?.checkUserVisibility) {
                const targetUserId = event.data.targetUserId;
                const currentUserId = auth?.userResult?.id || auth?.userResult?._id;
                const notificationId = event.data.notificationId;

                const isTargetUser = !targetUserId || targetUserId === currentUserId;
                const isWindowVisible = document.visibilityState === 'visible';

                navigator.serviceWorker.controller?.postMessage({
                    userVisibilityResponse: true,
                    notificationId: notificationId,
                    userVisible: isTargetUser && isWindowVisible,
                    userId: currentUserId
                });
            }
        };

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener("message", handleServiceWorkerMessage);
        }

        return () => {
            unsubscribe();
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.removeEventListener("message", handleServiceWorkerMessage);
            }
        };
    }, [fetchNotification])

    useEffect(() => {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
            try {
                navigator.serviceWorker.register('/firebase-messaging-sw.js')
                    .then(registration => {

                    })
                    .catch(err => {
                        console.error(' ServiceWorker registration failed: ', err);
                    });
            } catch (err) {

                console.error('Service Worker registration failed:', err);
            }
        }
    }, []);

    const value = {
        notifications,
        unreadCount,
        storeNotification,
        fetchNotification,
        markAsRead,
        markAllAsRead
    }

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    )
}

export { useNotification, NotificationProvider }