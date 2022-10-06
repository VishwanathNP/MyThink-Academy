import ACTIONS from './index'
import axios from 'axios'

export const fetchAllChapters = async (grade, heading) => {
    const res = await axios.get(`/api/chapter?${grade}&${heading}`)
    return res
}

export const dispatchGetAllChapters = (res) => {
    return {
        type: ACTIONS.CHAPTERS,
        payload: {
            result: res.data.result,
            chapters: res.data.chapter
        }
    }
}