import React from 'react';

import {ThemeProvider} from '@shopify/restyle';

import {theme} from './src/assets/theme';
import Routes from './src/navigations/Routes';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
};

export default App;
