import { SET_EMAIL } from './actionTypes';

export const setEmail = (email) => {
  return {
    type: SET_EMAIL,
    payload: email,
  };
};