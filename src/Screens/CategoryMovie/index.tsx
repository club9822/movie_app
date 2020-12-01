import React from 'react';
import {View, Platform, StyleSheet} from 'react-native';
import {commonStyles} from '~/SharedStyles/commonStyles';
import {styles} from './styles';
import {HeaderCom} from './Components/Header';
import {MoviesList} from './Components/MovieList';
interface Tag {
  id: number;
  name: string;
}
interface Props {
  componentId: string;
  navProps?: {tag?: Tag} | undefined;
}
const Screen: React.FC<Props> = (props) => {
  return (
    <View style={[commonStyles.container, styles.container]}>
      <HeaderCom {...props?.navProps?.tag} />
      <MoviesList />
    </View>
  );
};

export default React.memo(Screen);
