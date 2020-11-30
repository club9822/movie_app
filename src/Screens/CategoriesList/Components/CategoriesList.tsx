import React, {useCallback, useEffect, useState} from 'react';
import {ListItem, Avatar} from 'react-native-elements';
import {connect} from 'react-redux';
import {SectionList, View, RefreshControl} from 'react-native';
import {keyExtractor} from '~/Utils/KeyExtractor';
import CircleLoading from '~/SharedComponents/CircleLoading';
import {
  CLEAR_SELECTED_TAG_MOVIES_BUTTON,
  GET_CATEGORIES,
  GET_MOVIES_BY_TAG,
} from '~/Redux/types';
import {commonStyles} from '~/SharedStyles/commonStyles';
import {height} from '~/Utils/Window';
import {pushScreen} from '~/Utils/NavHelpers';
import {Screens} from '~/Constants/screens';
const COLORS = ['#58d368', '#0b8316', '#e5dc4a'];

/**
 *
 *  Component For render List of  CATEGORIES lazy
 *
 *
 */

interface Props {
  dispatch: any;
  next: null | string;
  offset: number;
  results: Array<any>;
}
const CategoriesListFC: React.FC<Props> = React.memo((props) => {
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
    dispatch({type: GET_CATEGORIES, payload: {}});
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
      type: GET_CATEGORIES,
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
        type: GET_CATEGORIES,
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
          <ListItem
            bottomDivider
            onPress={() => {
              /**
               *
               * get data From api
               */
              dispatch({
                type: GET_MOVIES_BY_TAG,
                payload: {offset: 0, tag: item},
              });
              // clear data
              dispatch({
                type: CLEAR_SELECTED_TAG_MOVIES_BUTTON,
                payload: {},
              });
              pushScreen(
                Screens.CategoriesList,
                Screens.CategoryMovie,
                {},
                {navProps: {tag: item}},
              );
            }}>
            <ListItem.Content>
              <ListItem.Title>{item?.name || ''}</ListItem.Title>
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
  category: any;
}
function mapStateToProps(state: State) {
  const {
    category: {
      categories: {offset, results, next},
    },
  } = state;
  return {results, offset, next};
}
export const CategoriesList = connect(mapStateToProps)(CategoriesListFC);
