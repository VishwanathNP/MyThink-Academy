import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllParents, dispatchGetAllParents } from '../../../../../redux/actions/AllParentsAction'

function LoadMoreParents() {
    const adminToken = useSelector(state => state.adminToken)
    const adminAuth = useSelector(state => state.adminAuth)
    const allParents = useSelector(state => state.allParents)

    const [page, setPage] = useState(1)
    const [search_email] = useState('')
    const [search_name] = useState('')
    const [sort] = useState('')

    const { isAdminLogged } = adminAuth

    const { result } = allParents

    const dispatch = useDispatch()
    useEffect(() => {
        if(isAdminLogged) {
            return fetchAllParents(adminToken, page, sort, search_email, search_name).then(res => {
                dispatch(dispatchGetAllParents(res))
            })
        }
    }, [adminToken, page, sort, search_email, search_name, isAdminLogged, dispatch])

    return (
        <div>
            {
                result < page * 9 ? "" : <button onClick={() => setPage(page+1)} className="shadow inline-flex items-center bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:shadow-outline text-white font-semibold py-2 px-4 rounded-lg">Load more</button>
            }
        </div>
    )
}

export default LoadMoreParents