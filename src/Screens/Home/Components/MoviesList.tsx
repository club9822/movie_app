import React, {useCallback, useEffect, useState} from 'react';
import {ListItem, Avatar} from 'react-native-elements';
import {connect} from 'react-redux';
import {SectionList, View, RefreshControl} from 'react-native';
import {keyExtractor} from '~/Utils/KeyExtractor';
import CircleLoading from '~/SharedComponents/CircleLoading';
import {GET_MOVIES} from '~/Redux/types';
import {commonStyles} from '~/SharedStyles/commonStyles';
import {height} from '~/Utils/Window';
const COLORS = ['#58d368', '#0b8316', '#e5dc4a'];
const URL =
  'https://upload.wikimedia.org/wikipedia/en/thumb/7/78/Game_of_Thrones_%28season_6_soundtrack%29_cover.jpg/220px-Game_of_Thrones_%28season_6_soundtrack%29_cover.jpg';

/**
 *
 *  Component For render List of Movies lazy
 *
 *
 */

interface Props {
  dispatch: any;
  next: null | string;
  offset: number;
  results: Array<any>;
}
const MoviesListFC: React.FC<Props> = React.memo((props) => {
  const {dispatch, next, offset} = props;
  const [refreshing, setRefreshing] = useState(false);
  const [showBottomLoader, setShowBottomLoader] = useState(false);
  /**
   *
   *
   * did mount logic
   *
   *
   */
  useEffect(() => {
    //get list in didmount
    // or we can get some were else
    dispatch({type: GET_MOVIES, payload: {}});
  }, []);
  /**
   *
   * List On refresh
   *
   * show Spinner in refresh
   * clear list and only render 10 top items
   *
   *
   */
  const onRefresh = useCallback(() => {
    if (refreshing === false) {
      setRefreshing(true);
    }
    dispatch({
      type: GET_MOVIES,
      payload: {
        offset: 0,
        cb: () => {
          setRefreshing(false);
        },
        refreshing: true,
      },
    });
  }, [refreshing]);
  /**
   *
   * on list scroll
   *
   */
  const onEndReached = useCallback(() => {
    //get chunk chunk items of list and lazy render list
    if (next) {
      if (showBottomLoader === false) {
        setShowBottomLoader(true);
      }
      dispatch({
        type: GET_MOVIES,
        payload: {
          cb: () => {
            setShowBottomLoader(false);
          },
        },
      });
    }
  }, [next, showBottomLoader]);
  return (
    <View style={commonStyles.flex1}>
      <SectionList
        keyExtractor={keyExtractor}
        sections={[
          {
            title: '',
            data: props.results,
          },
        ]}
        renderItem={({item, index}) => (
          <ListItem bottomDivider>
            <Avatar size={'large'} source={{uri: URL}} />
            <ListItem.Content>
              <ListItem.Title>{item?.title || ''}</ListItem.Title>
              <ListItem.Subtitle>
                Director: {` ${item.director || ''}`}
              </ListItem.Subtitle>
              <ListItem.Subtitle>
                {item?.date_of_release || ''}
              </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        )}
        ListEmptyComponent={<CircleLoading renderLoading={true} />}
        onEndReached={onEndReached}
        initialNumToRender={5}
        refreshControl={
          <RefreshControl
            colors={COLORS}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        ListFooterComponent={
          <View
            style={[commonStyles.box1, {width: '100%', height: height * 0.08}]}>
            {showBottomLoader ? (
              <CircleLoading
                renderLoading={true}
                lottieStyle={{transform: [{scale: 1.1}]}}
              />
            ) : null}
          </View>
        }
      />
    </View>
  );
});

interface State {
  movie: any;
}
function mapStateToProps(state: State) {
  const {
    movie: {
      movies: {offset, results, next},
    },
  } = state;
  return {results, offset, next};
}
export const MoviesList = connect(mapStateToProps)(MoviesListFC);
