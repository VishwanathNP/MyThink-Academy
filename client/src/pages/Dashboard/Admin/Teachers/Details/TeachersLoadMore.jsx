import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllTeachers, dispatchGetAllTeachers } from '../../../../../redux/actions/AllTeachersAction'

function LoadMoreTeachers() {
    const adminToken = useSelector(state => state.adminToken)
    const adminAuth = useSelector(state => state.adminAuth)
    const allTeachers = useSelector(state => state.allTeachers)

    const [page, setPage] = useState(1)
    const [search_email] = useState('')
    const [search_name] = useState('')
    const [sort] = useState('')

    const { isAdminLogged } = adminAuth

    const { result } = allTeachers

    const dispatch = useDispatch()
    useEffect(() => {
        if(isAdminLogged) {
            return fetchAllTeachers(adminToken, page, sort, search_email, search_name).then(res => {
                dispatch(dispatchGetAllTeachers(res))
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

export default LoadMoreTeachers