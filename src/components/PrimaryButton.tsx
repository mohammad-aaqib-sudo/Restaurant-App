import React from 'react';
import {ActivityIndicator} from 'react-native';

import CustomPressable from './CustomPressable';
import CustomText from './CustomText';
import {AppFonts} from '../assets/AppFonts';

type PrimaryButtonProps = {
  text: string;
  onPress?: () => void;
  bgColor?: any;
  textColor?: string;
  disabled?: boolean;
  loader?: boolean;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  text,
  onPress,
  textColor,
  bgColor,
  disabled,
  loader = false,
}) => {
  return (
    <CustomPressable
      disabled={disabled || false}
      minWidth={'100%'}
      alignSelf="center"
      opacity={disabled ? 0.4 : 1}
      backgroundColor={bgColor || 'primary'}
      borderRadius="s"
      paddingVertical="s"
      justifyContent={'center'}
      alignItems="center"
      flexDirection={'row'}
      onPress={() => onPress && onPress()}>
      {loader ? (
        <ActivityIndicator />
      ) : (
        <>
          <CustomText
            color={textColor || 'black'}
            fontFamily={AppFonts.MulishBold}>
            {text}
          </CustomText>
        </>
      )}
    </CustomPressable>
  );
};

export default PrimaryButton;
