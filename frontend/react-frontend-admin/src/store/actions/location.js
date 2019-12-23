import axios from 'axios';
import * as actionTypes from './actionTypes';

export const createLocationStart = () => ({
  type: actionTypes.CREATE_LOCATION_START
});

export const createLocationSuccess = (_id, city, district, message) => ({
  type: actionTypes.CREATE_LOCATION_SUCCESS,
  _id,
  city,
  district,
  message
});

export const createLocationFail = error => ({
  type: actionTypes.CREATE_LOCATION_FAIL,
  error
});

export const createLocation = (city, district) => dispatch => {
  dispatch(createLocationStart());
  const locationData = {
    city,
    district
  };
  const authToken = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + authToken
  };
  const url = 'http://localhost:4200/location/add-location';
  axios
    .post(url, locationData, {
      headers
    })
    .then(res => {
      if (!!res.data.location) {
        dispatch(
          createLocationSuccess(
            res.data.location._id,
            res.data.location.city,
            res.data.location.district,
            res.data.message
          )
        );
      } else {
        dispatch(createLocationFail(res.data.message));
      }
    })
    .catch(err => {
      dispatch(createLocationFail(err));
    });
};

export const updateLocationStart = () => ({
  type: actionTypes.UPDATE_LOCATION_START
});

export const updateLocationSuccess = (_id, city, district, message) => ({
  type: actionTypes.UPDATE_LOCATION_SUCCESS,
  _id,
  city,
  district,
  message
});

export const updateLocationFail = error => ({
  type: actionTypes.UPDATE_LOCATION_FAIL,
  error
});

export const updateLocation = (_id, city, district) => dispatch => {
  dispatch(updateLocationStart());
  const updated = {
    _id,
    city,
    district
  };
  const authToken = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + authToken
  };
  const url = `http://localhost:4200/location/update-location/`;
  axios
    .put(url, updated, {
      headers
    })
    .then(res => {
      if (res.data.location) {
        dispatch(
          updateLocationSuccess(
            res.data.location._id,
            res.data.location.city,
            res.data.location.district,
            res.data.message
          )
        );
      } else {
        dispatch(updateLocationFail(res.data.message));
      }
    })
    .catch(err => {
      dispatch(updateLocationFail(err));
    });
};

export const getListLocationStart = () => ({
  type: actionTypes.GET_LIST_LOCATION_START
});

export const getListLocationSuccess = locations => ({
  type: actionTypes.GET_LIST_LOCATION_SUCCESS,
  locations
});

export const getListLocationFail = error => ({
  type: actionTypes.GET_LIST_LOCATION_FAIL,
  error
});

export const getListLocation = searchString => dispatch => {
  dispatch(getListLocationStart());
  const authToken = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + authToken
  };
  const resultSearch = searchString ? `?searchString=${searchString}` : '';
  const url = `http://localhost:4200/location/get-list-location${resultSearch}`;
  axios
    .get(url, {
      headers
    })
    .then(res => {
      if (res.data.locations) {
        dispatch(getListLocationSuccess(res.data.locations));
      } else {
        dispatch(getListLocationFail('Something went wrong here'));
      }
    })
    .catch(err => {
      dispatch(getListLocationFail(err));
    });
};

export const deleteLocationStart = () => ({
  type: actionTypes.DELETE_LOCATION_START
});

export const deleteLocationSuccess = (_id, message) => ({
  type: actionTypes.DELETE_LOCATION_SUCCESS,
  _id,
  message
});

export const deleteLocationFail = error => ({
  type: actionTypes.DELETE_LOCATION_FAIL,
  error
});

export const deleteLocation = _id => dispatch => {
  dispatch(deleteLocationStart());
  const dataDelete = {
    _id
  };
  const authToken = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + authToken
  };
  const url = `http://localhost:4200/location/delete-location`;
  axios
    .delete(url, {
      headers,
      data: {
        dataDelete
      }
    })
    .then(res => {
      if (res.data.location) {
        dispatch(deleteLocationSuccess(_id, res.data.message));
      } else {
        dispatch(deleteLocationFail('delete location has failed!'));
      }
    })
    .catch(err => {
      dispatch(deleteLocationFail(err));
    });
};

export const refreshMessage = () => ({
  type: actionTypes.REFRESH_MESSAGE_CRUD
});

export const refreshMessageCRUDLocation = () => dispatch => {
  dispatch(refreshMessage());
};