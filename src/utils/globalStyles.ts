import {StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
  safeAreaContainer: {flex: 0},
  container: {flex: 1},
  scrollContainer: {flexGrow: 1},
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export {globalStyles};
