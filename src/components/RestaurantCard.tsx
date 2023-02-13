/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, ImageBackground} from 'react-native';

import {Rating} from 'react-native-ratings';
import {useNavigation} from '@react-navigation/native';

import CustomView from './CustomView';
import CustomText from './CustomText';
import {AppFonts} from '../assets/AppFonts';
import CustomPressable from './CustomPressable';
import {navigationStrings} from '../utils/constants';

type RestaurantCardProps = {
  item: any;
};

const RestaurantCard: React.FC<RestaurantCardProps> = ({item}) => {
  const navigation = useNavigation<any>();

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
        <ImageBackground source={{uri: `${item?.images}`}} style={{flex: 1}} />
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
            {item?.title ?? '--'}
          </CustomText>
          <CustomView alignSelf={'flex-start'} paddingVertical={'xxxs'}>
            <Rating
              imageSize={14}
              ratingCount={5}
              readonly={true}
              startingValue={item?.rating ?? 0}
              ratingBackgroundColor="#c8c7c8"
            />
          </CustomView>
        </CustomView>
        <CustomPressable
          width={40}
          height={40}
          overflow={'hidden'}
          padding={'xxxs'}
          alignItems={'center'}
          justifyContent={'center'}
          backgroundColor={'primary'}
          borderRadius={'xxs'}
          onPress={() =>
            navigation.navigate(navigationStrings.DETAILS, {
              restaurant: {
                latitude: item?.latitude,
                longitude: item?.longitude,
                title: item?.title,
                rating: item?.rating,
                images: item?.images,
              },
            })
          }>
          <Image
            source={require('../assets/images/map.png')}
            style={{width: '100%', height: '100%', resizeMode: 'contain'}}
          />
        </CustomPressable>
      </CustomView>
    </CustomView>
  );
};

export default RestaurantCard;
