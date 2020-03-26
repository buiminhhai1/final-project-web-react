import * as actionTypes from '../actions/actionTypes';

import {
  updateObject
} from '../../shared/utility';

const initialState = {
  levelEducationData: [],
  loading: false,
  error: null,
  message: null,
  pageNum: 1,
  pageSize: 15
};

const createLevelEducationStart = state =>
  updateObject(state, {
    loading: true,
    error: null,
    message: null
  });

const createLevelEducationSuccess = (state, action) => {
  const updatedData = [...state.levelEducationData];
  updatedData.push({
    key: updatedData.length + 1 + '',
    _id: action._id,
    title: action.title
  });

  return updateObject(state, {
    loading: false,
    error: null,
    message: action.message,
    levelEducationData: updatedData
  });
};

const createLevelEducationFail = (state, action) =>
  updateObject(state, {
    loading: false,
    error: true,
    message: action.error
  });

const updateLevelEducationStart = state =>
  updateObject(state, {
    loading: true,
    error: null,
    message: null
  });

const updateLevelEducationSuccess = (state, action) => {
  const data = state.levelEducationData.map(item => {
    if (item._id === action._id) {
      const updateItem = {
        _id: action._id,
        title: action.title,
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
    levelEducationData: data
  });
};

const updateLevelEducationFail = (state, action) =>
  updateObject(state, {
    error: true,
    loading: false,
    message: action.error
  });

const getListLevelEducationStart = state =>
  updateObject(state, {
    loading: true,
    error: null,
    message: null,
    levelEducationData: []
  });

const getListLevelEducationSuccess = (state, action) => {
  if (action.levelEducations.length > 0) {
    const data = action.levelEducations.map((item, index) => {
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
      levelEducationData: data
    });
  }
  return state;
};

const getListLevelEducationFail = (state, action) =>
  updateObject(state, {
    loading: false,
    error: true,
    message: action.error
  });

const deleteLevelEducationStart = state =>
  updateObject(state, {
    loading: true,
    error: null,
    message: null
  });

const deleteLevelEducationSuccess = (state, action) => {
  // eslint-disable-next-line
  const data = state.levelEducationData.filter(item => {
    if (item._id !== action._id) {
      return item;
    }
  });
  return updateObject(state, {
    levelEducationData: data,
    loading: false,
    error: null,
    message: action.message
  });
};

const deleteLevelEducationFail = (state, action) =>
  updateObject(state, {
    loading: false,
    error: true,
    message: action.error
  });

const refreshMessage = state =>
  updateObject(state, {
    message: null,
    error: null
  });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_LEVEL_EDUCATION_START:
      return createLevelEducationStart(state);
    case actionTypes.CREATE_LEVEL_EDUCATION_SUCCESS:
      return createLevelEducationSuccess(state, action);
    case actionTypes.CREATE_LEVEL_EDUCATION_FAIL:
      return createLevelEducationFail(state, action);

    case actionTypes.UPDATE_LEVEL_EDUCATION_START:
      return updateLevelEducationStart(state);
    case actionTypes.UPDATE_LEVEL_EDUCATION_SUCCESS:
      return updateLevelEducationSuccess(state, action);
    case actionTypes.UPDATE_LEVEL_EDUCATION_FAIL:
      return updateLevelEducationFail(state, action);

    case actionTypes.GET_LIST_LEVEL_EDUCATION_START:
      return getListLevelEducationStart(state);
    case actionTypes.GET_LIST_LEVEL_EDUCATION_SUCCESS:
      return getListLevelEducationSuccess(state, action);
    case actionTypes.GET_LIST_LEVEL_EDUCATION_FAIL:
      return getListLevelEducationFail(state, action);

    case actionTypes.DELETE_LEVEL_EDUCATION_START:
      return deleteLevelEducationStart(state);
    case actionTypes.DELETE_LEVEL_EDUCATION_SUCCESS:
      return deleteLevelEducationSuccess(state, action);
    case actionTypes.DELETE_LEVEL_EDUCATION_FAIL:
      return deleteLevelEducationFail(state, action);

    case actionTypes.REFRESH_MESSAGE_CRUD:
      return refreshMessage(state);
    default:
      return state;
  }
};
export default reducer;