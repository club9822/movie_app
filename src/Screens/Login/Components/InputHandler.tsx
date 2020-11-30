import React, {useCallback} from 'react';
import {View, Platform, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';
import {styles} from '../styles';
import {commonStyles} from '~/SharedStyles/commonStyles';
import {connect} from 'react-redux';
import {scaleFontSize} from '~/Utils/Window';
import {INPUT_CHANGE} from '~/Redux/types';
import {colors} from '~/Constants/colors';

/**
 *
 *
 * handler username & password inputs
 * state in input reducer
 *
 *
 */
const InputHandlerFC: React.FC = React.memo((props) => {
  /**
   *
   * save inputs in input reducer
   * save with throttle
   *
   * @param key
   * @param value
   */
  const onChange = (key: string, value: string) =>
    props.dispatch({
      type: INPUT_CHANGE,
      payload: {
        key: key,
        value: value,
      },
    });
  return (
    <View style={[commonStyles.centerSelf, styles.inputHandlerCont]}>
      <Input
        placeholder="Enter Username"
        leftIcon={<Icon name="user" size={24} color="grey" />}
        onChangeText={(val) => onChange('username', val)}
        defaultValue={'hriks2'}
      />
      <Input
        placeholder="Enter Password"
        secureTextEntry={true}
        leftIcon={<Icon name="lock" size={24} color="grey" />}
        onChangeText={(val) => onChange('password', val)}
        defaultValue={'gt4043@1'}
        //value if async/sync if value in rn id simple workaround is to not set value (java value set in sync, js value set in async)
      />
      <View>
        <Text
          style={[
            commonStyles.textStyle,
            commonStyles.leftText,
            {color: colors.red},
          ]}>
          {props?.loginErrorMessage || ''}
        </Text>
      </View>
    </View>
  );
});
function mapStateToProps(state) {
  return {loginErrorMessage: state.auth.loginErrorMessage};
}
export const InputHandler = connect(mapStateToProps)(InputHandlerFC);
