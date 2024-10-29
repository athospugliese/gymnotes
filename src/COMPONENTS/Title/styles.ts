import { StyleSheet } from 'react-native';
import colors from '../../THEME/THEME.ts';

const styles = StyleSheet.create({
  text: {
    fontSize: 16, 
  },
  small: {
    fontSize: 14,
  },
  medium: {
    fontSize: 16,
  },
  large: {
    fontSize: 20,
  },
  regular: {
    fontWeight: '400',
  },
  bold: {
    fontWeight: '700',
  },
  primary: {
    color: colors.primary,
  },
  secondary: {
    color: colors.secondary,
  },
  dark: {
    color: colors.dark,
  },
  white: {
    color: colors.white,
  },
});

export default styles;
