import axios from 'axios';
import * as actionTypes from './actionTypes';
import {
  getListSkillFail
} from './skill';

export const getListUserStart = () => ({
  type: actionTypes.GET_LIST_USER_START
});

export const getListUserSuccess = (users) => ({
  type: actionTypes.GET_LIST_USER_SUCCESS,
  users
});

export const getListUserFail = (error) => ({
  type: actionTypes.GET_LIST_USER_FAIL,
  error
});

export const getListUser = (type) => dispatch => {
  dispatch(getListUserStart());
  const url = `http://localhost:4200/users/get-list-user?type=${type}`;
  axios
    .get(url)
    .then(res => {
      if (res.data.users) {
        dispatch(getListUserSuccess(res.data.users));
      } else {
        dispatch(getListSkillFail(`something went wrong`));
      }
    })
    .catch(err => {
      dispatch.getListSkillFail(err);
    });
};