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
  collectionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#2C2C2E',
  },
  selectedCollectionItem: {
    backgroundColor: colors.secondary,
  },
  collectionText: {
    fontSize: 16,
    color: colors.white,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: colors.dark,
    padding: 16,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    color: colors.white,
    marginBottom: 12,
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default st;
