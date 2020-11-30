import {StyleSheet} from 'react-native';
import {colors} from '~/Constants/colors';
import {height, scaleFontSize} from '~/Utils/Window';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.milk,
  },
  inputHandlerCont: {
    width: '80%',
    marginTop: height * 0.2,
  },
  buttonsGroupCont: {
    marginTop: height * 0.1,
    width: '80%',
  },
  signUpText: {
    marginTop: height * 0.04,
  },
  orText: {
    fontSize: scaleFontSize(26),
  },
});
