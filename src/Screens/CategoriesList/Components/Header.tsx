import React from 'react';
import {Header} from 'react-native-elements';
import {colors} from '~/Constants/colors';
import {popScreen} from '~/Utils/NavHelpers';
import {Screens} from '~/Constants/screens';

export const HeaderCom: React.FC = React.memo((props) => {
  return (
    <Header
      centerComponent={{
        text: 'Category list Screen or ...',
        style: {color: colors.white},
      }}
      leftComponent={{
        icon: 'arrow-back',
        color: colors.white,
        type: 'material',
        onPress: () => {
          popScreen(Screens.CategoriesList);
        },
      }}
      // centerComponent={{text: 'Login', style: {color: '#fff'}}}
      // rightComponent={{icon: 'exit', color: '#fff'}}
    />
  );
});
