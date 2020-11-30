import React from 'react';
import {SearchBar as SB} from 'react-native-elements';
import {styles} from '../styles';
import {connect} from 'react-redux';
import {QUERY_STRING} from '~/Redux/types';
import {MoviesList} from '~/Screens/Home/Components/MoviesList';
import {QueryResult} from '~/Screens/Home/Components/QueryResult';
import {View} from 'react-native';
class SearchBarFC extends React.Component {
  state = {
    search: '',
  };
  updateSearch = (search) => {
    this.setState({search});
    if (search.length > 3) {
      this.props.dispatch({type: QUERY_STRING, payload: {string: search}});
    }
  };

  render() {
    const {search} = this.state;

    return (
      <View>
        <SB
          placeholder="Type Here..."
          onChangeText={this.updateSearch}
          value={search}
          lightTheme={true}
          containerStyle={styles.searchBarContainerStyle}
          inputContainerStyle={styles.searchBarInputContainerStyle}
        />
        <QueryResult />
      </View>
    );
  }
}
export const SearchBar = connect(null)(SearchBarFC);
