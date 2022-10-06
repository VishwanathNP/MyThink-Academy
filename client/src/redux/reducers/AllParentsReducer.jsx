import ACTIONS from '../actions/index'

const initialState = {
    parents: [],
    result: 0,
    total_parents: 0
}

const AllParentsReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.GET_ALL_PARENTS:
            return {
                ...state,
                parents: action.payload.parents,
                result: action.payload.result,
                total_parents: action.payload.total_parents
            }
        default:
            return state
    }
}

export default AllParentsReducer