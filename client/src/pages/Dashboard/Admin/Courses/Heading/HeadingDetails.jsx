import React, {useState} from 'react'
import { EditHeading } from '../Heading/HeadingEdit'
import { DeleteHeading } from '../Heading/HeadingDelete'

function HeadingDetails({head}) {
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
        <EditHeading id={head._id} head_name={head.heading} head_desc={head.description} showModal={showModal} setShowModal={setShowModal} />
        <DeleteHeading id={head._id} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />
        <div className="grid grid-cols-1 md:grid-cols-3 h-full">
            <div className="bg-yellow-500 rounded-l-lg p-4 flex flex-col justify-between">
                <div>
                    <h1 className="text-gray-300 mb-2">Heading</h1>
                    <h1 className="text-white text-3xl mb-6 capitalize">{head.heading}</h1>
                </div>
            </div>
            <div className="col-span-2 p-4 flex flex-col justify-between">
                <div>
                    <h1 className="text-black text-lg mb-2 overflow-clip overflow-hidden ">{head.description}</h1>
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

export default HeadingDetails
