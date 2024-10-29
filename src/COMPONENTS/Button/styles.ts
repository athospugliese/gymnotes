import { StyleSheet } from 'react-native';
import colors from '../../THEME/THEME.ts';

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.secondary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
  },
});

export default styles;
