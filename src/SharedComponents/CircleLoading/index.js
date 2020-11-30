import React from 'react';
import {StyleSheet, View} from 'react-native';
import {height, width} from '~/Utils/Window';
import LottieView from 'lottie-react-native';
interface Props {
  containerStyle?: any | undefined;
  lottieStyle?: any | undefined;
  renderLoading: Boolean;
}
function CircleLoading(props: Props): null | React.FC {
  const {containerStyle, lottieStyle, renderLoading} = props;
  if (renderLoading) {
    return (
      <View style={[styles.cont, containerStyle || {}]}>
        <LottieView
          source={require('~/Assetes/LottieFiles/loading_circle.json')}
          autoPlay
          loop={true}
          style={[styles.lottieStyle, lottieStyle || {}]}
        />
      </View>
    );
  }
  return null;
}

export default React.memo(CircleLoading);
const styles = StyleSheet.create({
  cont: {
    alignSelf: 'center',
    alignItems: 'center',
    width: width * 0.26,
    height: height * 0.16,
    padding: 10,
  },
  lottieStyle: {
    position: 'absolute',
    top: 0,
    transform: [{scale: 1.25}],
    padding: 10,
  },
});
