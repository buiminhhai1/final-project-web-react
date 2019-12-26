import axios from 'axios';
import * as actionTypes from './actionTypes';
import {
  API_URL
} from './apiUrl';

export const getListContractStart = () => ({
  type: actionTypes.GET_LIST_CONTRACT_START
});

export const getListContractSuccess = (contracts) => ({
  type: actionTypes.GET_LIST_CONTRACT_SUCCESS,
  contracts
});

export const getListContractFail = (error) => ({
  type: actionTypes.GET_LIST_CONTRACT_FAIL,
  error
});

export const getListContract = () => dispatch => {
  dispatch(getListContractStart());
  const url = `${API_URL}/contract/get-list-contract`;
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
      if (res.data.contracts) {
        dispatch(getListContractSuccess(res.data.contracts));
      } else {
        dispatch(getListContractFail('get list data contracts has failed!'));
      }
    })
    .catch(err => {
      dispatch(getListContractFail(err));
    });
};

export const getStatiticsStart = () => ({
  type: actionTypes.GET_STATITICS_START
});

export const getStatiticsSuccess = (statitics) => ({
  type: actionTypes.GET_STATITICS_SUCCESS,
  statitics
});

export const getStatiticsFail = (error) => ({
  type: actionTypes.GET_STATITICS_FAIL,
  error
});

export const getStatitics = () => dispatch => {
  dispatch(getStatiticsStart());
  const url = `${API_URL}/contract/get-statitics-by-day`;
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
      if (res.data.statitics) {
        dispatch(getStatiticsSuccess(res.data.statitics));
      } else {
        dispatch(getStatiticsFail('some thing went wrong!'));
      }
    })
    .catch(err => {
      dispatch(getStatiticsFail(err));
    });
};