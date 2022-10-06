import ACTIONS from '../actions/index'

const initialState = {
    teachers: [],
    result: 0,
    total_teachers: 0
}

const AllTeachersReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.GET_ALL_TEACHERS:
            return {
                ...state,
                teachers: action.payload.teachers,
                result: action.payload.result,
                total_teachers: action.payload.total_teachers
            }
        default:
            return state
    }
}

export default AllTeachersReducer