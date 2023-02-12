import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import * as Screens from '../screens';
import {navigationStrings} from '../utils/constants';
import HomeIcon from '../assets/svgs/Home.svg';
import LocationIcon from '../assets/svgs/LocationIcon.svg';
import Header from '../components/Header';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name={navigationStrings.HOME}
        component={Screens.Home}
        options={{tabBarIcon: () => <HomeIcon />}}
      />
      <Tab.Screen
        name={navigationStrings.DETAILS}
        component={Screens.Details}
        options={{tabBarIcon: () => <LocationIcon />}}
      />
    </Tab.Navigator>
  );
}
