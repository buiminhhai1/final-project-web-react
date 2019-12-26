import * as actionTypes from '../actions/actionTypes';

import {
  updateObject
} from '../../shared/utility';

const initialState = {
  complainData: [],
  loading: false,
  error: null,
  message: null,
  pageNum: 1,
  pageSize: 15
};

const getListComplainStart = state =>
  updateObject(state, {
    loading: true,
    error: null,
    message: null,
    complainData: []
  });

const getListComplainSuccess = (state, action) => {
  const data = action.complains.map((item, index) => {
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
    complainData: data
  });
};

const getListComplainFail = (state, action) =>
  updateObject(state, {
    loading: false,
    error: true,
    message: action.message
  });

const updateStatusComplainStart = state =>
  updateObject(state, {
    loading: true,
    error: null,
    message: null
  });

const updateStatusComplainSuccess = (state, action) => {
  const data = state.complainData.map(item => {
    if (item._id === action.complain._id) {
      const updateItem = {
        ...item,
        status: action.complain.status
      };
      return updateItem;
    }
    return item;
  });

  return updateObject(state, {
    loading: false,
    error: null,
    message: action.message,
    complainData: data
  });
};

const updateStatusComplainFail = (state, action) =>
  updateObject(state, {
    loading: false,
    error: true,
    message: action.message
  });

const refreshMessage = state =>
  updateObject(state, {
    message: null,
    error: null
  });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LIST_COMPLAIN_START:
      return getListComplainStart(state);
    case actionTypes.GET_LIST_COMPLAIN_SUCCESS:
      return getListComplainSuccess(state, action);
    case actionTypes.GET_LIST_COMPLAIN_FAIL:
      return getListComplainFail(state, action);
    case actionTypes.UPDATE_STATUS_COMPLAIN_START:
      return updateStatusComplainStart(state);
    case actionTypes.UPDATE_STATUS_COMPLAIN_SUCCESS:
      return updateStatusComplainSuccess(state, action);
    case actionTypes.UPDATE_STATUS_COMPLAIN_FAIL:
      return updateStatusComplainFail(state, action);
    case actionTypes.REFRESH_MESSAGE_CRUD:
      return refreshMessage(state);
    default:
      return state;
  }
};

export default reducer;