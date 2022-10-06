import React, { useRef, useEffect, useCallback, useState } from 'react'
import { FiX } from 'react-icons/fi'
import makeToast from '../../../../../Utils/Notification/Toaster'
import { useSelector } from 'react-redux'
import { isEmpty } from '../../../../../Utils/Validation/Validation'
import axios from 'axios'

const initialState = {
    chapter: '',
    description: '',
    err: '',
    success: ''
}

export const EditChapter = ({ id, chapter_name, chapter_desc, showModal, setShowModal }) => {
    const adminToken = useSelector(state => state.adminToken)

    const [chap, setChap] = useState(initialState)
    const { chapter, description, err, success } = chap

    const handleChangeInput = e => {
        const { name, value } = e.target
        setChap({...chap, [name]:value, err: '', success: ''})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if(isEmpty(chapter || description))
            return setChap({...chap, err: 'Please fill in all fields.' , success: ''})
        
        try {
            const res = await axios.put(`/api/chapter/${id}`, {
                chapter: chapter ? chapter : chapter_name,
                description: description ? description: chapter_desc
            }, {
                headers: {Authorization: adminToken}
            })

            setChap({...chap, err: '', success: res.data.msg})
            window.location.reload(false)
        } catch (err) {
            err.response.data.msg && 
            setChap({...chap, err: err.response.data.msg, success: ''})
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
                <div className="bg-white shadow-2xl m-4 sm:m-8 rounded-lg w-full md:w-1/4 border-t-8 border-yellow-500 p-4" showModal={showModal}>
                <div className="flex justify-between items-center text-xl">
                    <h6 className="text-xl font-bold">Edit Chapter</h6>
                    <button onClick={() => setShowModal(prev => !prev)} ><FiX /></button>
                </div>
                <div>
                    <form onSubmit={handleSubmit} className="p-4">
                    <div className="px-4 mb-2">
                        {err && makeToast("error", err)}
                        {success && makeToast("success", success)}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="chapter" className="block text-black font-medium text-sm mb-2">Name</label>
                        <input type="text" placeholder="Enter chapter name" id="chapter" defaultValue={chapter_name} name="chapter" onChange={handleChangeInput} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-black font-medium text-sm mb-2">Description</label>
                        <textarea rows="8" type="text" placeholder="Enter chapter description" id="description" defaultValue={chapter_desc} name="description" onChange={handleChangeInput} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-yellow-500" />
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="border-2 border-yellow-400 bg-yellow-400 py-2 px-8 rounded-full">Save</button>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        ) : null}
        </>
    )
}