import React, {useState} from 'react'
import { FiEdit2, FiTrash } from "react-icons/fi"
import { EditTopic } from './TopicEdit'
import { DeleteTopic } from './TopicDelete'

function TopicDetails({top}) {
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
        <div className="rounded-lg shadow-lg mb-8">
            <EditTopic cid={top.chapter._id} tid={top._id} chapter_name={top.chapter.chapter} topic_name={top.topic} topic_description={top.description} showModal={showModal} setShowModal={setShowModal} />
            <DeleteTopic cid={top.chapter._id} tid={top._id} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />
            <div className="flex flex-col h-full">
                <div className="bg-blue-500 rounded-t-lg p-4">
                    <div>
                        <div className="flex justify-between">
                            <h1 className="text-gray-300 mb-2">Topic</h1>
                            <div className="flex gap-4">
                                <FiEdit2  onClick={openModal} size={25} className="text-white cursor-pointer"/>
                                <FiTrash onClick={openDeleteModal} size={25} className="text-white cursor-pointer"/>
                            </div>
                        </div>
                        <h1 className="text-white text-4xl mb-6 capitalize">{top.topic}</h1>
                    </div>
                </div>
                <div className="p-4">
                    <h1 className="text-black text-lg mb-2 overflow-clip overflow-hidden ">{top.description}</h1>
                    
                </div>
            </div>
        </div>
        </>
    )
}

export default TopicDetails
