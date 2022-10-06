import ACTIONS from '../actions/index'

const initialState = {
    topics: []
}

const topicsReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.TOPICS:
            return {
                ...state,
                topics: action.payload
            }
        default:
            return state
    }
}

export default topicsReducer