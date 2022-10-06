import ACTIONS from '../actions/index'

const initialState = {
    grades: []
}

const gradesReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.GRADES:
            return {
                ...state,
                grades: action.payload
            }
        default:
            return state
    }
}

export default gradesReducer