import React from 'react';

import {
  NavigationContainer,
  ParamListBase,
  StackNavigationState,
  TypedNavigator,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationEventMap,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {NativeStackNavigatorProps} from '@react-navigation/native-stack/lib/typescript/src/types';

import AuthStack from './AuthStack';
import MainStack from './MainStack';

type RoutesProps = {};
const Stack: TypedNavigator<
  ParamListBase,
  StackNavigationState<ParamListBase>,
  NativeStackNavigationOptions,
  NativeStackNavigationEventMap,
  ({
    id,
    initialRouteName,
    children,
    screenListeners,
    screenOptions,
    ...rest
  }: NativeStackNavigatorProps) => any
> = createNativeStackNavigator();

const options = {
  gestureEnabled: true,
  headerShown: false,
};
const Routes: React.FC<RoutesProps> = ({}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          ...options,
          animation: 'slide_from_right',
          animationDuration: 500,
        }}>
        {!!false && true ? <>{MainStack(Stack)}</> : <>{AuthStack(Stack)}</>}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
