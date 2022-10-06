import React, {useState} from 'react'
import { EditChapter } from '../Chapter/ChapterEdit'
import { DeleteChapter } from '../Chapter/ChapterDelete'
import { Link } from 'react-router-dom'
import { FiChevronRight } from "react-icons/fi"

function ChapterDetails({chapter}) {
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
        <EditChapter id={chapter._id} chapter_name={chapter.chapter} chapter_desc={chapter.description} showModal={showModal} setShowModal={setShowModal} />
        <DeleteChapter id={chapter._id} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />
        <div className="grid grid-cols-1 h-full">
            <div className="bg-red-500 rounded-lg p-4 flex flex-col justify-between">
                <div className="flex gap-8">
                <div>
                    <h1 className="text-gray-300 mb-2">Grade</h1>
                    <h1 className="text-white text-4xl mb-6 capitalize">{chapter.grade.name}</h1>
                </div>
                <div>
                    <h1 className="text-gray-300 mb-2">Heading</h1>
                    <h1 className="text-white text-4xl mb-6 capitalize">{chapter.heading.heading}</h1>
                </div>
                </div>
                <div>
                    <h1 className="text-gray-300 mb-2">Chapter</h1>
                    <h1 className="text-white text-4xl mb-6 capitalize">{chapter.chapter}</h1>
                </div>
                <div className="">
                    <Link to={`/admin/course/chapter/${chapter._id}`} className="flex self-center">
                        <p className="text-white text-left text-sm">view all topic</p>
                        <FiChevronRight className="self-center text-white" size={15} />
                    </Link>
                </div>
            </div>
            <div className="col-span-2 p-4 flex flex-col justify-between">
                <div>
                    <h1 className="text-black text-lg mb-2 overflow-clip overflow-hidden ">{chapter.description}</h1>
                </div>
                <div className="flex justify-end">
                    <button onClick={openModal} className="border-2 border-pink-900 bg-pink-900 p-1 px-8 rounded-full text-white mr-8">Edit</button>
                    <button onClick={openDeleteModal} className="border-2 border-purple-900 bg-purple-900 p-1 px-8 rounded-full text-white">Delete</button>
                </div>
            </div>
            </div>
        </div>
        </>
    )
}

export default ChapterDetails
