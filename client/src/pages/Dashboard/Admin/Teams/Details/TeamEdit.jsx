import React, { useRef, useEffect, useCallback, useState } from 'react'
import { FiX } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { isEmpty } from '../../../../..//Utils/Validation/Validation'
import axios from 'axios'
import makeToast from '../../../../../Utils/Notification/Toaster'

const initialState = {
    name: '',
    err: '',
    success: ''
}

export const TeamEdit = ({ id, showModal, setShowModal }) => {
    const adminToken = useSelector(state => state.adminToken)

    const [team, setTeam] = useState(initialState)
    const [loading, setLoading] = useState(false)
    const [avatar, setAvatar] = useState(false)

    const { name, err, success } = team

    const changeAvatar = async(e) => {
        e.preventDefault()
        try {
            const file = e.target.files[0]

            if(!file) return setTeam({ ...team, err: 'No files were uploaded.', success: ''})

            if(file.size > 1024 * 1024) 
                return setTeam({ ...team, err: 'Size too large.', success: ''})

            if(file.type !== 'image/jpeg' && file.type !== 'image/png')
                return setTeam({ ...team, err: 'File format is incorrect.', success: ''})

            let formData = new FormData()

            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload_avatar', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: adminToken}
            })

            setLoading(false)
            setAvatar(res.data.url)
            
        } catch (err) {
            setTeam({ ...team, err: err.response.data.msg, success:''})
        }
    }

    const handleChangeInput = e => {
        const { name, value } = e.target
        setTeam({...team, [name]:value, err: '', success: ''})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if(isEmpty(name))
            return setTeam({...team, err: 'Please fill in all fields.' , success: ''})
        
        try {
            const res = await axios.put(`/api/teams/${id}`, {
                name, avatar
            }, {
                headers: {Authorization: adminToken}
            })

            setTeam({...team, err: '', success: res.data.msg})
            window.location.reload(false)
        } catch (err) {
            err.response.data.msg && 
            setTeam({...team, err: err.response.data.msg, success: ''})
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
                    <div className="flow-root mb-10 self-center">
                            <label htmlFor="file" className="text-md ml-2 text-gray-600 w-full block">Team Logo</label>
                            <img className="rounded-full w-20 h-20 border-4 mt-2 border-gray-200 float-left" id="file" src={avatar ? avatar : null} alt="avatar" />
                            <div className="bg-gray-200 text-gray-500 text-xs mt-5 ml-8 font-bold px-4 py-2 rounded-lg float-left hover:bg-gray-300 hover:text-gray-600 relative overflow-hidden cursor-pointer">
                                <input onChange={changeAvatar} type="file" name="file" id="file_up" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" /> Change Photo
                            </div>
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