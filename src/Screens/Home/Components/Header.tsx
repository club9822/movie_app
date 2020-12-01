import React from 'react';
import {Header} from 'react-native-elements';
import {colors} from '~/Constants/colors';
import {pushScreen} from '~/Utils/NavHelpers';
import {Screens} from '~/Constants/screens';

export const HeaderCom: React.FC<any> = React.memo((props) => {
  return (
    <Header
      centerComponent={{
        text: 'Home',
        style: {color: colors.white},
      }}
      // centerComponent={{text: 'Login', style: {color: '#fff'}}}
      rightComponent={{
        type: 'materials',
        text: 'Categories Screen',
        style: {color: colors.milk},
        onPress: () => {
          pushScreen(Screens.Home, Screens.CategoriesList);
        },
      }}
    />
  );
});
