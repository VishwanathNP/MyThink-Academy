import ACTIONS from '../actions/index'

const studentToken = ''

const StudentTokenReducer = (state = studentToken, action) => {
    switch(action.type){
        case ACTIONS.GET_STUDENT_TOKEN:
            return action.payload
        default:
            return state
    }
}

export default StudentTokenReducer