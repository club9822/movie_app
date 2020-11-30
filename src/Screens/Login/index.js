import React from 'react';
import {View, Platform, StyleSheet} from 'react-native';
import {commonStyles} from '~/SharedStyles/commonStyles';
import {popScreen, pushScreen} from '~/Utils/NavHelpers.js';
import {Screens} from '~/Constants/screens';
import {styles} from './styles';
import {HeaderCom} from './Components/Header';
import {InputHandler} from './Components/InputHandler';
import {ButtonsGroup} from './Components/ButtonsGroup';
function Screen(props) {
  return (
    <View style={[commonStyles.container, styles.container]}>
      <HeaderCom />
      <InputHandler />
      <ButtonsGroup />
    </View>
  );
}

export default React.memo(Screen);
