import {Dimensions, StatusBar, Platform} from 'react-native';
// export const hasNotch = require('react-native-device-info').hasNotch();
/**
 * Window width ,height Dimensions
 */
export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;
/**
 *
 *  magic numbers
 *
 *  this modules changed a little bit
 *
 **/
//iphone x
const X_WIDTH = 375;
const X_HEIGHT = 812;

//iphone xsmax
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

/**
 *
 * determine in mobile is iphoneX or not
 * @return {boolean}
 * @private
 */
function _isIphoneX(): boolean {
  let isIPhoneX = false;
  if (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS) {
    isIPhoneX =
      (width === X_WIDTH && height === X_HEIGHT) ||
      (width === XSMAX_WIDTH && height === XSMAX_HEIGHT);
  }
  return isIPhoneX;
}
export const isIphoneX: boolean = _isIphoneX();
/**
 * ios status bar height
 */
export const STATUS_BAR_HEIGHT_IOS = Platform.select({
  ios: isIphoneX ? 44 : 20,
  android: 0,
});

/**
 * android status bar height
 */
export const STATUS_BAR_HEIGHT_ANDROID = Platform.select({
  android: StatusBar.currentHeight,
  ios: 0,
});
export const screenHeightSize = Math.max(width, height);

/**
 * scale FontSize
 *
 */

const fontScale: number = Platform.select({
  android: 896,
  ios: isIphoneX ? 920 : 896,
  default: 896,
});
/**
 * scale font size
 * @param size
 * @param maxSize
 */
export const scaleFontSize = (size: number, maxSize = Infinity): number => {
  // const newSize = (screenWidthSize * size * 0.8) / 504;
  const newSize = (screenHeightSize * size * 0.9) / fontScale;
  return newSize > maxSize ? maxSize : newSize;
};
