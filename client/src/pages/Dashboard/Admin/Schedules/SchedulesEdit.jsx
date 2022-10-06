import React, { useRef, useEffect, useCallback, useState } from 'react'
import { FiX } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { isEmpty } from '../../../../Utils/Validation/Validation'
import axios from 'axios'
import makeToast from '../../../../Utils/Notification/Toaster'

const initialState = {
    name: '',
    err: '',
    success: ''
}

export const SchedulesEdit = ({ id, showModal, setShowModal }) => {
    const adminToken = useSelector(state => state.adminToken)

    const [chatroom, setChatroom] = useState(initialState)
    const [loading, setLoading] = useState(false)

    const { name, err, success } = chatroom

    const handleChangeInput = e => {
        const { name, value } = e.target
        setChatroom({...chatroom, [name]:value, err: '', success: ''})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if(isEmpty(name))
            return setChatroom({...chatroom, err: 'Please fill in all fields.' , success: ''})
            setLoading(true)
        try {
            const res = await axios.put(`/api/chat/${id}`, {
                name
            }, {
                headers: {Authorization: adminToken}
            })

            setChatroom({...chatroom, err: '', success: res.data.msg})
            setLoading(false)
            window.location.reload(false)
        } catch (err) {
            err.response.data.msg && 
            setChatroom({...chatroom, err: err.response.data.msg, success: ''})
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
                <div className="bg-white shadow-2xl m-4 sm:m-8 rounded-lg w-full md:w-1/4 border-t-8 border-purple-500 p-4" showModal={showModal}>
                <div className="flex justify-between items-center text-xl">
                    <h6 className="text-xl font-bold">Edit Category</h6>
                    <button onClick={() => setShowModal(prev => !prev)} ><FiX /></button>
                </div>
                <div>
                    <form onSubmit={handleSubmit} className="p-4">
                    <div className="px-4 mb-2">
                    {err && makeToast("error", err)}
                        {success && makeToast("success", success)}
                            {loading && <h3>Loading...</h3>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-black font-medium text-sm mb-2">Name</label>
                        <input type="text" placeholder="Enter category name" id="name" value={name} name="name" onChange={handleChangeInput} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="date" className="block text-black font-medium text-sm mb-2">Name</label>
                        <input type="date" placeholder="Enter category name" id="date" name="date" onChange={handleChangeInput} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="time" className="block text-black font-medium text-sm mb-2">Name</label>
                        <input type="time" placeholder="Enter category name" id="time" name="time" onChange={handleChangeInput} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="border-2 border-indigo-400 bg-indigo-400 py-2 px-8 rounded-full">Save</button>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        ) : null}
        </>
    )
}