import {Navigation} from 'react-native-navigation';
import {colors} from '~/Constants/colors';
export const statusBar = {
  visible: false,
  // backgroundColor: colors.green,
};
export const tabBarSetting = {
  title: {
    visible: false,
  },
  statusBar: statusBar,
};
export const navAnimation = {
  push: {
    waitForRender: true,
  },
  pop: {
    waitForRender: true,
  },
  showModal: {
    waitForRender: true,
  },
};
export function pushScreen(
  componentId = '',
  screen = '',
  options = {},
  passProps = {},
) {
  Navigation.push(componentId, {
    component: {
      id: screen,
      name: screen, // Push the screen registered with the 'Settings' key
      options: {
        // Optional options object to configure the screen
        topBar: tabBarSetting,
        ...options,
        statusBar: statusBar,
        animations: navAnimation,
      },
      passProps: passProps,
    },
  });
}
export function popScreen(screen) {
  Navigation.pop(screen, {animations: navAnimation});
}
export function setNavigationDefaultOptions() {
  Navigation.setDefaultOptions({
    layout: {
      orientation: ['portrait'],
      backgroundColor: '#fff',
    },
    statusBar: statusBar,
    topBar: {
      visible: false,
      height: 0,
    },
  });
}
