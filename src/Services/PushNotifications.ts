import PushNotification from 'react-native-push-notification';

export default class PushNotifications{
    static localNotification(title: string, message: string){
        PushNotification.localNotification({
            /* iOS and Android properties */
            title: title, 
            message: message,
            playSound: false
        });
    }
}