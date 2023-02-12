/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  TextInput,
  TextInputProps,
  StyleSheet,
  Animated,
  ViewProps,
  StyleProp,
} from 'react-native';

import {BorderProps, createBox, createText, useTheme} from '@shopify/restyle';

import {Theme} from '../assets/theme';
import CustomView from './CustomView';
import CustomText from './CustomText';
import {AppFonts} from '../assets/AppFonts';
import {InputType} from '../utils/constants';
import CustomPressable from './CustomPressable';
import Locked from '../assets/svgs/close-eye.svg';
import Unlocked from '../assets/svgs/open-eye.svg';

const AnimatedBox = createBox<Theme, ViewProps | StyleProp<any>>(Animated.View);

const BaseInput = createText<Theme, TextInputProps>(TextInput);

type TextBoxStyleType = {
  backgroundColor?: string;
  width?: string | number;
  borderRadius?: number;
  height?: string | number;
};
type Props = {
  type?: InputType;
  textBoxStyle?: TextBoxStyleType;
  inputProps?: React.ComponentProps<typeof BaseInput> &
    BorderProps<Theme> & {
      error?: string | null;
      labelText?: string | null;
    };
  secure?: string;
  color?: string;
};

const CustomTextInput: React.FC<Props> = (props: Props) => {
  const theme = useTheme<Theme>();

  const originalColor = theme.colors.borderColor;
  const focusedColor = theme.colors.primary;

  const [animation, _] = useState(new Animated.Value(0));
  const [secure, setSecure] = useState<boolean>(
    props.type === InputType.WITH_ICON,
  );

  const handleAnimation = (to: number) => {
    Animated.timing(animation, {
      toValue: to,
      duration: 300,
      useNativeDriver: false, //Not advised for color change
    }).start();
  };

  const boxInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [originalColor, focusedColor],
    extrapolate: 'clamp',
  });

  return (
    <CustomView flexDirection="column">
      <CustomView>
        <CustomView
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}>
          <CustomView
            flexDirection="row"
            justifyContent={'space-between'}
            alignItems="center"
            flex={1}
            marginBottom={'xxxxxs'}>
            <CustomText
              color={props?.color || 'black'}
              lineHeight={36}
              fontFamily={AppFonts.MulishRegular}
              fontSize={16}>
              {props?.inputProps?.labelText}
            </CustomText>
          </CustomView>
          {props.inputProps?.error && (
            <CustomView>
              <CustomText marginVertical={'xxxs'} color="error" fontSize={12}>
                {props.inputProps?.error}
              </CustomText>
            </CustomView>
          )}
        </CustomView>
      </CustomView>
      <AnimatedBox
        flexDirection="row"
        borderWidth={1}
        borderRadius="xs"
        overflow="hidden"
        style={{
          borderColor: props.inputProps?.error
            ? theme.colors.error
            : boxInterpolation,
        }}>
        <BaseInput
          selectionColor={theme.colors.primary}
          placeholderTextColor={theme.colors.gray400}
          {...props.inputProps}
          onFocus={e => {
            if (props.inputProps?.onFocus) {
              props.inputProps?.onFocus(e);
            }
            handleAnimation(1);
          }}
          secureTextEntry={secure}
          style={[
            styles.input,
            props?.textBoxStyle && props?.textBoxStyle,
            props.type === InputType.WITH_ICON ? styles.inputWithIcon : {},
          ]}
          onBlur={() => {
            handleAnimation(0);
          }}
        />

        {props.type === InputType.WITH_ICON ? (
          <CustomPressable
            onPress={() => setSecure(prev => !prev)}
            flex={1}
            backgroundColor={'globalWhite'}
            alignItems="center"
            justifyContent={'center'}>
            {secure ? <Locked /> : <Unlocked />}
          </CustomPressable>
        ) : null}
      </AnimatedBox>
    </CustomView>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '90%',
    padding: 10,
    fontSize: 14,
    fontFamily: AppFonts.MulishMedium,
  },
  inputWithIcon: {
    width: '90%',
    height: '100%',
  },
});

export default CustomTextInput;
export {AnimatedBox};
