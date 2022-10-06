import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllStudents, dispatchGetAllStudents } from '../../../../../redux/actions/AllStudentsAction'

function LoadMoreStudents() {
    const adminToken = useSelector(state => state.adminToken)
    const adminAuth = useSelector(state => state.adminAuth)
    const allStudents = useSelector(state => state.allStudents)

    const [page, setPage] = useState(1)
    const [search_username] = useState('')
    const [search_name] = useState('')
    const [sort] = useState('')
    const [grade] = useState('')

    const { isAdminLogged } = adminAuth

    const { result } = allStudents

    const dispatch = useDispatch()
    useEffect(() => {
        if(isAdminLogged) {
            return fetchAllStudents(adminToken, page, grade, sort, search_username, search_name).then(res => {
                dispatch(dispatchGetAllStudents(res))
            })
        }
    }, [adminToken, page, grade, sort, search_username, search_name, isAdminLogged, dispatch])

    return (
        <div>
            {
                result < page * 9 ? "" : <button onClick={() => setPage(page+1)} className="shadow inline-flex items-center bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:shadow-outline text-white font-semibold py-2 px-4 rounded-lg">Load more</button>
            }
        </div>
    )
}

export default LoadMoreStudents
