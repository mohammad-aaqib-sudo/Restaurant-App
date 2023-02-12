import React from 'react';

import CustomView from '../../components/CustomView';
import Header from '../../components/Header';
import {FlatList} from 'react-native';
import RestaurantCard from '../../components/RestaurantCard';
import {theme} from '../../assets/theme';

type HomeProps = {};

const Home: React.FC<HomeProps> = ({}) => {
  return (
    <CustomView flex={1} backgroundColor={'gray100'}>
      <Header heading="Restaurant List" />
      <FlatList
        contentContainerStyle={{
          padding: theme.spacing.s,
          rowGap: theme.spacing.xs,
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={new Array(16).fill(0)}
        renderItem={() => <RestaurantCard />}
      />
    </CustomView>
  );
};

export default Home;
