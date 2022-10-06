import React, { useRef, useEffect, useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { FiX } from 'react-icons/fi'
import makeToast from '../../../../../Utils/Notification/Toaster'
import { useSelector } from 'react-redux'
import { isEmpty } from '../../../../../Utils/Validation/Validation'
import axios from 'axios'

const initialState = {
    chapter: '',
    topic: '',
    description: '',
    err: '',
    success: ''
}

export const AddTopic = ({ details, showModal, setShowModal }) => {
    const history = useHistory()

    const adminToken = useSelector(state => state.adminToken)

    const [top, setTop] = useState(initialState)
    const [loading, setLoading] = useState(false)
    const [callback, setCallback] = useState(false)

    const { chapter, topic, description, err, success } = top

    const handleChangeInput = e => {
        const { name, value } = e.target
        setTop({...top, [name]:value, err: '', success: ''})
    }

    const [image, setImage] = useState([{name: "", url: ""}])

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...image];
        list[index][name] = value;
        setImage(list);
    }

    const handleRemoveClick = index => {
        const list = [...image];
        list.splice(index, 1);
        setImage(list);
    }
    
    const handleAddClick = () => {
        setImage([...image, {name: "", url: ""}]);
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if(isEmpty(topic || description || chapter))
            return setTop({...top, err: 'Please fill in all fields.' , success: ''})
        
        try {
            setLoading(true)
            const res = await axios.post('/api/topic', {
                chapter: details._id, topic, description, image
            }, {
                headers: {Authorization: adminToken}
        })
        setLoading(false)
        setTop({...top, err: '', success: res.data.msg})
        setCallback(!callback)
        history.push(`/admin/course/chapter`)
        } catch (err) {
            err.response.data.msg && 
            setTop({...top, err: err.response.data.msg, success: ''})
        }
    }


    const modalRef = useRef()
    
    const closeModal = e => {
        if(modalRef.current === e.target) {
            setShowModal(false);
        }
    }

    const keyPress = useCallback(e => {
        if(e.key === 'Escape' && showModal) {
            setShowModal(false)
        }
    }, [setShowModal, showModal])

    useEffect(() => {
        document.addEventListener('keydown', keyPress);
        return () => document.removeEventListener('keydown', keyPress)
    }, [keyPress])

    return (
        <>
        {showModal ? (
            <div ref={modalRef} onClick={closeModal} className="w-full h-full fixed inset-0 z-10 flex items-center justify-center p-4 " style={{background: "rgba(0, 0, 0, 0.8)"}}>
                <div className="bg-white shadow-2xl m-4 sm:m-8 rounded-lg w-full md:w-1/2 border-t-8 border-purple-500 p-4" showModal={showModal}>
                <div className="flex justify-between items-center text-xl">
                    <h6 className="text-xl font-bold">Create a chapter for {details.name}</h6>
                    <button onClick={() => setShowModal(prev => !prev)} ><FiX /></button>
                </div>
                <div>
                    <form onSubmit={handleSubmit} className="p-4 grid grid-cols-2 gap-4">
                    <div>
                    <div className="px-4 mb-2">
                            {err && makeToast("error", err)}
                            {success && makeToast("success", success)}
                            {loading && <h3>Loading...</h3>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="chapter_name" className="block text-black font-medium text-sm mb-2">Chapter</label>
                        <input type="text" placeholder="Enter chapter name" id="chapter_name" disabled defaultValue={details.chapter} name="chapter_name" onChange={handleChangeInput} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="chapter" className="block text-black font-medium text-sm mb-2">Chapter ID</label>
                        <input type="text" placeholder="Enter chapter id name" id="chapter" disabled defaultValue={details._id} name="chapter" onChange={handleChangeInput} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="topic" className="block text-black font-medium text-sm mb-2">Topic</label>
                        <input type="text" placeholder="Enter topic name" id="topic" value={topic} name="topic" onChange={handleChangeInput} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
                    </div>
                    </div>
                    <div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-black font-medium text-sm mb-2">Description</label>
                        <textarea rows="8" type="text" placeholder="Enter topic description" id="description" value={description} name="description" onChange={handleChangeInput} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
                    </div>
                    <div>
                    {
                            image.map((x, i) => {
                                return (
                                    <div className="grid grid-cols-2 gap-4" key={i}>
                                        <div className="mb-4">
                                            <label htmlFor="name" className="block text-black font-medium text-sm mb-2">Image Name</label>
                                            <input type="text" placeholder="Enter topic image" id="name" value={x.name} name="name" onChange={e => handleInputChange(e, i)} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="url" className="block text-black font-medium text-sm mb-2">Image Url</label>
                                            <input type="text" placeholder="Enter topic url" id="name" value={x.url} name="url" onChange={e => handleInputChange(e, i)} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500" />
                                        </div>
                                        <div className="mb-4">
                                        {image.length !== 1 && <span onClick={() => handleRemoveClick(i)} className="border-2 border-red-400 bg-red-400 py-2 px-8 rounded-full">Remove</span>}
                                        {image.length - 1 === i && <span onClick={handleAddClick} className="border-2 border-green-400 bg-green-400 py-2 px-8 rounded-full">Add</span>}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="border-2 border-indigo-400 bg-indigo-400 py-2 px-8 rounded-full">Add topic</button>
                    </div>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        ) : null}
        </>
    )
}