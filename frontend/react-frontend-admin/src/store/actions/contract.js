import axios from 'axios';
import * as actionTypes from './actionTypes';

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
  const url = 'http://localhost:4200/contract/get-list-contract';
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