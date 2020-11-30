import {StyleSheet, Platform} from 'react-native';
import {scaleFontSize} from '~/Utils/Window';
// import Font from '~/Constants/font';
export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  row: {
    flexDirection: 'row',
  },
  centerSelf: {
    alignSelf: 'center',
  },
  centerChild: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    // fontFamily: Font.Vazir,
    fontSize: scaleFontSize(18),
    color: '#3f3f3d',
    textAlign: 'right',
  },
  box1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftText: {
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  rightText: {
    textAlign: 'right',
    alignSelf: 'flex-end',
  },
  centerText: {
    textAlign: 'center',
    alignSelf: 'center',
  },
  flex1: {
    flex: 1,
  },
});
// const fileUri: string | undefined = Platform.select({
//   ios: `${Font.VazirLight}.ttf`,
//   android: `file:///android_asset/fonts/${Font.VazirLight}.ttf`,
// });
// export const WebViewTypeFace: string = `
//       @font-face {
//       font-family: '${Font.VazirLight}';
//         src: local('${Font.VazirLight}'), url('${fileUri}') format('truetype');
//       }
//       *,body,p,h1,h2,h3,h4{
//         font-family:${Font.VazirLight};
//       }
//       `;
