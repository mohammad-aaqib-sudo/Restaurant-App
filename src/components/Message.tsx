/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef} from 'react';
import {Animated, View} from 'react-native';

import {theme} from '../assets/theme';
import CustomText from './CustomText';
import {AppFonts} from '../assets/AppFonts';

type MessageProps = {
  message: string;
};

const Toast = (props: any) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        opacity,
        transform: [
          {
            translateY: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [-20, 0],
            }),
          },
        ],
        margin: 10,
        marginBottom: 5,
        backgroundColor: theme.colors.error,
        padding: 10,
        borderRadius: 4,
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 6,
      }}>
      <CustomText
        fontSize={12}
        lineHeight={36}
        fontFamily={AppFonts.MulishSemiBold}
        color={'globalWhite'}>
        {props?.message}
      </CustomText>
    </Animated.View>
  );
};

const Message: React.FC<MessageProps> = ({message}) => {
  return (
    <>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
        }}>
        <Toast message={message} />
      </View>
    </>
  );
};

export default Message;
