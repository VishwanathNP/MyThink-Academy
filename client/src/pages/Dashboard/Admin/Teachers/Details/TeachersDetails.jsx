import React, {useState} from 'react'
import { FiMail, FiPhone, FiTrash, FiUsers } from "react-icons/fi"
import { DeleteTeacher } from './TeachersDelete'

function TeachersDetails({teacher}) {

    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const openDeleteModal = () => {
        setShowDeleteModal(prev => !prev)
    }
    
    return (
        <>
        <div className="rounded-lg shadow-lg">
            <div className="flex flex-col">
                <DeleteTeacher id={teacher._id} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />
                <div className="p-2 rounded-t-lg bg-yellow-500">
                    <div className="flex justify-between">
                        <h1 className="text-white mb-2">Profile:</h1>
                        <div className="flex gap-8">
                        <FiTrash onClick={openDeleteModal} className="text-white cursor-pointer" size={20} />
                        </div>
                    </div>
                    <h1 className="text-black text-xl mb-2" >{teacher.firstName} {teacher.lastName}</h1>
                    <h1 className="text-white text-md">{teacher._id}</h1>
                </div>
                <div className="m-2 rounded-b-lg bg-white">
                    <div className="flex mb-2">
                        <FiMail className="self-center mr-2" size={20} />
                        <h1 className="text-gray-500 text-sm mt-2">Email:</h1>
                    </div>
                    <h1 className="text-black text-md truncate mt-2 mb-4 pl-8">{teacher.email}</h1>
                    <div className="flex">
                        <FiPhone className="self-center mr-2" size={20} />
                        <h1 className="text-gray-500 text-sm mt-2">Phone:</h1>
                    </div>
                    <h1 className="text-black text-md mt-2 mb-4 pl-8">{teacher.phone}</h1>
                    <div className="flex">
                        <FiUsers className="self-center mr-2" size={20} />
                        <h1 className="text-gray-500 text-sm mt-2">Teams Handled:</h1>
                    </div>
                    <h1 className="text-black text-md mt-2 mb-4 pl-8">{teacher.teams.length === 0 ? "Not assigned" : teacher.teams.map(team => (<span className="p-1">{team.name}</span>))}</h1>
                </div>
            </div>
        </div>
        </>
    )
}

export default TeachersDetails
