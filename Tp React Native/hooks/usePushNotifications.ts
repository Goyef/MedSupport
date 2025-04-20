import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

const registerForPushNotificationsAsync =  async() => {
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Échec de permission pour les notifications.');
      return;
    }

    const tokenData = await Notifications.getExpoPushTokenAsync();
    const token = tokenData.data;

    console.log("Expo push token :", token);
    return token
  } else {
    alert('Les notifications push nécessitent un appareil physique');
  }
}

export {registerForPushNotificationsAsync}
