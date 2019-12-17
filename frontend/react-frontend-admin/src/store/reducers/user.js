import * as actionTypes from '../actions/actionTypes';

import {
  updateObject
} from '../../shared/utility';

const initialState = {
  userData: [],
  loading: false,
  error: null,
  message: null,
  pageNum: 1,
  pageSize: 15
};

const getListUserStart = (state) =>
  updateObject(state, {
    loading: true,
    error: null,
    message: null,
    userData: []
  });

const getListUserSuccess = (state, action) => {
  // const data = action.users.map((item, index) => {
  //   const result = {
  //     ...item
  //   }
  //   result.key = index + 1 + '';
  //   return result;
  // });
  // return updateObject(state, {
  //   loading: false,
  //   error: null,
  //   message: action.message,
  //   userData: data
  // });
  return state;
};

const getListUserFail = (state, action) =>
  updateObject(state, {
    loading: false,
    error: true,
    message: action.message
  });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LIST_USER_START:
      return getListUserStart(state);
    case actionTypes.GET_LIST_SKILL_SUCCESS:
      return getListUserSuccess(state, action);
    case actionTypes.GET_LIST_USER_FAIL:
      return getListUserFail(state, action);
    default:
      return state;
  }
};

export default reducer;