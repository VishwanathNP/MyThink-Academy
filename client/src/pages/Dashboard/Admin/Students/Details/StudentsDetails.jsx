import React, {useState} from 'react'
import { FiUser, FiPhone, FiTrash, FiUsers, FiMail } from "react-icons/fi"
import { GiRank3 } from 'react-icons/gi'
import { RiParentLine } from 'react-icons/ri'
import { MdPayment } from 'react-icons/md'
import { DeleteStudent } from './StudentsDelete'

function StudentsDetails({student}) {
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const openDeleteModal = () => {
        setShowDeleteModal(prev => !prev)
    }

    return (
        <>
        <div className="rounded-lg shadow-lg">
            <div className="flex flex-col">
                <DeleteStudent id={student._id} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />
                <div className="p-2 rounded-t-lg bg-pink-500">
                    <div className="flex justify-between">
                        <h1 className="text-white mb-2">Profile:</h1>
                        <div className="flex gap-8">
                        <FiTrash onClick={openDeleteModal} className="text-white cursor-pointer" size={20} />
                        </div>
                    </div>
                    <h1 className="text-black text-xl mb-2" >{student.firstName} {student.lastName}</h1>
                    <h1 className="text-white text-md">{student._id}</h1>
                </div>
                <div className="m-2 grid grid-cols-2 rounded-b-lg bg-white">
                    <div>
                        <div className="flex mb-2">
                            <FiUser className="self-center mr-2" size={20} />
                            <h1 className="text-gray-500 text-sm mt-2">Username:</h1>
                        </div>
                        <h1 className="text-black text-md truncate mt-2 mb-4 pl-8">{student.username}</h1>
                        <div className="flex mb-2">
                            <FiUsers className="self-center mr-2" size={20} />
                            <h1 className="text-gray-500 text-sm mt-2">Team:</h1>
                        </div>
                        <h1 className="text-black text-md truncate mt-2 mb-4 pl-8">{student.team === undefined || student.team === null ? "Not assigned" : student.team.name}</h1>
                        <div className="flex">
                            <FiPhone className="self-center mr-2" size={20} />
                            <h1 className="text-gray-500 text-sm mt-2">Parents Phone no.:</h1>
                        </div>
                        <h1 className="text-black text-md mt-2 pl-8">{student.parent.phone}</h1>
                    </div>
                    <div>
                        <div className="flex mb-2">
                            <GiRank3 className="self-center mr-2" size={20} />
                            <h1 className="text-gray-500 text-sm mt-2">Grade:</h1>
                        </div>
                        <h1 className="text-black text-md truncate mt-2 mb-4 pl-8">{student.grade.name}</h1>
                        <div className="flex">
                            <RiParentLine className="self-center mr-2" size={20} />
                            <h1 className="text-gray-500 text-sm mt-2">Parents Name:</h1>
                        </div>
                        <h1 className="text-black text-md mt-2 mb-4 pl-8">{student.parent.firstName} {student.parent.lastName}</h1>
                    </div>
                </div>
                <div className="p-2">
                    <div className="flex">
                        <FiMail className="self-center mr-2" size={20} />
                        <h1 className="text-gray-500 text-sm">Parents Email Address:</h1>
                    </div>
                    <h1 className="text-black text-md mt-2 mb-4 pl-8">{student.parent.email}</h1>
                    <div className="flex">
                        <MdPayment className="self-center mr-2" size={20} />
                        <h1 className="text-gray-500 text-sm">Payment Status:</h1>
                    </div>
                    <h1 className="text-black text-md mt-2 mb-4 pl-8">:</h1>
                </div>
            </div>
        </div>
        </>
    )
}

export default StudentsDetails
