import {LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT} from '../utils/actionTypes';
import {user} from '../utils/constants';

export const login = (payload: any) => (dispatch: any) => {
  if (payload === user) {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: payload,
    });
  } else {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
  return payload;
};

export const logout = () => {
  return {type: LOGOUT};
};
