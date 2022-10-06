import ACTIONS from './index'
import axios from 'axios'

export const fetchAllGrades = async () => {
    const res = await axios.get('/api/grade')
    return res
}

export const dispatchGetAllGrades = (res) => {
    return {
        type: ACTIONS.GRADES,
        payload: res.data
    }
}