import ACTIONS from './index'
import axios from 'axios'

export const fetchAllHeadings = async () => {
    const res = await axios.get('/api/heading')
    return res
}

export const dispatchGetAllHeadings = (res) => {
    return {
        type: ACTIONS.HEADINGS,
        payload: res.data
    }
}