import React from 'react';

import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/core';

import CustomView from './CustomView';
import CustomText from './CustomText';
import CustomPressable from './CustomPressable';
import {AppFonts} from '../assets/AppFonts';
import {LOGOUT} from '../utils/actionTypes';

type HeaderProps = {
  heading: string;
};

const Header: React.FC<HeaderProps> = ({heading}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  return (
    <CustomView
      padding={'l'}
      backgroundColor={'primary'}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-around'}>
      <CustomPressable
        flex={0.2}
        onPress={() => (navigation.canGoBack() ? navigation.goBack() : {})}>
        {navigation.canGoBack() && (
          <CustomText
            fontSize={14}
            color={'globalWhite'}
            fontFamily={AppFonts.MulishSemiBold}>
            Back
          </CustomText>
        )}
      </CustomPressable>
      <CustomView flex={0.6} alignItems={'center'} justifyContent={'center'}>
        <CustomText
          fontSize={20}
          color={'globalWhite'}
          fontFamily={AppFonts.MulishBold}>
          {heading}
        </CustomText>
      </CustomView>
      <CustomPressable
        onPress={() => dispatch({type: LOGOUT})}
        flex={0.2}
        alignItems={'flex-end'}
        justifyContent={'center'}>
        <CustomText
          fontSize={14}
          color={'globalWhite'}
          fontFamily={AppFonts.MulishSemiBold}>
          Logout
        </CustomText>
      </CustomPressable>
    </CustomView>
  );
};

export default Header;
