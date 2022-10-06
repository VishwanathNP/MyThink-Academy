import React, { useState } from 'react'
import { SchedulesEdit } from './SchedulesEdit'
import { SchedulesDelete } from './SchedulesDelete'

function SchedulesDetails({chat}) {
    const [showModal, setShowModal] = useState(false)

    const openModal = () => {
        setShowModal(prev => !prev)
    }

    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const openDeleteModal = () => {
        setShowDeleteModal(prev => !prev)
    }
    return (
            <div className="rounded-lg shadow-lg">
                <SchedulesEdit id={chat._id} showModal={showModal} setShowModal={setShowModal} />
                <SchedulesDelete id={chat._id} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />
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
                    <div className="p-2 flex justify-end gap-8">
                        <div>
                        <button onClick={openModal} className="shadow items-center bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:shadow-outline text-white font-semibold py-2 px-4 rounded-lg">
                            Edit
                        </button>
                        </div>
                        <div>
                        <button onClick={openDeleteModal} className="shadow items-center bg-red-500 hover:bg-red-600 focus:outline-none focus:shadow-outline text-white font-semibold py-2 px-4 rounded-lg">
                            Delete
                        </button>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default SchedulesDetails
