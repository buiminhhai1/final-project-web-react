import axios from 'axios';
import * as actionTypes from './actionTypes';
import {
  API_URL
} from './apiUrl';

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
  const url = `${API_URL}/users/get-list-user?type=${type}`;
  axios
    .get(url)
    .then(res => {
      if (res.data.users) {
        dispatch(getListUserSuccess(res.data.users));
      } else {
        dispatch(getListUserFail(`something went wrong`));
      }
    })
    .catch(err => {
      dispatch(getListUserFail(err));
    });
};

export const updateUserStart = () => ({
  type: actionTypes.UPDATE_USER_START
});

export const updateUserSuccess = (user, message) => ({
  type: actionTypes.UPDATE_USER_SUCCESS,
  user,
  message
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
  const url = `${API_URL}/users/blocking-user`;
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
      if (res.data.user) {
        dispatch(updateUserSuccess(res.data.user, res.data.message));
      } else {
        dispatch(updateUserFail(`cannot blocking this user`));
      }
    })
    .catch(() => {
      dispatch(updateUserFail(`something went wrong!`));
    });
};

export const getDetailUserStart = () => ({
  type: actionTypes.GET_DETAIL_USER_START
});

export const getDetailUserSuccess = user => ({
  type: actionTypes.GET_DETAIL_USER_SUCCESS,
  user
});

export const getDetailUserFail = error => ({
  type: actionTypes.GET_DETAIL_USER_FAIL,
  error
});

export const getDetailUser = userId => dispatch => {
  dispatch(getDetailUserStart());
  const authToken = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + authToken
  };
  const url = `${API_URL}/users/detail/${userId}`;
  axios
    .get(url, {
      headers
    })
    .then(res => {
      if (res.data.user) {
        dispatch(getDetailUserSuccess(res.data.user));
      } else {
        dispatch(getDetailUserFail('User not found!'));
      }
    })
    .catch(err => {
      dispatch(getDetailUserFail(err));
    });
};

export const refreshMessage = () => ({
  type: actionTypes.REFRESH_MESSAGE_CRUD
});

export const refreshMessageUUser = () => dispatch => {
  dispatch(refreshMessage());
};

export const getChatListStart = () => ({
  type: actionTypes.GET_CHAT_USER_START
});

export const getChatListSuccess = chats => ({
  type: actionTypes.GET_CHAT_USER_SUCCESS,
  chats,
  message: 'get list chat success'
});

export const getChatListFail = error => ({
  type: actionTypes.GET_CHAT_USER_FAIL,
  error
});

export const getChatList = (idUser1, idUser2) => dispatch => {
  dispatch(getChatListStart());
  const data = {
    idUser1,
    idUser2
  };
  const url = `${API_URL}/chat/messages`;
  const authToken = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + authToken
  };
  axios
    .post(url, data, {
      headers
    })
    .then(res => {
      if (res.data.length > 0) {
        dispatch(getChatListSuccess(res.data));
      } else {
        dispatch(
          getChatListFail('something went wrong when get list message!')
        );
      }
    })
    .catch(err => {
      dispatch(getChatListFail(err));
    });
};

export const getTopUserStart = () => ({
  type: actionTypes.GET_TOP_USER_START
});

export const getTopUserSuccess = users => ({
  type: actionTypes.GET_TOP_USER_SUCCESS,
  users
});

export const getTopUserFail = error => ({
  type: actionTypes.GET_TOP_USER_FAIL,
  error
});

export const getTopUser = numDate => dispatch => {
  dispatch(getTopUserStart());
  const url = `${API_URL}/users/getTopUser/${numDate}`;
  axios
    .get(url)
    .then(res => {
      if (res.data.result) {
        dispatch(getTopUserSuccess(res.data.result));
      } else {
        dispatch(getTopUserFail('get top has failed'));
      }
    })
    .catch(err => {
      dispatch(getTopUserFail(err));
    });
};