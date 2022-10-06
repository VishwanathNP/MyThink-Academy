import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllParents, dispatchGetAllParents } from '../../../../../redux/actions/AllParentsAction'

function ParentsFilters() {

    const adminToken = useSelector(state => state.adminToken)
    const adminAuth = useSelector(state => state.adminAuth)

    const [page] = useState(1)
    const [search_email, setSearch_email] = useState('')
    const [search_name, setSearch_name] = useState('')
    const [sort, setSort] = useState('')

    const { isAdminLogged } = adminAuth

    const dispatch = useDispatch()
    useEffect(() => {
        if(isAdminLogged) {
            return fetchAllParents(adminToken, page, sort, search_email, search_name).then(res => {
                dispatch(dispatchGetAllParents(res))
            })
        }
    }, [adminToken, page, sort, search_email, search_name, isAdminLogged, dispatch])

    return (
        <div className="grid grid-cols-1 grid-cols-3 gap-4 w-full">
        <div className="mb-4">
                <label className="block text-black font-medium text-sm mb-2">Sort by</label>
                <div className="relative">
                    <select value={sort} onChange={e=> setSort(e.target.value)} className="block appearance-none w-full bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
                        <option value="">Newest</option>
                        <option value="sort=createdAt">Oldest</option>
                        <option value="sort=firstName">Name</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
            </div>
                <div className="mb-4">
                    <label className="block text-black font-medium text-sm mb-2">Search by Email address</label>
                    <input onChange={e=> setSearch_email(e.target.value.toLowerCase())} type="text" value={search_email} placeholder="Enter category name" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
                </div>
                <div className="mb-4">
                    <label className="block text-black font-medium text-sm mb-2">Search by Name</label>
                    <input onChange={e=> setSearch_name(e.target.value.toLowerCase())} type="text" value={search_name} placeholder="Enter category name" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
                </div>
        </div>
    )
}

export default ParentsFilters
