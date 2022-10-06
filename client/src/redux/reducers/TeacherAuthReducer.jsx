import ACTIONS from '../actions/index'

const initialState = {
    teacher: [],
    isTeacherLogged: false,
    isTeacher: false
}

const TeacherAuthReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.TEACHER_LOGIN:
            return {
                ...state,
                isTeacherLogged: true
            }
        case ACTIONS.GET_TEACHER:
            return {
                ...state,
                teacher: action.payload.teacher,
                isTeacher: action.payload.isTeacher
            }
        default:
            return state
    }
}

export default TeacherAuthReducer