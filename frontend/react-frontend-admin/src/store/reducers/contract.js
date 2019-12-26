import * as actionTypes from '../actions/actionTypes';

import {
  updateObject
} from '../../shared/utility';
import {
  getListContractFail
} from '../actions/contract';

const initState = {
  contractData: [],
  loading: false,
  error: null,
  message: null,
  statitics: [],
  pageNum: 1,
  pageSize: 15
};

const getListContractStart = state =>
  updateObject(state, {
    loading: true,
    error: null,
    message: null,
    contractData: []
  });

const getListContractSuccess = (state, action) => {
  const data = action.contracts.map((item, index) => {
    const result = {
      ...item
    };
    result.key = index + 1 + '';
    return result;
  });
  return updateObject(state, {
    loading: false,
    error: null,
    message: action.message,
    contractData: data
  });
};

const getStatiticsStart = state =>
  updateObject(state, {
    loading: true,
    error: null,
    message: null,
    statitics: []
  });

const getStatiticsSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: null,
    message: 'get success',
    statitics: action.statitics
  });
};

const getStatiticsFail = (state, action) =>
  updateObject(state, {
    loading: false,
    error: true,
    message: action.error,
    statitics: []
  });


const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_LIST_CONTRACT_START:
      return getListContractStart(state);
    case actionTypes.GET_LIST_CONTRACT_SUCCESS:
      return getListContractSuccess(state, action);
    case actionTypes.GET_LIST_CONTRACT_FAIL:
      return getListContractFail(state, action);
    case actionTypes.GET_STATITICS_START:
      return getStatiticsStart(state);
    case actionTypes.GET_STATITICS_SUCCESS:
      return getStatiticsSuccess(state, action);
    case actionTypes.GET_STATITICS_FAIL:
      return getStatiticsFail(state, action);
    default:
      return state;
  };
};

export default reducer;