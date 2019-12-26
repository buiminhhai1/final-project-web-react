import axios from 'axios';
import * as actionTypes from './actionTypes';

export const getListComplainStart = () => ({
  type: actionTypes.GET_LIST_COMPLAIN_START
});

export const getListComplainSuccess = complains => ({
  type: actionTypes.GET_LIST_COMPLAIN_SUCCESS,
  complains
});

export const getListComplainFail = error => ({
  type: actionTypes.GET_LIST_COMPLAIN_FAIL,
  error
});

export const getListComplain = () => dispatch => {
  dispatch(getListComplainStart());
  const url = 'http://localhost:4200/complain/getListComplain';
  const authToken = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + authToken
  };
  axios
    .get(url, {
      headers
    })
    .then(res => {
      if (res.data.complains) {
        dispatch(getListComplainSuccess(res.data.complains));
      } else {
        dispatch(getListComplainFail('get list complains has failed!'));
      }
    })
    .catch(err => {
      dispatch(getListComplainFail(err));
    });
};

export const updateStatusComplainStart = () => ({
  type: actionTypes.UPDATE_STATUS_COMPLAIN_START
});

export const updateStatusComplainSuccess = (complain, message) => ({
  type: actionTypes.UPDATE_STATUS_COMPLAIN_SUCCESS,
  complain,
  message
});

export const updateStatusComplainFail = error => ({
  type: actionTypes.UPDATE_STATUS_COMPLAIN_FAIL,
  message: error
});

export const updateStatusComplain = (_id, status, content) => dispatch => {
  dispatch(updateStatusComplainStart());
  const data = {
    _id,
    status,
    content
  };
  const url = 'http://localhost:4200/complain/updateStatusComplain';
  const authToken = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + authToken
  };
  axios
    .put(url, data, {
      headers
    })
    .then(res => {
      if (res.data.complain) {
        dispatch(updateStatusComplainSuccess(res.data.complain, res.data.message));
      } else {
        dispatch(updateStatusComplainFail('update complain has failed!'));
      }
    })
    .catch(err => {
      dispatch(updateStatusComplainFail(err));
    });
};

export const refreshMessage = () => ({
  type: actionTypes.REFRESH_MESSAGE_CRUD
});

export const refreshMessageUComplain = () => dispatch => {
  dispatch(refreshMessage());
};