import ACTIONS from '../actions/index'

const initialState = {
    admin: [],
    isAdminLogged: false,
    isAdmin: false,
    categories: [],
    headings: [],
    topics: [],
}

const AdminAuthReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.ADMIN_LOGIN:
            return {
                ...state,
                isAdminLogged: true
            }
        case ACTIONS.GET_ADMIN:
            return {
                ...state,
                admin: action.payload.admin,
                isAdmin: action.payload.isAdmin
            }
        default:
            return state
    }
}

export default AdminAuthReducer