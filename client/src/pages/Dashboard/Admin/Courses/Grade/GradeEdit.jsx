import React, { useRef, useEffect, useCallback, useState } from 'react'
import { FiX } from 'react-icons/fi'
import makeToast from '../../../../../Utils/Notification/Toaster'
import { useSelector } from 'react-redux'
import { isEmpty } from '../../../../../Utils/Validation/Validation'
import axios from 'axios'

const initialState = {
    name: '',
    err: '',
    success: ''
}

export const EditCourse = ({ id, grade_name, showModal, setShowModal }) => {
    const adminToken = useSelector(state => state.adminToken)

    const [grade, setGrade] = useState(initialState)
    const { name, err, success } = grade

    const handleChangeInput = e => {
        const { name, value } = e.target
        setGrade({...grade, [name]:value, err: '', success: ''})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if(isEmpty(name))
            return setGrade({...grade, err: 'Please fill in all fields.' , success: ''})
        
        try {
            const res = await axios.put(`/api/grade/${id}`, {
                name: name ? name : grade_name
            }, {
                headers: {Authorization: adminToken}
            })

            setGrade({...grade, err: '', success: res.data.msg})
            window.location.reload(false)
        } catch (err) {
            err.response.data.msg && 
            setGrade({...grade, err: err.response.data.msg, success: ''})
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
                    </div>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-black font-medium text-sm mb-2">Name</label>
                        <input type="text" placeholder="Enter category name" id="name" defaultValue={grade_name} name="name" onChange={handleChangeInput} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
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