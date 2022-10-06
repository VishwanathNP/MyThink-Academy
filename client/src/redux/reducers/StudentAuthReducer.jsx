import ACTIONS from '../actions/index'

const initialState = {
    student: [],
    isStudentLogged: false,
    isStudent: false,
}

const StudentAuthReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.STUDENT_LOGIN:
            return {
                ...state,
                isStudentLogged: true
            }
        case ACTIONS.GET_STUDENT:
            return {
                ...state,
                student: action.payload.student,
                isStudent: action.payload.isStudent
            }
        default:
            return state
    }
}

export default StudentAuthReducer