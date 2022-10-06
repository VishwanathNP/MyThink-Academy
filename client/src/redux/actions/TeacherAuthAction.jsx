import ACTIONS from './index'
import axios from 'axios'

export const dispatchTeacherLogin = () => {
    return {
        type: ACTIONS.TEACHER_LOGIN
    }
}

export const fetchTeacher = async (teacherToken) => {
    const res = await axios.get('/teacher/infor', {
        headers: {Authorization: teacherToken}
    })
    return res
}

export const dispatchGetTeacher = (res) => {
    return {
        type: ACTIONS.GET_TEACHER,
        payload: {
            teacher: res.data,
            isTeacher: res.data.role === 2 ? true : false 
        }
    }
}