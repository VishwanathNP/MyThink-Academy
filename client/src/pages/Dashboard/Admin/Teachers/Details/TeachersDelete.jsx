import React, { useRef, useEffect, useCallback, useState } from 'react'
import { FiX } from 'react-icons/fi'
import makeToast from '../../../../../Utils/Notification/Toaster'
import { useSelector } from 'react-redux'
import axios from 'axios'

const initialState = {
    err: '',
    success: ''
}


export const DeleteTeacher = ({ id, showDeleteModal, setShowDeleteModal }) => {

    const [teachers, setTeachers] = useState(initialState)
    const { err, success } = teachers

    const adminToken = useSelector(state => state.adminToken)

    const handleSubmit = async e => {
        e.preventDefault()    
        try {
            const res = await axios.delete(`/admin/teachers/delete/${id}`, {
                headers: {Authorization: adminToken}
            })

            setTeachers({...teachers, err: '', success: res.data.msg})
            window.location.reload(false)
        } catch (err) {
            err.response.data.msg && 
            setTeachers({...teachers, err: err.response.data.msg, success: ''})
        }
    }

    const modalRef = useRef()
    
    const closeDeleteModal = e => {
        if(modalRef.current === e.target) {
            setShowDeleteModal(false);
        }
    }

    const keyPress = useCallback(e => {
        if(e.key === 'Escape' && showDeleteModal) {
            setShowDeleteModal(false)
        }
    }, [setShowDeleteModal, showDeleteModal])

    useEffect(() => {
        document.addEventListener('keydown', keyPress);
        return () => document.removeEventListener('keydown', keyPress)
    }, [keyPress])

    return (
        <>
        {showDeleteModal ? (
            <div ref={modalRef} onClick={closeDeleteModal} className="w-full h-full fixed inset-0 z-10 flex items-center justify-center p-4 " style={{background: "rgba(0, 0, 0, 0.8)"}}>
                <div className="bg-white shadow-2xl m-4 sm:m-8 rounded-lg w-full md:w-1/4 border-t-8 border-purple-500 p-4" showDeleteModal={showDeleteModal}>
                <div className="flex justify-between items-center text-xl">
                    <h6 className="text-xl font-bold">Are your sure you want to delete ?</h6>
                    <button onClick={() => setShowDeleteModal(prev => !prev)} ><FiX /></button>
                </div>
                <div className="px-4 mb-2">
                        {err && makeToast("error", err)}
                        {success && makeToast("success", success)}
                    </div>
                <div className="mt-8 flex justify-around">
                    <div className="flex justify-end">
                        <button onClick={handleSubmit} className="focus:outline-none border-2 border-indigo-400 bg-indigo-400 py-2 px-8 rounded-full">Yes</button>
                    </div>
                    <div onClick={() => setShowDeleteModal(prev => !prev)} className="flex justify-end">
                        <button className="focus:outline-none border-2 border-pink-400 bg-pink-400 py-2 px-8 rounded-full">No</button>
                    </div>
                </div>
                </div>
            </div>
        ) : null}
        </>
    )
}