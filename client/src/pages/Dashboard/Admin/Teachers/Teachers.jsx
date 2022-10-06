import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllTeachers, dispatchGetAllTeachers } from '../../../../redux/actions/AllTeachersAction'
import TeachersDetails from './Details/TeachersDetails'
import TeachersFilters from './Details/TeachersFilters'
import LoadMoreTeachers from './Details/TeachersLoadMore'

import teachers_pic from '../../../../assets/img/teachers.svg'

function Teachers() {
    const adminToken = useSelector(state => state.adminToken)
    const adminAuth = useSelector(state => state.adminAuth)
    const allTeachers = useSelector(state => state.allTeachers)

    const [page] = useState(1)
    const [search_email] = useState('')
    const [search_name] = useState('')
    const [sort] = useState('')

    const { isAdminLogged } = adminAuth

    const { teachers, total_teachers } = allTeachers

    const dispatch = useDispatch()
    useEffect(() => {
        if(isAdminLogged) {
            return fetchAllTeachers(adminToken, page, sort, search_email, search_name).then(res => {
                dispatch(dispatchGetAllTeachers(res))
            })
        }
    }, [adminToken, page, sort, search_email, search_name, isAdminLogged, dispatch])

    return (
        <>
        <main className="overflow-auto pb-4 px-6">
            <div className="container mx-auto max-w-8xl">
                <div className="md:flex bg-gray-100 mb-10 p-6 rounded-lg shadow">
                    <div className="md:w-1/2">
                        <h2 className="text-xl font-bold text-gray-800">Teachers</h2>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mt-2 leading-tight mb-6">Find the list of teachers.</h2>
                        <p className="text-gray-700 mb-6">Read, Update and Delete the teachers.</p>
                        <p className="text-xl md:text-2xl font-bold text-gray-800 mt-2 leading-tight">Total no. of Teachers: <span className="ml-4">{total_teachers}</span></p>
                    </div>
                    <div className="md:w-1/2">
                        <img className="w-auto h-48 object-cover mx-auto" src={teachers_pic} alt="course" />
                    </div>
                </div>
                <TeachersFilters />
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-8">
                    {
                        teachers.map(teacher => {
                            return <TeachersDetails key={teacher._id} teacher={teacher} />
                        })
                    }
                </div>
                <LoadMoreTeachers />
            </div>
        </main>
        </>
    )
}

export default Teachers
