import ACTIONS from './index'
import axios from 'axios'

export const fetchAllParents = async (adminToken, page, sort, search_email, search_name) => {
    const res = await axios.get(`/admin/all/parents?limit=${page*9}&${sort}&email[regex]=${search_email}&firstName[regex]=${search_name}`, {
        headers: {Authorization: adminToken}
    })
    return res
}

export const dispatchGetAllParents = (res) => {
    return {
        type: ACTIONS.GET_ALL_PARENTS,
        payload: {
            parents: res.data.parent,
            result: res.data.result,
            total_parents: res.data.total_parents
        }
    }
}