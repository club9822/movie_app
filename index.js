// import React from 'react';
// import messaging from '@react-native-firebase/messaging';
import LaunchApp from './src/Config/AppNavigator';
// import {codePushSync} from './src/Utils/codePush';
if (__DEV__) {
  console.disableYellowBox = true;
}
// Register background handler
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//     if (__DEV__) {
//         // console.log('log:: Message handled in the background!', remoteMessage);
//     }
// });

/**
 * https://rnfirebase.io/messaging/usage#background-application-state
 */

LaunchApp();
// require('./src/Utils/Branch.io/Subscriber');
// codePushSync().finally(e => {});
