import React from 'react';

import {navigationStrings} from '../utils/constants';
// import * as Screens from '../screens';
import TabNavigation from './TabNavigation';

export default function (Stack: any) {
  return (
    <>
      <Stack.Screen name={navigationStrings.TAB} component={TabNavigation} />
    </>
  );
}
