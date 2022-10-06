import React, {useState} from 'react'
import { FiMail, FiPhone, FiTrash } from "react-icons/fi"
import { DeleteParent } from './ParentsDelete'

function ParentsDetails({parent}) {

    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const openDeleteModal = () => {
        setShowDeleteModal(prev => !prev)
    }
    return (
        <>
        <div className="rounded-lg shadow-lg">
            <div className="flex flex-col">
            <DeleteParent id={parent._id} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />
                <div className="p-2 rounded-t-lg bg-indigo-500">
                    <div className="flex justify-between">
                        <h1 className="text-gray-300 mb-2">Profile:</h1>
                        <div className="flex gap-8">
                        <FiTrash onClick={openDeleteModal} className="text-white cursor-pointer" size={20} />
                        </div>
                    </div>
                    <h1 className="text-white text-xl mb-2" >{parent.firstName} {parent.lastName}</h1>
                    <h1 className="text-gray-300 text-md">{parent._id}</h1>
                </div>
                <div className="m-2 rounded-b-lg bg-white">
                    <div className="flex mb-2">
                        <FiMail className="self-center mr-2" size={20} />
                        <h1 className="text-gray-500 text-sm mt-2">Email:</h1>
                    </div>
                    <h1 className="text-black text-md truncate mt-2 mb-4 pl-8">{parent.email}</h1>
                    <div className="flex">
                        <FiPhone className="self-center mr-2" size={20} />
                        <h1 className="text-gray-500 text-sm mt-2">Phone:</h1>
                    </div>
                    <h1 className="text-black text-md mt-2 pl-8">{parent.phone}</h1>
                </div>
                <div className="p-2 rounded-b-lg">
                    <h1 className="text-black text-md mt-2" >Total no. of students: <span className="text-xl ml-2">{parent.students.length}</span></h1>
                </div>
            </div>
        </div>
        </>
    )
}

export default ParentsDetails
