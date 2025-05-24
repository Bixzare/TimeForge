



// utils/notification.ts
export const sendNotification = (
    title: string, 
    options: {
      body?: string;
      icon?: string;
      tag?: string;
      requireInteraction?: boolean;
    } = {}
  ): Notification | null => {
    // Check if notifications are supported
    if (!('Notification' in window)) {
      console.warn('Notifications not supported');
      return null;
    }
    
    // Check permission
    if (Notification.permission === 'granted') {
      return new Notification(title, options);
    } else if (Notification.permission !== 'denied') {
      // Request permission
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          return new Notification(title, options);
        }
        return null;
      });
    }
    
    return null;
  };