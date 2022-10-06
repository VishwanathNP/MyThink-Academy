import ACTIONS from './index'
import axios from 'axios'

export const dispatchStudentLogin = () => {
    return {
        type: ACTIONS.STUDENT_LOGIN
    }
}

export const fetchStudent = async (studentToken) => {
    const res = await axios.get('/student/infor', {
        headers: {Authorization: studentToken}
    })
    return res
}

export const dispatchGetStudent = (res) => {
    return {
        type: ACTIONS.GET_STUDENT,
        payload: {
            student: res.data,
            isStudent: res.data.role === 3 ? true : false 
        }
    }
}