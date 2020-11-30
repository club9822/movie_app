import axios from 'axios';
import {API} from '~/Constants/api';
import {ReduxStore} from '~/Config/ReduxStore';

axios.defaults.baseURL = API;
//log all in dev mode
if (__DEV__) {
  axios.interceptors.request.use((request) => {
    console.log('log:: request ', request);
    return request;
  });
  axios.interceptors.response.use((response) => {
    console.log('log:: response ', response);
    return response;
  });
}
/*
 *
 * append token to request header
 *
 *
 */

axios.interceptors.request.use(
  async (config) => {
    let accessToken = null;
    // only append AccessToken to endpoints id needed
    if (ReduxStore && config.addAccessToken !== false) {
      const state = ReduxStore.getState();
      accessToken = state.auth.accessToken;
    }

    /**
     *
     * Authorization = "Bearer " + access_token
     *
     *
     */
    if (config.addAccessToken !== false) {
      if (accessToken) {
        config.headers.Authorization = 'Bearer ' + accessToken;
        return config;
      } else {
        // const accessToken = await getValueFromManifest('access');
        // if (!accessToken) {
        //   return Promise.reject(config);
        // }
        // config.headers.Authorization = 'Bearer ' + access_token;
        // return Promise.resolve(config);
        return Promise.reject(config);
      }
    } else {
      return config;
    }
  },
  (error) => Promise.reject(error),
);

// Function that will be called to refresh authorization
// export function refreshAuthLogic(failedRequest) {
//   return getValueFromManifest('access').then((accessToken) => {
//     if (!accessToken) {
//       return Promise.reject();
//     }
//     axios({
//       method: 'post',
//       url: API + 'token/refresh',
//       headers: {
//         Authorization: 'Bearer ' + accessToken,
//         'Content-Type': 'application/json; charset=utf-8',
//       },
//     })
//       .then(({data}) => {
//         // axios.defaults.headers.common.Authorization =
//         //   'Bearer ' + data.data.access_token;
//         failedRequest.response.config.headers.Authorization =
//           'Bearer ' + data.data.access_token;
//         if (ReduxStore) {
//           ReduxStore.dispatch({
//             type: ACCESS_TOKEN,
//             payload: {access: data.data.access_token},
//           });
//         }
//         saveTokenAndMobile({access: data.data.access_token});
//         return Promise.resolve();
//       })
//       .catch((e) => {
//         if (ReduxStore) {
//           ReduxStore.dispatch({
//             type: TOAST_MESSAGE_MODAL,
//             payload: {
//               toastMessage: {
//                 title: e.response.data.hasOwnProperty('message')
//                   ? e.response.data.message
//                   : 'دوباره به حساب کاربری خود وارد شوید',
//                 body: '',
//                 messageType: 'warning',
//               },
//             },
//           });
//         }
//         saveTokenAndMobile({
//
//         });
//         return Promise.reject();
//       })
//       .finally(() => {});
//   });
// }
export {axios};
