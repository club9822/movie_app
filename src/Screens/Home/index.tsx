import React, {useEffect} from 'react';
import {View, Platform, StyleSheet, BackHandler} from 'react-native';
import {commonStyles} from '~/SharedStyles/commonStyles';
import {styles} from './styles';
import {HeaderCom} from './Components/Header';
import {MoviesList} from './Components/MoviesList';
import {SearchBar} from './Components/SearchBar';
import {Screens} from '~/Constants/screens';
interface Props {
  componentId: string;
}
const Screen: React.FC<Props> = (props) => {
  const {componentId} = props;
  const backHandler = (): boolean => {
    // do not exit app immediately
    // show modal for exit app warning
    return true;
  };
  useEffect(() => {
    if (componentId === Screens.Home) {
      BackHandler.addEventListener('hardwareBackPress', backHandler);
    }
    return () => {
      if (componentId === Screens.Home) {
        BackHandler.removeEventListener('hardwareBackPress', backHandler);
      }
    };
  }, [componentId]);
  return (
    <View style={[commonStyles.container, styles.container]}>
      <HeaderCom />
      <SearchBar />
      <MoviesList />
    </View>
  );
};

export default React.memo(Screen);
