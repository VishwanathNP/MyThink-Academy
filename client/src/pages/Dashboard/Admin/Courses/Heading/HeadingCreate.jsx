import React, { useRef, useEffect, useCallback, useState } from 'react'
import { FiX } from 'react-icons/fi'
import makeToast from '../../../../../Utils/Notification/Toaster'
import { useSelector } from 'react-redux'
import { isEmpty } from '../../../../../Utils/Validation/Validation'
import axios from 'axios'

const initialState = {
    heading: '',
    description: '',
    err: '',
    success: ''
}

export const AddHeading = ({ showModal, setShowModal }) => {
    const adminToken = useSelector(state => state.adminToken)

    const [head, setHead] = useState(initialState)

    const { heading, description, err, success } = head

    const handleChangeInput = e => {
        const { name, value } = e.target
        setHead({...head, [name]:value, err: '', success: ''})
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
        if(isEmpty(heading || description))
            return setHead({...head, err: 'Please fill in all fields.' , success: ''})
        
        try {
            const res = await axios.post('/api/heading', {
                heading, description, image
            }, {
                headers: {Authorization: adminToken}
            })

            setHead({...head, err: '', success: res.data.msg})
            window.location.reload(false)            
        } catch (err) {
            err.response.data.msg && 
            setHead({...head, err: err.response.data.msg, success: ''})
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
            <div ref={modalRef} onClick={closeModal} className="overflow-auto w-full h-full fixed inset-0 z-10 flex items-center justify-center p-4 " style={{background: "rgba(0, 0, 0, 0.8)"}}>
                <div className="bg-white shadow-2xl m-4 sm:m-8 rounded-lg w-full md:w-1/4 border-t-8 border-yellow-500 p-4" showModal={showModal}>
                <div className="flex justify-between items-center text-xl">
                    <h6 className="text-xl font-bold">Create a Heading</h6>
                    <button onClick={() => setShowModal(prev => !prev)} ><FiX /></button>
                </div>
                <div>
                    <form onSubmit={handleSubmit} className="p-4">
                    <div className="px-4 mb-2">
                        {err && makeToast("error", err)}
                        {success && makeToast("success", success)}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="heading" className="block text-black font-medium text-sm mb-2">Name</label>
                        <input type="text" placeholder="Enter Heading name" id="heading" value={heading} name="heading" onChange={handleChangeInput} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-black font-medium text-sm mb-2">Description</label>
                        <textarea rows="8" type="text" placeholder="Enter heading description" id="description" value={description} name="description" onChange={handleChangeInput} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500" />
                    </div>
                    <div>
                    {
                            image.map((x, i) => {
                                return (
                                    <div className="grid grid-cols-2 gap-4" key={i}>
                                        <div className="mb-4">
                                            <label htmlFor="name" className="block text-black font-medium text-sm mb-2">Image Name</label>
                                            <input type="text" placeholder="Enter Heading name" id="name" value={x.name} name="name" onChange={e => handleInputChange(e, i)} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="url" className="block text-black font-medium text-sm mb-2">Image Url</label>
                                            <input type="text" placeholder="Enter Heading name" id="name" value={x.url} name="url" onChange={e => handleInputChange(e, i)} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500" />
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
                        <button type="submit" className="border-2 border-yellow-400 bg-yellow-400 py-2 px-8 rounded-full">Add Heading</button>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        ) : null}
        </>
    )
}