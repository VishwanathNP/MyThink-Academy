import ACTIONS from './index'
import axios from 'axios'

export const fetchAllChatroom = async (adminToken) => {
    const res = await axios.get(`/api/chat`, {
        headers: {Authorization: adminToken}
    })
    return res
}

export const dispatchGetAllChatroom = (res) => {
    return {
        type: ACTIONS.SCHEDULES,
        payload: res.data
    }
}