import ACTIONS from './index'
import axios from 'axios'

export const dispatchAdminLogin = () => {
    return {
        type: ACTIONS.ADMIN_LOGIN
    }
}

export const fetchAdmin = async (adminToken) => {
    const res = await axios.get('/admin/infor', {
        headers: {Authorization: adminToken}
    })
    return res
}

export const dispatchGetAdmin = (res) => {
    return {
        type: ACTIONS.GET_ADMIN,
        payload: {
            admin: res.data,
            isAdmin: res.data.role === 0 ? true : false 
        }
    }
}