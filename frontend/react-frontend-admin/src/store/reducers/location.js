import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  locationData: [],
  loading: false,
  error: null,
  message: null,
  pageNum: 1,
  pageSize: 15
};

const createLocationStart = state =>
  updateObject(state, {
    loading: true,
    error: null,
    message: null
  });

const createLocationSuccess = (state, action) => {
  const updateData = [...state.locationData];
  updateData.push({
    key: updateData.length + 1 + '',
    _id: action._id,
    city: action.city,
    district: action.district
  });
  return updateObject(state, {
    loading: false,
    error: null,
    message: action.message,
    locationData: updateData
  });
};

const createLocationFail = (state, action) =>
  updateObject(state, {
    loading: false,
    error: true,
    message: action.message
  });

const updateLocationStart = state =>
  updateObject(state, {
    loading: true,
    error: null,
    message: null
  });
const updateLocationSuccess = (state, action) => {
  const data = state.locationData.map(item => {
    if (item._id === action._id) {
      const updateItem = {
        _id: action._id,
        city: action.city,
        district: action.district,
        key: item.key
      };
      return updateItem;
    }
    return item;
  });
  return updateObject(state, {
    loading: false,
    error: null,
    message: action.message,
    locationData: data
  });
};

const updateLocationFail = (state, action) =>
  updateObject(state, {
    loading: false,
    error: true,
    message: action.message
  });

const getListLocationStart = state =>
  updateObject(state, {
    loading: true,
    error: null,
    message: null,
    locationData: []
  });

const getListLocationSuccess = (state, action) => {
  if (action.locations.length > 0) {
    const data = action.locations.map((item, index) => {
      const result = { ...item };
      result.key = index + 1 + '';
      return result;
    });
    return updateObject(state, {
      loading: false,
      error: null,
      message: action.message,
      locationData: data
    });
  }
  return state;
};

const getListLocationFail = (state, action) =>
  updateObject(state, {
    loading: false,
    error: true,
    message: action.message
  });

const deleteLocationStart = state =>
  updateObject(state, {
    loading: true,
    error: null, message: null
  });
const deleteLocationSuccess = (state, action) => {
  const data = state.locationData.filter(item => {
    if (item._id !== action._id) {
      return item;
    }
  });
  return updateObject(state, {
    loading: false,
    error: null,
    message: action.message,
    locationData: data
  });
};

const deleteLocationFail = (state, action) =>
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
    case actionTypes.CREATE_LOCATION_START:
      return createLocationStart(state);
    case actionTypes.CREATE_LOCATION_SUCCESS:
      return createLocationSuccess(state, action);
    case actionTypes.CREATE_LOCATION_FAIL:
      return createLocationFail(state, action);
    case actionTypes.UPDATE_LOCATION_START:
      return updateLocationStart(state);
    case actionTypes.UPDATE_LOCATION_SUCCESS:
      return updateLocationSuccess(state, action);
    case actionTypes.UPDATE_LOCATION_FAIL:
      return updateLocationFail(state, action);
    case actionTypes.GET_LIST_LOCATION_START:
      return getListLocationStart(state);
    case actionTypes.GET_LIST_LOCATION_SUCCESS:
      return getListLocationSuccess(state, action);
    case actionTypes.GET_LIST_LOCATION_FAIL:
      return getListLocationFail(state, action);
    case actionTypes.DELETE_LOCATION_START:
      return deleteLocationStart(state);
    case actionTypes.DELETE_LOCATION_SUCCESS:
      return deleteLocationSuccess(state, action);
    case actionTypes.DELETE_LOCATION_FAIL:
      return deleteLocationFail(state, action);
    case actionTypes.REFRESH_MESSAGE_CRUD:
      return refreshMessage(state);
    default: return state;
  };
};

export default reducer;