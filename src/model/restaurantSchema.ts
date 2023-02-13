export const RESTAURANT_SCHEMA = 'restaurants';

export const RestaurantSchema = {
  name: RESTAURANT_SCHEMA,
  properties: {
    id: {type: 'int'},
    title: {type: 'string'},
    address: {type: 'string'},
    latitude: {type: 'string'},
    longitude: {type: 'string'},
    rating: {type: 'int'},
    total_review: {type: 'int'},
    description: {type: 'string'},
    mobile: {type: 'string'},
    images: {type: 'string'},
  },
  primaryKey: 'id',
};
