import React from 'react';
import {Platform, UIManager} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import {ReduxStore} from './ReduxStore';
// import CodePush from 'react-native-code-push';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
/**
 *
 * Screen Names dictionary
 *
 */
import {Screens} from '~/Constants/screens';
import {setNavigationDefaultOptions, statusBar} from '~/Utils/NavHelpers';
import {commonStyles} from '~/SharedStyles/commonStyles';
const withReduxProvider = (C: React.FC) => (props: any) => {
  return (
    <SafeAreaProvider style={commonStyles.container}>
      <Provider store={ReduxStore}>
        <C {...props} />
      </Provider>
    </SafeAreaProvider>
  );
};
/**
 * Gesture Handler
 * HOC
 * @param C
 * @param arg
 * @returns {React.ComponentType<{}>}
 */
const withGestureHandlerRootHOC = (C, ...arg) =>
  gestureHandlerRootHOC(withReduxProvider(C, ...arg));

Navigation.registerComponent(Screens.Loading, () =>
  withGestureHandlerRootHOC(require('~/Screens/Loading').default),
);
Navigation.registerComponent(Screens.Login, () =>
  withGestureHandlerRootHOC(require('~/Screens/Login').default),
);
Navigation.registerComponent(Screens.Home, () =>
  withGestureHandlerRootHOC(require('~/Screens/Home').default),
);
Navigation.registerComponent(Screens.CategoriesList, () =>
  withGestureHandlerRootHOC(require('~/Screens/CategoriesList').default),
);
Navigation.registerComponent(Screens.CategoryMovie, () =>
  withGestureHandlerRootHOC(require('~/Screens/CategoryMovie').default),
);
/**
 * lazy register screen after Loading Screen
 * @param cb  function
 */
export function registerScreens(cb = null) {
  if (cb) {
    cb();
  }
}
// Navigation.registerComponent('App', function() {
//   const App = require('../../App').default;
//   return withReduxProviderWithoutSafeContext(App);
// });
function setInitialRoot(): Promise<any> {
  return Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              // name: 'App',
              // id: 'App',
              name: Screens.Login,
              id: Screens.Login,
              options: {
                topBar: {
                  visible: false,
                },
                statusBar: statusBar,
              },
            },
          },
        ],
      },
    },
  });
}
function LaunchApp(): void {
  if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  Navigation.events().registerAppLaunchedListener(() => {
    setNavigationDefaultOptions();
    // Navigation.events().registerComponentDidAppearListener(
    //   ({componentName, componentType}) => {
    //     if (componentType === 'Component' && componentName !== null) {
    //       analytics().setCurrentScreen(componentName, componentName);
    //     }
    //   },
    // );
    setInitialRoot().finally(() => {
      // BranchUniversalObject.createBranchUniversalObject().finally(() => {});
      registerScreens();
    });
  });
}
export default LaunchApp;
