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

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_LIST_CONTRACT_START:
      return getListContractStart(state);
    case actionTypes.GET_LIST_CONTRACT_SUCCESS:
      return getListContractSuccess(state, action);
    case actionTypes.GET_LIST_CONTRACT_FAIL:
      return getListContractFail(state, action);
    default:
      return state;
  };
};

export default reducer;