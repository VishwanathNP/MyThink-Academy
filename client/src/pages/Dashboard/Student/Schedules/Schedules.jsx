import React, { useEffect } from 'react'
import course_pic from '../../../../assets/img/course.svg'
import { fetchAllChatroom, dispatchGetAllChatroom } from '../../../../redux/actions/AllChatroom'
import { useSelector, useDispatch } from 'react-redux'

function Schedules() {

    const studentToken = useSelector(state => state.studentToken)
    const studentAuth = useSelector(state => state.studentAuth)
    const allSchedules = useSelector(state => state.allSchedules)

    const { isStudentLogged } = studentAuth

    const { chatroom } = allSchedules

    const dispatch = useDispatch()
    useEffect(() => {
        if(isStudentLogged) {
            return fetchAllChatroom(studentToken).then(res => {
                dispatch(dispatchGetAllChatroom(res))
            })
        }
    }, [studentToken, isStudentLogged, dispatch])


    return (
        <>
        <main className="overflow-auto pb-4 px-6">
            <div className="container mx-auto max-w-8xl">
            <div className="md:flex bg-gray-100 mb-10 p-6 rounded-lg shadow">
                <div className="md:w-1/2">
                    <h2 className="text-xl font-bold text-gray-800">Schedules</h2>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 mt-2 leading-tight mb-6">Find the list of available Schedules.</h2>
                    <p className="text-gray-700 mb-2">Create, Read, Update and Delete the schedules.</p>
                    <p className="text-gray-700 mb-6">All the courses are create according to the class groups.</p>
                </div>
                <div className="md:w-1/2">
                    <img className="w-64 h-48 object-cover mx-auto" src={course_pic} alt="course" />
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4 pb-4">
                    {
                        chatroom.map(chat => (
                            <div key={chat._id} className="rounded-lg shadow-lg">
                            <div className="flex flex-col">
                                <div className="flex justify-between items-center p-2 rounded-t-lg bg-yellow-400">
                                    <div>
                                    <div className="flex justify-between">
                                        <h1 className="text-white mb-2">Room Name:</h1>
                                    </div>
                                    <h1 className="text-black text-xl mb-2" >{chat.name}</h1>
                                    <div className="flex justify-between">
                                        <h1 className="text-white mb-2">Room ID:</h1>
                                    </div>
                                    <h1 className="text-black text-xl mb-2" >{chat._id}</h1>
                                    </div>
                                    <div>
                                    <a href={"/chatroom/"+chat._id} target="_blank" rel="noreferrer">
                                    <button className="shadow items-center bg-blue-500 hover:bg-blue-600 focus:outline-none focus:shadow-outline text-white font-semibold py-2 px-4 rounded-lg">
                                        Join
                                    </button>
                                    </a>
                                    </div>
                                </div>
                                <div className="m-2 rounded-b-lg bg-white">
                                    <div>
                                        <div className="flex mb-2">
                                            <h1 className="text-gray-500 text-sm mt-2">Date:</h1>
                                        </div>
                                        <h1 className="text-black text-md truncate mt-2 mb-4 pl-8">:</h1>
                                        <div className="flex mb-2">
                                            <h1 className="text-gray-500 text-sm mt-2">Time:</h1>
                                        </div>
                                        <h1 className="text-black text-md truncate mt-2 mb-4 pl-8">:</h1>
                                        <div className="flex">
                                            <h1 className="text-gray-500 text-sm mt-2">Team:</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))
                    }
                </div>
        </div>
        </main>
        </>
    )
}

export default Schedules
