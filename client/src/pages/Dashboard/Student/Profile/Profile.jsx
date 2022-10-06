import React, { useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { isLength, isStrong, isMatch } from '../../../../Utils/Validation/Validation'
import makeToast from '../../../../Utils/Notification/Toaster'

const initialState = {
    firstName: '',
    lastName: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}


function Settings() {
    const studentAuth = useSelector(state => state.studentAuth)
    const studentToken = useSelector(state => state.studentToken)

    const {student} = studentAuth
    const [data, setData] = useState(initialState)
    const { firstName, lastName, password, cf_password, err, success } = data

    const [avatar, setAvatar] = useState(false)
    const [loading, setLoading] = useState(false)
    
    const handleChange = e => {
        const { name, value } = e.target 
        setData({ ...data, [name]:value, err: '', success: ''})
    }

    const changeAvatar = async(e) => {
        e.preventDefault()
        try {
            const file = e.target.files[0]

            if(!file) return setData({ ...data, err: 'No files were uploaded.', success: ''})

            if(file.size > 1024 * 1024) 
                return setData({ ...data, err: 'Size too large.', success: ''})

            if(file.type !== 'image/jpeg' && file.type !== 'image/png')
                return setData({ ...data, err: 'File format is incorrect.', success: ''})

            let formData = new FormData()

            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload_avatar', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: studentToken}
            })

            setLoading(false)
            setAvatar(res.data.url)
            
        } catch (err) {
            setData({ ...data, err: err.response.data.msg, success:''})
        }
    }

    const updateInfor = () => {
        try {
            axios.patch('/student/update', {
                firstName: firstName ? firstName : student.firstName,
                lastName: lastName ? lastName : student.lastName,
                avatar: avatar ? avatar : student.avatar
            }, {
                headers: {Authorization: studentToken}
            })
            setData({ ...data, err: '', success: "Updated Success!"})
            window.location.reload(false)
        } catch (err) {
            setData({ ...data, err: err.response.data.msg, success: ''})
        }
    }

    const updatePassword = () => {
        if(isLength(password))
            return setData({...data, err: 'Password must be at least 6 characters.' , success: ''})
        
        if(!isStrong(password))
            return setData({...data, err: 'Password must contain one or more alphanumeric characters.' , success: ''})

        if(!isMatch(password, cf_password))
            return setData({...data, err: 'Password did not match.' , success: ''})

        try {
            axios.post('/student/reset', {password}, {
                headers: {Authorization: studentToken}
            })
            setData({ ...data, err:'', success: "Updated Success!"})
            window.location.reload(false)
        } catch (err) {
            setData({ ...data, err: err.response.data.msg, success:''})
        }
    }

    const handleUpdate = () => {
        if(firstName || lastName || avatar) updateInfor()
        if(password) updatePassword()
    }

    return (
        <main className="overflow-auto pb-4 px-6">
            <div>
                <div className="px-4 mb-2">
                        {err && makeToast("error", err)}
                        {success && makeToast("success", success)}
                        {loading && <h3>Loading...</h3>}
                </div>
                <div className="container mx-auto max-w-8xl">
                    <div className="w-full bg-white rounded-lg mx-auto mt-8 flex flex-col md:flex-row border-t-2 border-l-2 border-r-2 shadow-xl overflow-hidden rounded-b-none">
                        <div className="md:w-1/3 w-full bg-gray-100 p-8">
                            <h2 className="font-medium text-md text-gray-700 mb-4 tracking-wide">Profile Info</h2>
                            <p className="text-xs text-gray-500">Update your basic profile information such as Name, Email Address, Phone Number, Password and Image.</p>
                            <div className="pt-8 mx-auto text-center w-48">
                                <div className="mt-8 mb-4">
                                    <img className="w-auto mx-auto rounded-full object-cover object-center" src={avatar ? avatar : student.avatar} alt="Avatar Upload" />
                                </div>
                                <div className="bg-gray-200 text-gray-500 text-xs mt-5 ml-8 font-bold px-4 py-2 rounded-lg float-left hover:bg-gray-300 hover:text-gray-600 relative overflow-hidden cursor-pointer">
                                    <input onChange={changeAvatar} type="file" name="file" id="file_up" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" /> Change Photo
                                </div>
                            </div>
                        </div>
                    <div className="md:w-2/3 w-full">
                        <div className="py-3 px-8 md:px-16">
                            <label htmlFor="firstName" className="text-sm text-gray-600">First Name</label>
                            <input className="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500" 
                                    type="text" name="firstName" id="firstName" placeholder="Your First Name" defaultValue={student.firstName} onChange={handleChange} />
                        </div>
                        <hr className="border-gray-200" />
                        <div className="py-3 px-8 md:px-16">
                            <label htmlFor="lastName" className="text-sm text-gray-600">Last Name</label>
                            <input className="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500" 
                                    type="text" name="lastName" id="lastName" placeholder="Your last Name" defaultValue={student.lastName} onChange={handleChange} />
                        </div>
                        <hr className="border-gray-200" />
                        <div className="py-3 px-8 md:px-16">
                            <label htmlFor="email" className="text-sm text-gray-600">Email Address</label>
                            <input className="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500"
                                    type="email" name="email" id="email" placeholder="Your email address" disabled defaultValue={student.username} />
                        </div>
                        <hr className="border-gray-200" />
                        <div className="py-3 px-8 md:px-16">
                            <label htmlFor="password" className="text-sm text-gray-600">Password</label>
                            <input className="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500" 
                                    type="password" name="password" id="password" placeholder="Your Password" value={password} onChange={handleChange} />
                        </div>
                        <hr className="border-gray-200" />
                        <div className="py-3 px-8 md:px-16">
                            <label htmlFor="cf_password" className="text-sm text-gray-600">Confirm New Password</label>
                            <input className="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500" 
                                    type="text" name="cf_password" id="cf_password" placeholder="Confirm Password" value={cf_password} onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <div className="p-16 py-6 bg-gray-300 flow-root rounded-b-lg border-t border-gray-200">
                    <p className="float-left text-xs text-gray-500 tracking-tight mt-2 pb-4 md:pb:0">Click on Save to update your Profile Info</p>
                    <button disabled={loading} onClick={handleUpdate} className="bg-indigo-500 text-white text-sm font-medium px-6 py-2 rounded float-right uppercase cursor-pointer">Update</button>
                </div>
                </div>
            </div>
        </main>
    )
}

export default Settings
