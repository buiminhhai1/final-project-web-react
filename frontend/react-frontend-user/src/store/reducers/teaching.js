import * as actionTypes from '../actionTypes';

const initialState = {
    subjects: [],
    pending: false
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
                    value: subject,
                    label: subject
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
        default:
            return state;
    }
}

export const getTeachingPending = state => state.teachingReducer.pending;
export const getTeachingSubjects = state => state.teachingReducer.subjects;