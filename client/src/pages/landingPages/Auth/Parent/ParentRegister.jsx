import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../Components/Navbar'
import { FaGoogle, FaFacebookSquare } from "react-icons/fa"
import axios from 'axios'

import makeToast from '../../../../Utils/Notification/Toaster'
import { isEmpty, isEmail, isStrong, isPhone, isLength, isMatch } from '../../../../Utils/Validation/Validation'
import parentRegister from  '../../../../assets/img/parent.svg'

import './parent.css'

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

const ParentRegister = () => {
    const [parent, setParent] = useState(initialState)

    const  { firstName, lastName, email, phone, password, cf_password, err, success } = parent

    const handleChangeInput = e => {
        const { name, value } = e.target
        setParent({...parent, [name]:value, err: '', success: ''})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if(isEmpty(firstName) || isEmpty(lastName) || isEmpty(email) || isEmpty(phone) || isEmpty(password) || isEmpty(cf_password))
                return setParent({...parent, err: 'Please fill in all fields.' , success: ''})
            
        if(!isEmail(email))
            return setParent({...parent, err: 'Invalid Email.' , success: ''})
        
        if(!isPhone(phone))
            return setParent({...parent, err: 'Invalid phone number.' , success: ''})

        if(isLength(password))
            return setParent({...parent, err: 'Password must be at least 6 characters.' , success: ''})
        
        if(!isStrong(password))
            return setParent({...parent, err: 'Password must contain one or more alphanumeric characters.' , success: ''})

        if(!isMatch(password, cf_password))
            return setParent({...parent, err: 'Password did not match.' , success: ''})

        try {
            const res = await axios.post('/parent/register', {
                firstName, lastName, email, phone, password
            })
            setParent({...parent, err: '', success: res.data.msg})

        } catch (err) {
            err.response.data.msg && 
            setParent({...parent, err: err.response.data.msg, success: ''})
        }
    }

    return (
        <div>
            <div>
            <Navbar />
                <div className="container mx-auto mt-20 sm:mt-0">
                    <div className="flex h-full md:h-screen justify-center items-center">
                        <div className="flex w-full md:w-4/5 lg:w-4/5 xl:w-6/12 bg-white rounded-lg md:border-2 p-4 md:shadow-md">
                            <div className="w-full md:w-3/5">
                            <div className="mb-4">
                                    {err && makeToast("error", err)}
                                    {success && makeToast("success", success)}
                                </div>
                                <h1 className="text-md md:text-xl px-4 md:px-8">Create your Account with Email</h1>
                                <form onSubmit={handleSubmit} className="mt-2 p-2 md:p-8">
                                    <div className="pb-2">
                                        <div className="w-full flex flex-col md:flex-row mt-4 gap-2">
                                            <div className="field w-full md:w-1/2 md:mr-2">
                                                <input type="text" required id="firstName" value={firstName} name="firstName" onChange={handleChangeInput} />
                                                <label htmlFor="firstName" title="First Name" data-title="First Name"></label>
                                            </div>
                                            <div className="field w-full md:w-1/2">
                                                <input type="text" required id="lastName" value={lastName} name="lastName" onChange={handleChangeInput} />
                                                <label htmlFor="lastName" title="Last Name" data-title="Last Name"></label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="field pb-2">
                                        <input type="e-mail" required id="email" value={email} name="email" onChange={handleChangeInput} />
                                        <label htmlFor="email" title="Email" data-title="Email"></label>
                                    </div>
                                    <div className="field pb-2">
                                        <input type="tel" required id="phone" value={phone} name="phone" onChange={handleChangeInput} />
                                        <label htmlFor="phone" title="Phone" data-title="Phone"></label>
                                    </div>
                                    <div className="field pb-2">
                                        <input type="password" required id="password" value={password} name="password" onChange={handleChangeInput} />
                                        <label htmlFor="password" title="Password" data-title="Password"></label>
                                    </div>
                                    <div className="field pb-2">
                                        <input type="cf_password" required id="cf_password" value={cf_password} name="cf_password" onChange={handleChangeInput} />
                                        <label htmlFor="cf_password" title="Confirm Password" data-title="Confirm Password"></label>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="pt-2.5">
                                            <Link to="/parent/login" ><span className="text-blue-600">Sign in instead</span></Link>
                                        </div>
                                        <div>
                                            <button type="submit" className="border-2 border-indigo-400 bg-indigo-400 py-2 px-8 rounded-full">Register</button>
                                        </div>
                                    </div>
                                </form>
                                <div className="text-center"><h1>or</h1></div>
                                <div className="flex justify-between p-4">
                                    <Link to='/' className="flex flex-col items-center text-center">
                                        <FaGoogle size={25} />
                                        <span className="pl-2 pt-2">Sign in with Google</span>
                                    </Link> 
                                    <Link to='/' className="flex flex-col items-center text-center">
                                        <FaFacebookSquare size={25} />
                                        <span className="pl-2 pt-2">Sign in with Facebook</span>
                                    </Link>
                                </div>
                            </div>
                            <div className="p-4 hidden md:w-2/5 md:inline-block self-center">
                                <img className="" src={parentRegister} alt="register" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ParentRegister
