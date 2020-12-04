import { GET_DATA } from '../types';

export const setData = (data) => {
  return {
    type: GET_DATA,
    payload: data,
  };
};
