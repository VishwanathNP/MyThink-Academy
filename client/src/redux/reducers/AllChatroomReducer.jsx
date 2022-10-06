import ACTIONS from '../actions/index'

const initialState = {
    chatroom: []
}

const schedulesReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.SCHEDULES:
            return {
                ...state,
                chatroom: action.payload
            }
        default:
            return state
    }
}

export default schedulesReducer