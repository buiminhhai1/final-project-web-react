import * as actionTypes from '../actions/actionTypes';

import {
  updateObject
} from '../../shared/utility';

const initialState = {
  userData: [],
  userDetail: null,
  chatList: [],
  loading: false,
  error: null,
  message: null,
  pageNum: 1,
  pageSize: 15
};

const getListUserStart = state =>
  updateObject(state, {
    loading: true,
    error: null,
    message: null,
    userData: []
  });

const getListUserSuccess = (state, action) => {
  const data = action.users.map((item, index) => {
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
    userData: data
  });
};

const getListUserFail = (state, action) =>
  updateObject(state, {
    loading: false,
    error: true,
    message: action.message
  });

const updateUserStart = state =>
  updateObject(state, {
    loading: true,
    error: null,
    message: null
  });

const updateUserSuccess = (state, action) => {
  const data = state.userData.map(item => {
    if (item._id === action.user._id) {
      const updateItem = {
        ...item,
        isBlocking: action.user.isBlocking
      };
      return updateItem;
    }
    return item;
  });

  return updateObject(state, {
    loading: false,
    error: null,
    message: action.message,
    userData: data
  });
};

const updateUserFail = (state, action) =>
  updateObject(state, {
    loading: false,
    error: true,
    message: action.message
  });

const refreshMessage = state =>
  updateObject(state, {
    message: null,
    error: null,
    userDetail: null,
    chatList: []
  });

const getUserDetailStart = state =>
  updateObject(state, {
    message: null,
    error: null,
    loading: true,
    userDetail: null,
  });

const getUserDetailSuccess = (state, action) =>
  updateObject(state, {
    loading: false,
    message: 'get detail user success',
    error: null,
    userDetail: action.user
  });

const getUserDetailFail = (state, action) =>
  updateObject(state, {
    loading: false,
    error: true,
    message: action.error,
    userDetail: null,
  });

const getChatListStart = state =>
  updateObject(state, {
    loading: true,
    error: null,
    message: null,
    chatList: []
  });

const getChatListSuccess = (state, action) =>
  updateObject(state, {
    chatList: action.chats,
    loading: false,
    message: action.message,
    error: null
  });

const getChatListFail = (state, action) =>
  updateObject(state, {
    chatList: [],
    loading: false,
    error: true,
    message: action.err
  });

const getTopUserStart = (state) =>
  updateObject(state, {
    loading: true,
    error: null,
    message: null,
    userData: []
  });

const getTopUserSuccess = (state, action) => {
  const data = action.users.map((item, index) => {
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
    userData: data
  });
};

const getTopUserFail = (state, action) =>
  updateObject(state, {
    loading: false,
    error: true,
    message: action.message
  });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LIST_USER_START:
      return getListUserStart(state);
    case actionTypes.GET_LIST_USER_SUCCESS:
      return getListUserSuccess(state, action);
    case actionTypes.GET_LIST_USER_FAIL:
      return getListUserFail(state, action);
    case actionTypes.UPDATE_USER_START:
      return updateUserStart(state);
    case actionTypes.UPDATE_USER_SUCCESS:
      return updateUserSuccess(state, action);
    case actionTypes.UPDATE_USER_FAIL:
      return updateUserFail(state, action);
    case actionTypes.REFRESH_MESSAGE_CRUD:
      return refreshMessage(state);
    case actionTypes.GET_DETAIL_USER_START:
      return getUserDetailStart(state);
    case actionTypes.GET_DETAIL_USER_SUCCESS:
      return getUserDetailSuccess(state, action);
    case actionTypes.GET_DETAIL_USER_FAIL:
      return getUserDetailFail(state, action);
    case actionTypes.GET_CHAT_USER_START:
      return getChatListStart(state);
    case actionTypes.GET_CHAT_USER_SUCCESS:
      return getChatListSuccess(state, action);
    case actionTypes.GET_CHAT_USER_FAIL:
      return getChatListFail(state, action);
    case actionTypes.GET_TOP_USER_START:
      return getTopUserStart(state);
    case actionTypes.GET_TOP_USER_SUCCESS:
      return getTopUserSuccess(state, action);
    case actionTypes.GET_TOP_USER_FAIL:
      return getTopUserFail(state, action);
    default:
      return state;
  }
};

export default reducer;