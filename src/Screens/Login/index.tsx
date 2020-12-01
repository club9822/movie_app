import React from 'react';
import {View, Platform, StyleSheet} from 'react-native';
import {commonStyles} from '~/SharedStyles/commonStyles';
import {styles} from './styles';
import {HeaderCom} from './Components/Header';
import {InputHandler} from './Components/InputHandler';
import {ButtonsGroup} from './Components/ButtonsGroup';
interface Props {
  componentId: string;
}
const Screen: React.FC<Props> = (props) => {
  return (
    <View style={[commonStyles.container, styles.container]}>
      <HeaderCom />
      <InputHandler />
      <ButtonsGroup />
    </View>
  );
};

export default React.memo(Screen);
