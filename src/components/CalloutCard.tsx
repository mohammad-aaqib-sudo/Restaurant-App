/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Dimensions, Image, Text} from 'react-native';

import {Rating} from 'react-native-ratings';

import CustomView from './CustomView';
import CustomText from './CustomText';
import {AppFonts} from '../assets/AppFonts';

const {width} = Dimensions.get('screen');

type CalloutCardProps = {
  item: any;
};

const CalloutCard: React.FC<CalloutCardProps> = ({item}) => {
  return (
    <CustomView
      padding={'s'}
      flex={1}
      borderRadius={'s'}
      flexDirection={'row'}
      backgroundColor={'globalWhite'}
      columnGap={'s'}
      alignItems={'center'}
      minWidth={width * 0.7}
      elevation={2}>
      <Text
        style={{
          width: 60,
          height: 60,
          // flex: 1,
          marginTop: -30,
        }}>
        <Image
          source={{uri: `${item?.images}`}}
          style={{
            width: 60,
            height: 60,
            resizeMode: 'cover',
            borderRadius: 30,
          }}
        />
      </Text>
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
            <CustomText>
              <Rating
                tintColor="transparent"
                imageSize={14}
                ratingCount={5}
                readonly={true}
                startingValue={item?.rating ?? 0}
              />
            </CustomText>
          </CustomView>
        </CustomView>
      </CustomView>
    </CustomView>
  );
};

export default CalloutCard;
