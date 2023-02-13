import React, {useEffect} from 'react';
import {PermissionsAndroid, StatusBar} from 'react-native';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import {ThemeProvider} from '@shopify/restyle';

import {theme} from './src/assets/theme';
import Routes from './src/navigations/Routes';
import {store, persistor} from './src/store/index';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <StatusBar backgroundColor={theme.colors.primary} />
          <Routes />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
