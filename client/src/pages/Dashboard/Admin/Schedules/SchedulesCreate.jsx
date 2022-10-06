import React, { useRef, useEffect, useCallback, useState } from 'react'
import { FiX } from 'react-icons/fi'
import makeToast from '../../../../Utils/Notification/Toaster'
import { useSelector } from 'react-redux'
import { isEmpty } from '../../../../Utils/Validation/Validation'
import axios from 'axios'

const initialState = {
    name: '',
    err: '',
    success: ''
}

export const AddSchedules = ({ showModal, setShowModal }) => {
    const adminToken = useSelector(state => state.adminToken)

    const [chatroom, setChatroom] = useState(initialState)

    const { name, err, success } = chatroom

    const handleChangeInput = e => {
        const { name, value } = e.target
        setChatroom({...chatroom, [name]:value, err: '', success: ''})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if(isEmpty(name))
            return setChatroom({...chatroom, err: 'Please fill in all fields.' , success: ''})
        
        try {
            const res = await axios.post('/api/chat', {
                name
            }, {
                headers: {Authorization: adminToken}
            })

            setChatroom({...chatroom, err: '', success: res.data.msg})
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
            <div ref={modalRef} onClick={closeModal} className="overflow-auto w-full h-full fixed inset-0 z-10 flex items-center justify-center p-4 " style={{background: "rgba(0, 0, 0, 0.8)"}}>
                <div className="bg-white shadow-2xl m-4 sm:m-8 rounded-lg w-full md:w-1/4 border-t-8 border-yellow-500 p-4" showModal={showModal}>
                <div className="flex justify-between items-center text-xl">
                    <h6 className="text-xl font-bold">Create a Schedules</h6>
                    <button onClick={() => setShowModal(prev => !prev)} ><FiX /></button>
                </div>
                <div>
                    <form onSubmit={handleSubmit} className="p-4">
                    <div className="px-4 mb-2">
                        {err && makeToast("error", err)}
                        {success && makeToast("success", success)}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-black font-medium text-sm mb-2">Name</label>
                        <input type="text" placeholder="Enter Heading name" id="name" value={name} name="name" onChange={handleChangeInput} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="date" className="block text-black font-medium text-sm mb-2">Date</label>
                        <input type="date" placeholder="Enter Heading name" id="date"  name="date" onChange={handleChangeInput} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="date" className="block text-black font-medium text-sm mb-2">Time</label>
                        <input type="time" placeholder="Enter Heading name" id="date"  name="date" onChange={handleChangeInput} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500" />
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="border-2 border-yellow-400 bg-yellow-400 py-2 px-8 rounded-full">Add Schedule</button>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        ) : null}
        </>
    )
}