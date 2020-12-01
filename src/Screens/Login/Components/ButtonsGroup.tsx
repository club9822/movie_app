import React, {useState} from 'react';
import {
  View,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {Button} from 'react-native-elements';
import {styles} from '../styles';
import {commonStyles} from '~/SharedStyles/commonStyles';
import {LOGIN} from '~/Redux/types';

interface Props {
  showButtonLoading?: boolean;
  login: () => void;
}

const ButtonsGroupCom: React.FC<Props> = React.memo((props) => {
  return (
    <View style={[commonStyles.centerSelf, styles.buttonsGroupCont]}>
      <Button
        title="Login"
        loading={props?.showButtonLoading}
        onPress={() => {
          /**
           * lock button and show loadig
           */
          if (
            props?.showButtonLoading === false &&
            props?.login &&
            typeof props?.login === 'function'
          ) {
            props?.login();
          }
        }}
      />
      <Text
        style={[
          commonStyles.textStyle,
          commonStyles.centerText,
          commonStyles.centerSelf,
          styles.signUpText,
        ]}>
        <Text style={styles.orText}>
          {`Or
`}
        </Text>
        You don't have account?
      </Text>
      <Button
        title="SignUp"
        type="clear"
        TouchableComponent={TouchableOpacity}
        onPress={() => {}}
      />
    </View>
  );
});
const mapDispatchToProps = {
  login: () => ({
    type: LOGIN,
  }),
};

export const ButtonsGroup = connect(
  (state: any) => ({showButtonLoading: state.app.showButtonLoading}),
  mapDispatchToProps,
)(ButtonsGroupCom);
