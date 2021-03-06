import React from 'react';
import {Header} from 'react-native-elements';
import {colors} from '~/Constants/colors';
import {popScreen} from '~/Utils/NavHelpers';
import {Screens} from '~/Constants/screens';
interface Props {
  id?: number;
  name?: string;
}
export const HeaderCom: React.FC<Props> = React.memo((props) => {
  return (
    <Header
      centerComponent={{
        text: 'Movies By ' + props?.name || '',
      }}
      leftComponent={{
        icon: 'arrow-back',
        color: colors.white,
        type: 'material',
        style: {
          color: colors.white,
        },
        onPress: () => {
          popScreen(Screens.CategoryMovie);
        },
      }}
      // centerComponent={{text: 'Login', style: {color: '#fff'}}}
      // rightComponent={{icon: 'exit', color: '#fff'}}
    />
  );
});
