import {DATA_LOADED} from '../utils/actionTypes';

export const dataLoadedAction = (payload: any) => ({
  type: DATA_LOADED,
  payload: payload,
});
