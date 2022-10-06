import ACTIONS from '../actions/index'

const initialState = {
    teams: []
}

const teamsReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.TEAMS:
            return {
                ...state,
                teams: action.payload
            }
        default:
            return state
    }
}

export default teamsReducer