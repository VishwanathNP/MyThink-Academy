import ACTIONS from './index'
import axios from 'axios'

export const fetchAllStudents = async (adminToken, page, grade, sort, search_username, search_name) => {
    const res = await axios.get(`/admin/all/students?limit=${page*9}&${grade}&${sort}&username[regex]=${search_username}&firstName[regex]=${search_name}`, {
        headers: {Authorization: adminToken}
    })
    return res
}

export const dispatchGetAllStudents = (res) => {
    return {
        type: ACTIONS.GET_ALL_STUDENTS,
        payload: {
            students: res.data.student,
            result: res.data.result,
            total_students: res.data.total_students
        }
    }
}