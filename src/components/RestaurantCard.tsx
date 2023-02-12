/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import CustomView from './CustomView';
import {Image, ImageBackground} from 'react-native';
import CustomText from './CustomText';
import {AppFonts} from '../assets/AppFonts';
import {Rating} from 'react-native-ratings';
import {theme} from '../assets/theme';

type RestaurantCardProps = {};

const RestaurantCard: React.FC<RestaurantCardProps> = ({}) => {
  return (
    <CustomView
      padding={'s'}
      flex={1}
      borderRadius={'s'}
      flexDirection={'row'}
      backgroundColor={'globalWhite'}
      columnGap={'s'}
      elevation={2}>
      <CustomView
        aspectRatio={1 / 1}
        overflow={'hidden'}
        flex={0.2}
        backgroundColor={'black'}
        borderRadius={'xxs'}>
        <ImageBackground
          source={require('../assets/Restaurant.jpeg')}
          style={{flex: 1}}
        />
      </CustomView>
      <CustomView
        flex={0.8}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}>
        <CustomView flex={1}>
          <CustomText
            fontSize={16}
            fontFamily={AppFonts.MulishBold}
            numberOfLines={2}
            color={'black'}>
            Bikanervala-Indian Restaurant
          </CustomText>
          <CustomView alignSelf={'flex-start'} paddingVertical={'xxxs'}>
            <Rating
              imageSize={14}
              ratingCount={5}
              readonly={true}
              startingValue={4}
              ratingBackgroundColor="#c8c7c8"
            />
          </CustomView>
        </CustomView>
        <CustomView
          width={40}
          height={40}
          overflow={'hidden'}
          padding={'xxxs'}
          alignItems={'center'}
          justifyContent={'center'}
          backgroundColor={'primary'}
          borderRadius={'xxs'}>
          <Image
            source={require('../assets/map.png')}
            style={{width: '100%', height: '100%', resizeMode: 'contain'}}
          />
        </CustomView>
      </CustomView>
    </CustomView>
  );
};

export default RestaurantCard;
