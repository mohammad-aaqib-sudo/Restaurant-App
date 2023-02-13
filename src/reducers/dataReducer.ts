import {DATA_LOADED} from '../utils/actionTypes';

const initialState = {
  restaurants: [],
};

export const dataReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case DATA_LOADED:
      return {
        ...state,
        restaurants: action.payload,
      };
  }
  return state;
};
