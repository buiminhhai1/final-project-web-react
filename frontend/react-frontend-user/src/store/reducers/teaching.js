import * as actionTypes from '../actionTypes';

const initialState = {
  subjects: [],
  level: [],
  educationLevel: [],
  locations: [],
  teachers: [],
  contracts: [],
  teacher: {},
  money: 0,
  pending: false,
  error: null,
  message: null
};

export default function teachingReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.RESET_ERROR_MESSAGE:
      return {
        ...state,
        error: null,
        message: null
      };
    case actionTypes.GET_SUBJECTS_PENDING:
      return {
        ...state,
        pending: true
      };
    case actionTypes.GET_SUBJECTS_SUCCESS:
      let subjects = [];
      action.subjects.map(subject => {
        return subjects.push({
          value: subject._id,
          label: subject.title,
          data: subject
        });
      });
      return {
        ...state,
        subjects,
        pending: false
      };
    case actionTypes.GET_SUBJECTS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case actionTypes.GET_EDUCATION_LEVEL_PENDING:
      return {
        ...state,
        pending: true
      };
    case actionTypes.GET_EDUCATION_LEVEL_SUCCESS:
      let educationLevels = [];
      action.level.map(level => {
        return educationLevels.push({
          value: level._id,
          label: level.title,
          data: level
        });
      });
      return {
        ...state,
        educationLevel: educationLevels,
        pending: false
      };
    case actionTypes.GET_EDUCATION_LEVEL_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case actionTypes.GET_LEVEL_PENDING:
      return {
        ...state,
        pending: true
      };
    case actionTypes.GET_LEVEL_SUCCESS:
      const level = action.level.map(level => {
        return {
          value: level._id,
          label: level.title,
          data: level
        };
      });
      return {
        ...state,
        level,
        pending: false
      };
    case actionTypes.GET_LEVEL_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case actionTypes.GET_TEACHERS_PENDING:
      return {
        ...state,
        pending: true
      };
    case actionTypes.GET_TEACHERS_SUCCESS:
      const teachers = action.teachers.map(teacher => {
        return teacher;
      });
      return {
        ...state,
        teachers,
        pending: false
      };
    case actionTypes.GET_TEACHERS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case actionTypes.GET_TEACHER_PENDING:
      return {
        ...state,
        pending: true
      };
    case actionTypes.GET_TEACHER_SUCCESS:
      return {
        ...state,
        teacher: action.teacher,
        pending: false,
        message: `Get teacher's info success`
      };
    case actionTypes.GET_TEACHER_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case actionTypes.GET_LOCATIONS_PENDING:
      return {
        ...state,
        pending: true
      };
    case actionTypes.GET_LOCATIONS_SUCCESS:
      return {
        ...state,
        locations: action.locations,
        pending: false
      };
    case actionTypes.GET_LOCATIONS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case actionTypes.SEND_FIRST_MESSAGE_PENDING:
      return {
        ...state,
        pending: true,
        message: null
      };
    case actionTypes.SEND_FIRST_MESSAGE_SUCCESS:
      return {
        ...state,
        pending: false,
        message: 'Send message success'
      };
    case actionTypes.SEND_FIRST_MESSAGE_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
        message: null
      };
    case actionTypes.CREATE_CONTRACT_PENDING:
      return {
        ...state,
        pending: true,
      };
    case actionTypes.CREATE_CONTRACT_SUCCESS:
      return {
        ...state,
        pending: false,
        message: 'Contract has been created'
      };
    case actionTypes.CREATE_CONTRACT_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case actionTypes.GET_CONTRACTS_PENDING:
      return {
        ...state,
        pending: true,
      };
    case actionTypes.GET_CONTRACTS_SUCCESS:
      return {
        ...state,
        pending: false,
        contracts: action.contracts,
        message: 'All the contracts has been loaded'
      };
    case actionTypes.GET_CONTRACTS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case actionTypes.GET_MONEY_PENDING:
      return {
        ...state,
        pending: true,
      };
    case actionTypes.GET_MONEY_SUCCESS:
      return {
        ...state,
        pending: false,
        money: action.money,
      };
    case actionTypes.GET_MONEY_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case actionTypes.SEND_RATING_PENDING:
      return {
        ...state,
        pending: true,
      };
    case actionTypes.SEND_RATING_SUCCESS:
      return {
        ...state,
        pending: false,
        message: 'Rating successful'
      };
    case actionTypes.SEND_RATING_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case actionTypes.SEND_COMPLAIN_PENDING:
      return {
        ...state,
        pending: true,
      };
    case actionTypes.SEND_COMPLAIN_SUCCESS:
      return {
        ...state,
        pending: false,
        message: 'Complain successful! We will consider this'
      };
    case actionTypes.SEND_COMPLAIN_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case actionTypes.WITHDRAW_MONEY_PENDING:
      return {
        ...state,
        pending: true,
      };
    case actionTypes.WITHDRAW_MONEY_SUCCESS:
      return {
        ...state,
        pending: false,
        message: 'We have sent money to your account'
      };
    case actionTypes.WITHDRAW_MONEY_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };



    default:
      return state;
  }
}

export const getTeachingPending = state => state.teachingReducer.pending;
export const getTeachingSubjects = state => state.teachingReducer.subjects;
export const getEducationLevel = state => state.teachingReducer.educationLevel;
