import ACTIONS from './index'
import axios from 'axios'

export const fetchAllTeachers = async (adminToken, page, sort, search_email, search_name) => {
    const res = await axios.get(`/admin/all/teachers?limit=${page*9}&${sort}&email[regex]=${search_email}&firstName[regex]=${search_name}`, {
        headers: {Authorization: adminToken}
    })
    return res
}

export const dispatchGetAllTeachers = (res) => {
    return {
        type: ACTIONS.GET_ALL_TEACHERS,
        payload: {
            teachers: res.data.teacher,
            result: res.data.result,
            total_teachers: res.data.total_teachers
        }
    }
}