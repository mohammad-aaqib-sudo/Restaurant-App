/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Dimensions, PermissionsAndroid} from 'react-native';

import MapViewDirections from 'react-native-maps-directions';
import GetLocation from 'react-native-get-location';
import Geocode from 'react-geocode';
import {useIsFocused} from '@react-navigation/native';

import CustomView from '../../components/CustomView';
import Header from '../../components/Header';
import MapView, {Callout, Marker} from 'react-native-maps';
import {theme} from '../../assets/theme';
import CalloutCard from '../../components/CalloutCard';

type DetailsProps = {
  route: any;
};

type RegionState = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const GOOGLE_MAPS_APIKEY = 'AIzaSyBU2Uh15MMVujrenUTiv8p2425wUkzJYb8';

const Details: React.FC<DetailsProps> = ({route}) => {
  const restaurant = route?.params?.restaurant;
  const mapref = useRef(null);
  const destinationMakerRef = useRef(null);
  const isFocussed = useIsFocused();
  const [region, setRegion] = React.useState<RegionState>({
    latitude: 22.4577814,
    longitude: 70.7732439,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [destination, setDestination] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [loader, setLoader] = useState(true);
  const [restaurantDetail, setRestaurantDetail] = useState({
    title: '',
    images: '',
    rating: 0,
  });

  const getLocation = () => {
    setLoader(true);
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(loc => {
        Geocode.setApiKey(GOOGLE_MAPS_APIKEY);
        Geocode.setLocationType('APPROXIMATE');
        Geocode.fromLatLng(loc.latitude as any, loc.longitude as any).then(
          () => {
            console.log(loc.latitude, loc.longitude, 'coords');
            setRegion({
              ...region,
              latitude: loc.latitude,
              longitude: loc.longitude,
            });
            setLoader(false);
          },
          error => {
            console.error('error', error);
          },
        );
      })
      .catch(error => {
        const {code, message} = error;
        console.log(code, message);
      });
  };

  const getLocationPermission = async () => {
    const checkLocationPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (checkLocationPermission) {
      getLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        console.log(granted, 'granted');
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getLocation();
        } else {
          console.log('permission denied');
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getLocationPermission();
  }, []);

  useEffect(() => {
    destinationMakerRef?.current?.hideCallout();
    if (
      restaurant?.latitude !== undefined &&
      restaurant?.longitude !== undefined
    ) {
      setDestination({
        latitude: parseFloat(restaurant?.latitude),
        longitude: parseFloat(restaurant.longitude),
      });
      setRestaurantDetail({
        title: restaurant?.title,
        images: restaurant?.images,
        rating: restaurant?.rating,
      });
    } else {
      setDestination({
        latitude: 0,
        longitude: 0,
      });
    }
    return () => setDestination({latitude: 0, longitude: 0});
  }, [route, isFocussed]);

  return loader ? (
    <ActivityIndicator />
  ) : (
    <>
      <Header heading="Map View" />
      <CustomView flex={1}>
        <MapView
          initialRegion={region}
          region={region}
          style={{flex: 1}}
          ref={mapref}
          onPress={() => {}}>
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
          />
          <Marker
            coordinate={{
              latitude: destination.latitude,
              longitude: destination.longitude,
            }}
            image={require('../../assets/images/shop-pin.png')}
            ref={destinationMakerRef}>
            <Callout tooltip={true}>
              <CalloutCard item={restaurantDetail} />
            </Callout>
          </Marker>

          <MapViewDirections
            origin={{latitude: region.latitude, longitude: region.longitude}}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={4}
            strokeColor={theme.colors.primary}
            resetOnChange={false}
            onReady={result => {
              console.log(`Distance: ${result.distance} km`);
              console.log(`Duration: ${result.duration} min.`);

              mapref?.current &&
                mapref?.current?.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: width / 20,
                    bottom: height / 20,
                    left: width / 20,
                    top: height / 20,
                  },
                });
            }}
          />
        </MapView>
      </CustomView>
    </>
  );
};

export default Details;
