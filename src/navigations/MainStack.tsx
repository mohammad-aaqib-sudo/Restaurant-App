import React from 'react';

import {navigationStrings} from '../utils/constants';
import * as Screens from '../screens';

export default function (Stack: any) {
  return (
    //just a placeholder
    <>
      <Stack.Screen name={navigationStrings.LOGIN} component={Screens.Login} />
    </>
  );
}
