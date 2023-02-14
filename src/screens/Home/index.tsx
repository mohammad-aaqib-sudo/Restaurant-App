import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList} from 'react-native';

import Realm from 'realm';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';

import CustomView from '../../components/CustomView';
import Header from '../../components/Header';
import RestaurantCard from '../../components/RestaurantCard';
import {theme} from '../../assets/theme';
import {
  RESTAURANT_SCHEMA,
  RestaurantSchema,
} from '../../model/restaurantSchema';
import {dataLoadedAction} from '../../actions';

const databaseOptions = {
  path: 'realmT4.realm',
  schema: [RestaurantSchema],
  schemaVersion: 1,
};

type HomeProps = {};

const Home: React.FC<HomeProps> = ({}) => {
  const dispatch = useDispatch();
  const myList = useSelector((state: any) => state.dataReducer.restaurants);
  const [loader, setLoader] = useState(true);
  const [page, setPage] = React.useState(1);
  const [moreLoading, setMoreLoading] = React.useState(false);

  let realm: any;
  let onEndReachedCalledDuringMomentum = true;

  const openDBConnection = async () => {
    setLoader(true);
    try {
      realm = await Realm.open(databaseOptions);
      getDataFromDatabase();
      if (myList.length < 1) {
        fetchAndStoreToDatabase({});
      }
      setLoader(false);
    } catch (err) {}
  };

  // This function has been used to fetch the data from database.
  const getDataFromDatabase = async () => {
    try {
      const response = await realm.objects(RESTAURANT_SCHEMA);
      dispatch(dataLoadedAction(response));
      setLoader(false);
    } catch (err) {
      console.log('my error', err);
    }
  };

  // This function has been used to fetch the data from api and store it in our database.
  const fetchAndStoreToDatabase = ({pageNumber = 1}) => {
    setLoader(true);
    setPage(pageNumber);
    setMoreLoading(true);
    axios
      .get(
        'http://205.134.254.135/~mobile/interview/public/api/restaurants_list',
      )
      .then(response => {
        realm.write(() => {
          response?.data?.data.forEach((obj: any) => {
            realm.create(RESTAURANT_SCHEMA, {
              ...obj,
              images: obj.images[0]?.url,
            });
          });
        });
        getDataFromDatabase();
        setLoader(false);
        setMoreLoading(false);
      })
      .catch(err => {
        console.log(err, 'error');
      });
  };

  useEffect(() => {
    openDBConnection();
  }, []);

  return loader ? (
    <ActivityIndicator color={theme.colors.primary} />
  ) : (
    <CustomView flex={1} backgroundColor={'gray100'}>
      <Header heading="Restaurant List" />
      <FlatList
        contentContainerStyle={{
          padding: theme.spacing.s,
          rowGap: theme.spacing.xs,
        }}
        onRefresh={() => fetchAndStoreToDatabase({pageNumber: 1})}
        refreshing={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={[...myList]}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum = false;
        }}
        onEndReachedThreshold={0.1}
        onEndReached={() => {
          if (!onEndReachedCalledDuringMomentum) {
            fetchAndStoreToDatabase({pageNumber: page + 1});
            onEndReachedCalledDuringMomentum = true;
          }
        }}
        ListFooterComponent={
          moreLoading ? (
            <CustomView paddingVertical="xs">
              <ActivityIndicator />
            </CustomView>
          ) : null
        }
        renderItem={({item}) => <RestaurantCard item={item} />}
      />
    </CustomView>
  );
};

export default Home;
