import ACTIONS from '../actions/index'

const initialState = {
    parent: [],
    isParentLogged: false,
    isParent: false,
    child: []
}

const ParentAuthReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.PARENT_LOGIN:
            return {
                ...state,
                isParentLogged: true
            }
        case ACTIONS.GET_PARENT:
            return {
                ...state,
                parent: action.payload.parent,
                isParent: action.payload.isParent
            }
        case ACTIONS.GET_CHILD:
            return {
                ...state,
                child: action.payload,
            }
        default:
            return state
    }
}

export default ParentAuthReducer