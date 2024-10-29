import { StyleSheet } from 'react-native';
import colors from '../../THEME/THEME.ts';

const styles = StyleSheet.create({
  card: {
    width: '100%', 
    backgroundColor: colors.secondary,
    borderRadius: 8,
    padding: 12, 
    marginVertical: 8, 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },
  description: {
    fontSize: 14,
    color: colors.primary,
  },
});

export default styles;
