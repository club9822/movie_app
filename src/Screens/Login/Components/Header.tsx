import React from 'react';
import {Header} from 'react-native-elements';
import {BackHandler} from 'react-native';

export const HeaderCom: React.FC = React.memo((props: any) => {
  const exitApp = React.useCallback(() => {
    BackHandler.exitApp();
  }, []);
  return (
    <Header
      leftComponent={{
        text: 'Exit App',
        onPress: exitApp,
      }}
      centerComponent={{text: 'Login', style: {color: '#fff'}}}
    />
  );
});
