import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { ParentTabs } from './ParentTabs'
import { isLength, isStrong, isMatch, isPhone } from '../../../../Utils/Validation/Validation'
import makeToast from '../../../../Utils/Notification/Toaster'
import children_pic from "../../../../assets/img/children.svg"
import { FiArrowLeft } from "react-icons/fi";
import dateFormat from 'dateformat'
import { fetchChild, dispatchGetChild } from '../../../../redux/actions/ParentAuthAction'

const initialState = {
    firstName: '',
    lastName: '',
    phone:'',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}


function Profile() {
    const parentAuth = useSelector(state => state.parentAuth)
    const parentToken = useSelector(state => state.parentToken)

    const {isParent, parent, child} = parentAuth


    const [data, setData] = useState(initialState)
    const { firstName, lastName, phone, password, cf_password, err, success } = data

    const [avatar, setAvatar] = useState(false)
    const [loading, setLoading] = useState(false)

   
    const dispatch = useDispatch()
    useEffect(() => {
        if(isParent) {
            fetchChild(parentToken).then(res => {
                dispatch(dispatchGetChild(res))
            })
        }
    }, [parentToken, isParent, dispatch])

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
                headers: {'content-type': 'multipart/form-data', Authorization: parentToken}
            })

            setLoading(false)
            setAvatar(res.data.url)
            
        } catch (err) {
            setData({ ...data, err: err.response.data.msg, success:''})
        }
    }

    const updateInfor = () => {
        if(!isPhone(phone))
            return setData({...data, err: 'Invalid phone number.' , success: ''})

        try {
            axios.patch('/parent/update', {
                firstName: firstName ? firstName : parent.firstName,
                lastName: firstName ? firstName : parent.lastName,
                phone: phone ? phone : parent.phone,
                avatar: avatar ? avatar : parent.avatar
            }, {
                headers: {Authorization: parentToken}
            })
            setData({ ...data, err: '', success: "Updated Success!"})

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
            axios.post('/parent/reset', {password}, {
                headers: {Authorization: parentToken}
            })
            setData({ ...data, err:'', success: "Updated Success!"})

        } catch (err) {
            setData({ ...data, err: err.response.data.msg, success:''})
        }
    }

    const handleUpdate = () => {
        if(firstName || lastName || phone || avatar) updateInfor()
        if(password) updatePassword()
    }
     
    return (
        <main className="overflow-auto px-4 pb-4">
            <div>
                <div>
                    {err && makeToast("error", err)}
                    {success && makeToast("success", success)}
                    {loading && <h3>Loading...</h3>}
                </div>
                <ParentTabs>
                <div label="Profile Info">
                    <div className="w-full bg-white rounded-lg mx-auto mt-8 flex border-t-2 border-l-2 border-r-2 shadow-xl overflow-hidden rounded-b-none">
                        <div className="w-1/3 bg-gray-100 p-8 hidden md:inline-block">
                            <h2 className="font-medium text-md text-gray-700 mb-4 tracking-wide">Profile Info</h2>
                            <p className="text-xs text-gray-500">Update your basic profile information such as Name, Email Address, Phone Number, Password and Image.</p>
                    </div>
                    <div className="md:w-2/3 w-full">
                        <div className="py-3 px-8 md:px-16">
                            <label htmlFor="firstName" className="text-sm text-gray-600">First Name</label>
                            <input className="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500" 
                                    type="text" name="firstName" id="firstName" placeholder="Your firstName" defaultValue={parent.firstName} onChange={handleChange} />
                        </div>
                        <hr className="border-gray-200" />
                        <div className="py-3 px-8 md:px-16">
                            <label htmlFor="lastName" className="text-sm text-gray-600">Last Name</label>
                            <input className="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500" 
                                    type="text" name="lastName" id="lastName" placeholder="Your lastName" defaultValue={parent.lastName} onChange={handleChange} />
                        </div>
                        <hr className="border-gray-200" />
                        <div className="py-3 px-8 md:px-16">
                            <label htmlFor="email" className="text-sm text-gray-600">Email Address</label>
                            <input className="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500"
                                    type="email" name="email" id="email" placeholder="Your email address" disabled defaultValue={parent.email} />
                        </div>
                        <hr className="border-gray-200" />
                        <div className="py-3 px-8 md:px-16">
                            <label htmlFor="phone" className="text-sm text-gray-600">Phone Number</label>
                            <input className="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500"
                                    type="tel" name="phone" id="phone" placeholder="Your Phone Number" defaultValue={parent.phone} onChange={handleChange} />
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
                        <hr className="border-gray-200" />
                        <div className="py-3 px-8 md:px-16 flow-root">
                            <label htmlFor="file" className="text-sm text-gray-600 w-full block">Photo</label>
                            <img className="rounded-full w-16 h-16 border-4 mt-2 border-gray-200 float-left" id="file" src={avatar ? avatar : parent.avatar} alt="avatar" />
                            <div className="bg-gray-200 text-gray-500 text-xs mt-5 ml-3 font-bold px-4 py-2 rounded-lg float-left hover:bg-gray-300 hover:text-gray-600 relative overflow-hidden cursor-pointer">
                                <input type="file" name="file" id="file_up" onChange={changeAvatar} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" /> Change Photo
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-16 py-6 bg-gray-300 flow-root rounded-b-lg border-t border-gray-200">
                <div className="text-xs text-red-500">
                    <em>
                        * If you update your password here, you will not be able to login quickly using google and facebook.
                    </em>
                </div>
                    <p className="float-left text-xs text-gray-500 tracking-tight mt-2 pb-4 md:pb:0">Click on Save to update your Profile Info</p>
                    <button disabled={loading} onClick={handleUpdate} className="bg-indigo-500 text-white text-sm font-medium px-6 py-2 rounded float-right uppercase cursor-pointer">Update</button>
                </div>
                </div>
                <div label="Learners">
                    {child.length === 0 ? (
                            <div>
                            <div className="w-full bg-white h-auto rounded-lg mx-auto mt-8 flex border-t-2 border-b-2 border-l-2 border-r-2 shadow-xl overflow-hidden">
                            <div className="md:flex p-4">
                                    <div class="md:w-1/2 md:ml-16">
                                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 leading-tight mb-6">Glad to have you as a part of the family.</h2>
                                        <p className="text-gray-700 mb-6">You have not add an child, please create a child profile to get started.</p>
                                        <Link to="/parent/overview" className="shadow inline-flex items-center bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:shadow-outline text-white font-semibold py-2 px-4 rounded-lg">
                                        <FiArrowLeft className="mr-2" /> Add Children 
                                        </Link>
                                    </div>
                                    <div className="md:w-1/2 mt-4">
                                        <img className="w-64 h-48 object-cover mx-auto" src={children_pic} alt="children" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )  : (
                        <div>
                            {
                                child.map(student => (
                                    <div key={student._id} label="Profile Info">
                                        <div className="w-full bg-white rounded-lg mx-auto mt-8 border-2 overflow-hidden">
                                            <div className="flex flex-col md:flex-row">
                                                <div className="w-full md:w-1/3 p-8 flex item-center justify-center">
                                                    <div>
                                                    <h1 className="font-medium text-md text-gray-700 mb-4 tracking-wide">Profile Details</h1>
                                                    <img className="w-32 rounded-full" src={student.avatar} alt="avatar" />
                                                    </div>
                                                </div>
                                                <div className="w-full p-8">
                                                    <div className="grid grid-cols-2 gap-16">
                                                        <div>
                                                            <div>
                                                            <p className="text-sm text-gray-600">Name:</p>
                                                            <h1 className="font-medium text-xl text-gray-700 mb-4 tracking-wide">{student.firstName}</h1>
                                                            </div>
                                                            <div>
                                                                <p className="text-sm text-gray-600">Birthday:</p>
                                                                <h1 className="font-medium text-xl text-gray-700 mb-4 tracking-wide">{dateFormat(student.birthday, "dddd, mmmm dS, yyyy")}</h1>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div>
                                                            <p className="text-sm text-gray-600">Username:</p>
                                                            <h1 className="font-medium text-xl text-gray-700 mb-4 tracking-wide">{student.username}</h1>
                                                            </div>
                                                            <div>
                                                            <p className="text-sm text-gray-600">Grade:</p>
                                                            <h1 className="font-medium text-xl text-gray-700 mb-4 tracking-wide">{student.grade.name}</h1>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    ))
                            }
                        </div>
                    )
                    }

                    
                </div>
                <div label="Subscriptions">
                    Subscriptions Details
                </div>
                </ParentTabs>
            </div>
        </main>
    )
}

export default Profile
