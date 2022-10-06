import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllParents, dispatchGetAllParents } from '../../../../redux/actions/AllParentsAction'
import ParentsDetails from './Details/ParentsDetails'
import ParentsFilters from './Details/ParentsFilters'
import LoadMoreParents from './Details/ParentsLoadMore'

import parents_pic from '../../../../assets/img/parents.svg'

function Parents() {
    const adminToken = useSelector(state => state.adminToken)
    const adminAuth = useSelector(state => state.adminAuth)
    const allParents = useSelector(state => state.allParents)

    const [page] = useState(1)
    const [search_email] = useState('')
    const [search_name] = useState('')
    const [sort] = useState('')

    const { isAdminLogged } = adminAuth

    const { parents, total_parents } = allParents

    const dispatch = useDispatch()
    useEffect(() => {
        if(isAdminLogged) {
            return fetchAllParents(adminToken, page, sort, search_email, search_name).then(res => {
                dispatch(dispatchGetAllParents(res))
            })
        }
    }, [adminToken, page, sort, search_email, search_name, isAdminLogged, dispatch])

    return (
        <>
        <main className="overflow-auto pb-4 px-6">
            <div className="container mx-auto max-w-8xl">
                <div className="md:flex bg-gray-100 mb-10 p-6 rounded-lg shadow">
                    <div className="md:w-1/2">
                        <h2 className="text-xl font-bold text-gray-800">Parents</h2>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mt-2 leading-tight mb-6">Find the list of parents.</h2>
                        <p className="text-gray-700 mb-6">Read, Update and Delete the parents.</p>
                        <p className="text-xl md:text-2xl font-bold text-gray-800 mt-2 leading-tight">Total no. of Parents: <span className="ml-4">{total_parents}</span></p>
                    </div>
                    <div className="md:w-1/2">
                        <img className="w-auto h-48 object-cover mx-auto" src={parents_pic} alt="course" />
                    </div>
                </div>
                <ParentsFilters />
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-8 pt-4">
                    {
                        parents.map(parent => {
                            return <ParentsDetails key={parent._id} parent={parent} />
                        })
                    }
                </div>
                <LoadMoreParents />
            </div>
        </main>
        </>
    )
}

export default Parents
