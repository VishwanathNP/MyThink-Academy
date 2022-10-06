import ACTIONS from '../actions/index'

const parentToken = ''

const ParentTokenReducer = (state = parentToken, action) => {
    switch(action.type){
        case ACTIONS.GET_PARENT_TOKEN:
            return action.payload
        default:
            return state
    }
}

export default ParentTokenReducer