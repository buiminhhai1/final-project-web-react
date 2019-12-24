import axios from 'axios';
import * as actionTypes from './actionTypes';
import { getListSkillFail } from './skill';

export const getListUserStart = () => ({
  type: actionTypes.GET_LIST_USER_START
});

export const getListUserSuccess = users => ({
  type: actionTypes.GET_LIST_USER_SUCCESS,
  users
});

export const getListUserFail = error => ({
  type: actionTypes.GET_LIST_USER_FAIL,
  error
});

export const getListUser = type => dispatch => {
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
      dispatch(getListSkillFail(err));
    });
};

export const updateUserStart = () => ({
  type: actionTypes.UPDATE_USER_START
});

export const updateUserSuccess = user => ({
  type: actionTypes.UPDATE_USER_SUCCESS,
  user
});

export const updateUserFail = error => ({
  type: actionTypes.UPDATE_USER_FAIL,
  error
});

export const updateUser = (_id, block, content) => dispatch => {
  dispatch(updateUserStart());
  const data = {
    _id,
    block,
    content
  };
  const url = 'http://localhost:4200/users/blocking-user';
  const authToken = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + authToken
  };
  axios
    .put(url, data, { headers })
    .then(res => {
      if (res.data.user) {
        dispatch(updateUserSuccess(res.data.user));
      } else {
        dispatch(updateUserFail(`cannot blocking this user`));
      }
    })
    .catch(() => {
      dispatch(updateUserFail(`something went wrong!`));
    });
};
