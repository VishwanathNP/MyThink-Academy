import ACTIONS from '../actions/index'

const initialState = {
    students: [],
    results: 0,
    total_students: 0
}

const AllStudentsReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.GET_ALL_STUDENTS:
            return {
                ...state,
                students: action.payload.students,
                result: action.payload.result,
                total_students: action.payload.total_students
            }
        default:
            return state
    }
}

export default AllStudentsReducer
