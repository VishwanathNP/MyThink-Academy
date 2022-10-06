import ACTIONS from './index'
import axios from 'axios'

export const dispatchParentLogin = () => {
    return {
        type: ACTIONS.PARENT_LOGIN
    }
}

export const fetchParent = async (parentToken) => {
    const res = await axios.get('/parent/infor', {
        headers: {Authorization: parentToken}
    })
    return res
}

export const dispatchGetParent = (res) => {
    return {
        type: ACTIONS.GET_PARENT,
        payload: {
            parent: res.data,
            isParent: res.data.role === 1 ? true : false 
        }
    }
}

export const fetchChild = async (parentToken) => {
    const res = await axios.get('/parent/childinfor', {
        headers: {Authorization: parentToken}
    })
    return res
}

export const dispatchGetChild = (res) => {
    return {
        type: ACTIONS.GET_CHILD,
        payload: res.data
    }
}