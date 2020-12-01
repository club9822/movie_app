import React from 'react';
import {FlatList, View} from 'react-native';
import {keyExtractor} from '~/Utils/KeyExtractor';
import {Avatar, ListItem} from 'react-native-elements';
import {height} from '~/Utils/Window';
import {connect} from 'react-redux';
interface Props {
  results?: Array<any>;
}
const Com: React.FC<Props> = (props) => {
  if (props?.results.length === 0) {
    return null;
  }
  return (
    <View
      style={{
        position: 'absolute',
        top: height * 0.1,
        maxHeight: height * 0.6,
        width: '100%',
        zIndex: 999999,
      }}>
      <FlatList
        data={props?.results || []}
        renderItem={({item}) => {
          return (
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{item?.title || ''}</ListItem.Title>
                <ListItem.Subtitle>
                  Director: {` ${item.director || ''}`}
                </ListItem.Subtitle>
                <ListItem.Subtitle>
                  {item?.date_of_release || ''}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          );
        }}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};
function mapStateToProps(state: any) {
  return {results: state.movie.queryResult.results};
}
export const QueryResult = connect(mapStateToProps)(React.memo(Com));
