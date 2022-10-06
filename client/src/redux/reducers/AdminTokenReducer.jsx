import ACTIONS from '../actions/index'

const adminToken = ''

const AdminTokenReducer = (state = adminToken, action) => {
    switch(action.type){
        case ACTIONS.GET_ADMIN_TOKEN:
            return action.payload
        default:
            return state
    }
}

export default AdminTokenReducer