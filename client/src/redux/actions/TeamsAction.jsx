import ACTIONS from './index'
import axios from 'axios'

export const fetchAllTeams = async () => {
    const res = await axios.get('/api/teams')
    return res
}

export const dispatchGetAllTeams = (res) => {
    return {
        type: ACTIONS.TEAMS,
        payload: res.data
    }
}