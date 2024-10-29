import { StyleSheet } from 'react-native';
import colors from './THEME';

const st = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: colors.primary,
  },
  button: {
    backgroundColor: colors.secondary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonText: {
    fontSize: 16,
    color: colors.white,
  },
  input: {
    fontSize: 16,
    color: colors.primary,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    marginBottom: 16,
  },
  iconButton: {
    marginLeft: 16,
  },
});

export default st;
