import {LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT} from '../utils/actionTypes';

const initialState = {
  user: '',
  isAuthenticated: false,
};

export const loginReducer = (
  state = initialState,
  {type, payload}: {type: any; payload: any},
) => {
  switch (type) {
    case LOGIN_SUCCESS:
      state = {
        ...state,
        user: payload?.email,
        isAuthenticated: true,
      };
      return state;
    case LOGIN_FAIL:
      state = {
        ...state,
        user: '',
        isAuthenticated: false,
      };
      return state;
    case LOGOUT:
      state = {...state, user: '', isAuthenticated: false};
      return state;
    default:
      return state;
  }
};
