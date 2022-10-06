import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllStudents, dispatchGetAllStudents } from '../../../../redux/actions/AllStudentsAction'
import StudentsDetails from './Details/StudentsDetails'
import StudentsFilters from './Details/StudentsFilters'
import LoadMoreStudents from './Details/StudentsLoadMore'

import students_pic from '../../../../assets/img/Students.svg'

function Students() {
    const adminToken = useSelector(state => state.adminToken)
    const adminAuth = useSelector(state => state.adminAuth)
    const allStudents = useSelector(state => state.allStudents)

    const [page] = useState(1)
    const [search_username] = useState('')
    const [search_name] = useState('')
    const [sort] = useState('')
    const [grade] = useState('')

    const { isAdminLogged } = adminAuth

    const { students, total_students } = allStudents

    const dispatch = useDispatch()
    useEffect(() => {
        if(isAdminLogged) {
            return fetchAllStudents(adminToken, page, grade, sort, search_username, search_name).then(res => {
                dispatch(dispatchGetAllStudents(res))
            })
        }
    }, [adminToken, page, grade, sort, search_username, search_name, isAdminLogged, dispatch])

    console.log(students)

    return (
        <>
        <main className="overflow-auto pb-4 px-6">
            <div className="container mx-auto max-w-8xl">
                <div className="md:flex bg-gray-100 mb-10 p-6 rounded-lg shadow">
                    <div className="md:w-1/2">
                        <h2 className="text-xl font-bold text-gray-800">Students</h2>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mt-2 leading-tight mb-6">Find the list of students.</h2>
                        <p className="text-gray-700 mb-6">Read, Update and Delete the students.</p>
                        <p className="text-xl md:text-2xl font-bold text-gray-800 mt-2 leading-tight">Total no. of Students: <span className="ml-4">{total_students}</span></p>
                    </div>
                    <div className="md:w-1/2">
                        <img className="w-auto h-48 object-cover mx-auto" src={students_pic} alt="course" />
                    </div>
                </div>
                <StudentsFilters />
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-8">
                    {
                        students.map(student => {
                            return <StudentsDetails key={student._id} student={student} />
                        })
                    }
                </div>
                <LoadMoreStudents />
            </div>
        </main>
        </>
    )
}

export default Students
