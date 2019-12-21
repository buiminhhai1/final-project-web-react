import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../shared/utility';

const initialState = {
  levelData: [],
  loading: false,
  error: null,
  message: null,
  pageNum: 1,
  pageSize: 15
};

const createLevelStart = state =>
  updateObject(state, {
    loading: true,
    error: null,
    message: null
  });

const createLevelSuccess = (state, action) => {
  const updatedData = [...state.levelData];
  updatedData.push({
    key: updatedData.length + 1 + '',
    _id: action._id,
    title: action.title
  });

  return updateObject(state, {
    loading: false,
    error: null,
    message: action.message,
    levelData: updatedData
  });
};

const createLevelFail = (state, action) =>
  updateObject(state, {
    loading: false,
    error: true,
    message: action.error
  });

const updateLevelStart = state =>
  updateObject(state, {
    loading: true,
    error: null,
    message: null
  });

const updateLevelSuccess = (state, action) => {
  const data = state.levelData.map(item => {
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
    levelData: data
  });
};

const updateLevelFail = (state, action) =>
  updateObject(state, {
    error: true,
    loading: false,
    message: action.error
  });

const getListLevelStart = state =>
  updateObject(state, {
    loading: true,
    error: null,
    message: null,
    levelData: []
  });

const getListLevelSuccess = (state, action) => {
  if (action.levels.length > 0) {
    const data = action.levels.map((item, index) => {
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
      levelData: data
    });
  }
  return state;
};

const getListLevelFail = (state, action) =>
  updateObject(state, {
    loading: false,
    error: true,
    message: action.error
  });

const deleteLevelStart = state =>
  updateObject(state, {
    loading: true,
    error: null,
    message: null
  });

const deleteLevelSuccess = (state, action) => {
  // eslint-disable-next-line
  const data = state.levelData.filter(item => {
    if (item._id !== action._id) {
      return item;
    }
  });
  return updateObject(state, {
    levelData: data,
    loading: false,
    error: null,
    message: action.message
  });
};

const deleteLevelFail = (state, action) =>
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
    case actionTypes.CREATE_LEVEL_START:
      return createLevelStart(state);
    case actionTypes.CREATE_LEVEL_SUCCESS:
      return createLevelSuccess(state, action);
    case actionTypes.CREATE_LEVEL_FAIL:
      return createLevelFail(state, action);

    case actionTypes.UPDATE_LEVEL_START:
      return updateLevelStart(state);
    case actionTypes.UPDATE_LEVEL_SUCCESS:
      return updateLevelSuccess(state, action);
    case actionTypes.UPDATE_LEVEL_FAIL:
      return updateLevelFail(state, action);

    case actionTypes.GET_LIST_LEVEL_START:
      return getListLevelStart(state);
    case actionTypes.GET_LIST_LEVEL_SUCCESS:
      return getListLevelSuccess(state, action);
    case actionTypes.GET_LIST_LEVEL_FAIL:
      return getListLevelFail(state, action);

    case actionTypes.DELETE_LEVEL_START:
      return deleteLevelStart(state);
    case actionTypes.DELETE_LEVEL_SUCCESS:
      return deleteLevelSuccess(state, action);
    case actionTypes.DELETE_LEVEL_FAIL:
      return deleteLevelFail(state, action);

    case actionTypes.REFRESH_MESSAGE_CRUD:
      return refreshMessage(state);
    default:
      return state;
  }
};
export default reducer;
