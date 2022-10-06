import ACTIONS from '../actions/index'

const initialState = {
    results: 0,
    chapters: []
}

const chaptersReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.CHAPTERS:
            return {
                ...state,
                results: action.payload.results,
                chapters: action.payload.chapters
            }
        default:
            return state
    }
}

export default chaptersReducer