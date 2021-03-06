import React from 'react';
import {View, Platform, StyleSheet} from 'react-native';
import {commonStyles} from '~/SharedStyles/commonStyles';
import {popScreen, pushScreen} from '~/Utils/NavHelpers.js';
import {Screens} from '~/Constants/screens';
import {styles} from './styles';
import {HeaderCom} from './Components/Header';
interface Props {
  componentId?:string;
}
function Screen(props:Props) {
  return (
    <View style={[commonStyles.container, styles.container]}>
      <HeaderCom />
    </View>
  );
}

export default React.memo(Screen);
