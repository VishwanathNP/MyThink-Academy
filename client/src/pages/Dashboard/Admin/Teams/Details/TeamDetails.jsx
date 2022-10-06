import React, { useState } from 'react'
import { FiEdit2, FiTrash } from "react-icons/fi"
import { TeamEdit } from './TeamEdit'
import { TeamDelete } from './TeamDelete'

function TeamDetails({team}) {
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
            <TeamEdit id={team._id} showModal={showModal} setShowModal={setShowModal} />
            <TeamDelete id={team._id} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />
            <div className="flex flex-col">
                <div className="flex justify-between bg-pink-400 p-4 rounded-t-lg">
                    <div className="flex">
                        <div>
                            <img className="rounded-full h-16 w-16" src={team.avatar} alt="avatar" />
                        </div>
                        <div className="self-center">
                            <h1 className="text-white text-xl ml-4">{team.name}</h1>
                        </div>
                    </div>
                    <div className="flex">
                        <FiEdit2 onClick={openModal} className="text-white cursor-pointer "size={20} />
                        <FiTrash onClick={openDeleteModal} className="text-white cursor-pointer ml-4" size={20} />
                    </div>
                </div>
                <div className="flex">
                <div className="p-4">
                    <h1 className="text-gray text-sm">Lead:</h1>
                    <h1 className="text-black text-md">{team.teacher.firstName}</h1>
                </div>
                <div className="p-4">
                    <h1 className="text-gray text-sm">Lead ID:</h1>
                    <h1 className="text-black text-md">{team.teacher._id}</h1>
                </div>
                </div>
                <div className="flex">
                    <div className="p-4">
                        <h1 className="text-gray text-sm">Members:</h1>
                        {
                            team.students.map(std => (
                                <h1 key={std._id} className="text-black text-md">{std.firstName}</h1>
                            ))
                        }
                    </div>
                    <div className="p-4">
                        <h1 className="text-gray text-sm">Members ID:</h1>
                        {
                            team.students.map(std => (
                                <h1 key={std._id} className="text-black text-md">{std._id}</h1>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeamDetails
