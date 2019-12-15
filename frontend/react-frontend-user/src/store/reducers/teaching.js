import * as actionTypes from '../actionTypes';

const initialState = {
    subjects: [],
    level: [],
    teachers: [],
    pending: false,
    error: null,
}

export default function teachingReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_SUBJECTS_PENDING:
            return {
                ...state,
                pending: true
            }
        case actionTypes.GET_SUBJECTS_SUCCESS:
            let subjects = [];
            action.subjects.map(subject => {
                return subjects.push({
                    value: subject._id,
                    label: subject.title,
                    data: subject
                })
            })
            return {
                ...state,
                subjects,
                pending: false,
            }
        case actionTypes.GET_SUBJECTS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case actionTypes.GET_LEVEL_PENDING:
            return {
                ...state,
                pending: true
            }
        case actionTypes.GET_LEVEL_SUCCESS:
            let levels = [];
            action.level.map(level => {
                return levels.push({
                    value: level._id,
                    label: level.title,
                    data: level
                })
            })
            return {
                ...state,
                level: levels,
                pending: false,
            }
        case actionTypes.GET_LEVEL_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case actionTypes.GET_TEACHERS_PENDING:
            return {
                ...state,
                pending: true
            }
        case actionTypes.GET_TEACHERS_SUCCESS:
            let teachers = action.teachers.map(teacher => {
                return teacher
            })
            return {
                ...state,
                teachers,
                pending: false,
            }
        case actionTypes.GET_TEACHERS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default:
            return state;
    }
}

export const getTeachingPending = state => state.teachingReducer.pending;
export const getTeachingSubjects = state => state.teachingReducer.subjects;
export const getTeachingLevel = state => state.teachingReducer.level;