import ACTIONS from '../actions/index'

const teacherToken = ''

const TeacherTokenReducer = (state = teacherToken, action) => {
    switch(action.type){
        case ACTIONS.GET_TEACHER_TOKEN:
            return action.payload
        default:
            return state
    }
}

export default TeacherTokenReducer