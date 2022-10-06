import React, {useEffect} from 'react'
import { fetchAllHeadings, dispatchGetAllHeadings } from '../../../../redux/actions/HeadingsAction'
import { useDispatch, useSelector } from 'react-redux'
import {CircleProgress} from 'react-gradient-progress'
import { Link } from 'react-router-dom'
import { FiChevronRight } from "react-icons/fi"
import { fetchAllChatroom, dispatchGetAllChatroom } from '../../../../redux/actions/AllChatroom'

const Overview = () => {
    const studentToken = useSelector(state => state.studentToken)
    const studentAuth = useSelector(state => state.studentAuth)
    const allSchedules = useSelector(state => state.allSchedules)

    const allHeadings = useSelector(state => state.allHeadings)

    const {headings} = allHeadings

    const dispatch = useDispatch()
    useEffect(() => {
        fetchAllHeadings().then(res => {
            dispatch(dispatchGetAllHeadings(res))
        })
    }, [dispatch])
    
    const { isStudentLogged } = studentAuth

    const { chatroom } = allSchedules

    useEffect(() => {
        if(isStudentLogged) {
            return fetchAllChatroom(studentToken).then(res => {
                dispatch(dispatchGetAllChatroom(res))
            })
        }
    }, [studentToken, isStudentLogged, dispatch])
    return (
        <main className="overflow-auto pb-4 px-6">

        <div className="container mx-auto max-w-8xl h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl p-4">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-normal">Course Activity</h1>
                    </div>
                    <div className="grid grid-cols-1 gap-4 mt-8 overflow-y-scroll example h-screen p-1">
                        {
                            headings.map(head => (
                                <div key={head._id} className="p-4 rounded-xl shadow-md border-2 border-gray-300">
                                    <div className="flex gap-8 justify-between items-center">
                                        <div className="p-4 flex flex-col justify-between ">
                                            <h1 className="text-4xl font-bold tracking-wide leading-normal capitalize">{head.heading}</h1>
                                            <div className="mt-4">
                                            <Link to={`/`} className="flex self-center">
                                                <p className="text-black text-left text-sm underline">view all topic</p>
                                                <FiChevronRight className="self-center text-black" size={15} />
                                            </Link>
                                            </div>
                                        </div>
                                        <div>
                                        <CircleProgress percentage={0} strokeWidth={8} width={130}  secondaryColor={"rgba(209, 213, 219,1)"}/>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="grid grid-cols-1">
                    <div className="rounded-xl p-4 overflow-y-scroll example h-auto p-1">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-normal">Active Classes</h1>
                    </div>
                    <div className="mt-8">
                        {
                            chatroom.map(chat => (
                                <div key={chat._id} className="p-4 rounded-xl shadow-md mt-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                        <h1 className="text-2xl font-semibold mb-4 capitalize p-2">{chat.name}</h1>
                                            <div className="flex gap-10" >
                                                <div className="flex mb-2">
                                                    <h1 className="text-gray-500 text-sm mt-2">Date:</h1>
                                                </div>
                                                <div className="flex mb-2">
                                                    <h1 className="text-gray-500 text-sm mt-2">Time:</h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                        <a href={"/chatroom/"+chat._id} target="_blank" rel="noreferrer">
                                            <button className="shadow items-center bg-blue-500 hover:bg-blue-600 focus:outline-none focus:shadow-outline text-white font-semibold py-2 px-4 rounded-lg">
                                                Join Now
                                            </button>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    </div>
                    <div>
                        <div className="rounded-xl p-4">
                        <div>
                            <h1 className="text-2xl font-semibold tracking-normal">Teams</h1>
                            <div>
                                <h1 className="text-md mt-8 tracking-normal">Your not assigned to any team</h1>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </main>
    )
}

export default Overview