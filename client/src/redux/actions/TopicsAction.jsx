import ACTIONS from './index'
import axios from 'axios'

export const fetchAllTopics = async () => {
    const res = await axios.get('/api/topic')
    return res
}

export const dispatchGetAllTopics = (res) => {
    return {
        type: ACTIONS.TOPICS,
        payload: res.data
    }
}