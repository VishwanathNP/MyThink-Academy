import React, {useState} from 'react'
import { FiEdit } from "react-icons/fi"
import { EditCourse } from '../Grade/GradeEdit'
import { DeleteCourse } from '../Grade/GradeDelete'

function GradeDetails({grade}) {
    const [showModal, setShowModal] = useState(false)

    const openModal = () => {
        setShowModal(prev => !prev)
    }

    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const openDeleteModal = () => {
        setShowDeleteModal(prev => !prev)
    }
    return (
        <>
        <div className="rounded-lg shadow-lg">
        <EditCourse id={grade._id} grade_name={grade.name} showModal={showModal} setShowModal={setShowModal} />
        <DeleteCourse id={grade._id} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />
            <div className="flex flex-col">
                <div className="h-48 p-4 rounded-t-lg bg-indigo-500">
                    <div className="flex justify-between">
                        <h1 className="text-gray-300 mb-6">Grades</h1>
                        <FiEdit onClick={openModal} className="text-white cursor-pointer" size={20} />
                    </div>
                    <h1 className="text-white text-5xl mb-6">{grade.name}</h1>
                </div>
                <div className="p-4 flex justify-between h-20 rounded-b-lg bg-white">
                    <button onClick={openDeleteModal} className="ring-none focus:outline-none block md:inline-block px-2 py-3 text-grey-darkest hover:text-grey-darker">
                        <span className="border-2 border-pink-500 bg-pink-500 p-1.5 px-3 rounded-full text-white">Delete</span>
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}

export default GradeDetails
