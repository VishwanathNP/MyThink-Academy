import React, { useState, useEffect } from 'react'
import course_pic from '../../../../assets/img/course.svg'
import { FiPlus } from 'react-icons/fi'
import { fetchAllChatroom, dispatchGetAllChatroom } from '../../../../redux/actions/AllChatroom'
import { useSelector, useDispatch } from 'react-redux'
import { AddSchedules } from './SchedulesCreate'
import SchedulesDetails from './SchedulesDetails'

function Schedules() {
    const [showModal, setShowModal] = useState(false)

    const openModal = () => {
        setShowModal(prev => !prev)
    }

    const adminToken = useSelector(state => state.adminToken)
    const adminAuth = useSelector(state => state.adminAuth)
    const allSchedules = useSelector(state => state.allSchedules)

    const { isAdminLogged } = adminAuth

    const { chatroom } = allSchedules

    const dispatch = useDispatch()
    useEffect(() => {
        if(isAdminLogged) {
            return fetchAllChatroom(adminToken).then(res => {
                dispatch(dispatchGetAllChatroom(res))
            })
        }
    }, [adminToken, isAdminLogged, dispatch])


    return (
        <>
        <AddSchedules showModal={showModal} setShowModal={setShowModal} />
        <main className="overflow-auto pb-4 px-6">
            <div className="container mx-auto max-w-8xl">
            <div className="md:flex bg-gray-100 mb-10 p-6 rounded-lg shadow">
                <div className="md:w-1/2">
                    <h2 className="text-xl font-bold text-gray-800">Schedules</h2>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 mt-2 leading-tight mb-6">Find the list of available Schedules.</h2>
                    <p className="text-gray-700 mb-2">Create, Read, Update and Delete the schedules.</p>
                    <p className="text-gray-700 mb-6">All the courses are create according to the class groups.</p>
                    <div>
                        <button onClick={openModal} className="shadow inline-flex items-center bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:shadow-outline text-white font-semibold py-2 px-4 rounded-lg">
                            <FiPlus size={25} className="mr-4" />Create a Room
                        </button>
                    </div>
                </div>
                <div className="md:w-1/2">
                    <img className="w-64 h-48 object-cover mx-auto" src={course_pic} alt="course" />
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4 pb-4">
                    {
                        chatroom.map(chat => (
                            <SchedulesDetails key={chat._id} chat={chat} />
                        ))
                    }
                </div>
        </div>
        </main>
        </>
    )
}

export default Schedules
