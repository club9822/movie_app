import React from 'react';
import {Header} from 'react-native-elements';

export const HeaderCom: React.FC = React.memo((props: any) => {
  return (
    <Header
      centerComponent={{text: 'Login', style: {color: '#fff'}}}
      rightComponent={{icon: 'exit', color: '#fff'}}
    />
  );
});
