import ACTIONS from '../actions/index'

const initialState = {
    headings: []
}

const headingsReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.HEADINGS:
            return {
                ...state,
                headings: action.payload
            }
        default:
            return state
    }
}

export default headingsReducer