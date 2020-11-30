import React from 'react';
import {View, Platform, StyleSheet} from 'react-native';
import {commonStyles} from '~/SharedStyles/commonStyles';
import {popScreen, pushScreen} from '~/Utils/NavHelpers.js';
import {Screens} from '~/Constants/screens';
import {styles} from './styles';
import {HeaderCom} from './Components/Header';
import {MoviesList} from './Components/MoviesList';
import {SearchBar} from './Components/SearchBar';
import {QueryResult} from './Components/QueryResult';
function Screen(props) {
  return (
    <View style={[commonStyles.container, styles.container]}>
      <HeaderCom />
      <SearchBar />
      <MoviesList />
    </View>
  );
}

export default React.memo(Screen);
