import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../Components/Navbar'
import axios from 'axios'
import makeToast from '../../../../Utils/Notification/Toaster'
import { isEmpty, isEmail } from '../../../../Utils/Validation/Validation'

import './admin.css'
import mail from  '../../../../assets/img/mail.svg'

const initialState = {
    email: '',
    err: '',
    success: ''
}

const AdminForgot = () => {
    const [admin, setAdmin] = useState(initialState)

    const  { email, err, success } = admin

    const handleChangeInput = e => {
        const { name, value } = e.target
        setAdmin({...admin, [name]:value, err: '', success: ''})
    }

    const forgotPassword = async () => {
        if(isEmpty(email))
                return setAdmin({...admin, err: 'Please fill in all fields.' , success: ''})
        
        if(!isEmail(email))
                return setAdmin({...admin, err: 'Invalid Email.' , success: ''})
        try {
            const res = await axios.post('/admin/forgot', {email})

            return setAdmin({...admin, err: '' , success: res.data.msg})

        } catch (err) {
            err.response.data.msg && 
            setAdmin({...admin, err: err.response.data.msg, success: ''})
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
                                <h1 className="text-md md:text-xl px-4 md:px-8">Forgot Your Password</h1>
                                <h1 className="text-md pt-2 px-4 md:px-8">Don’t worry. Please tell us your registered email address.</h1>
                                <div className="mt-2 pt-8 p-2 md:p-8">
                                    <div className="field pb-2">
                                        <input type="e-mail" required id="email" value={email} name="email" onChange={handleChangeInput} />
                                        <label htmlFor="email" title="Email" data-title="Email"></label>
                                    </div>
                                    <div className="">
                                        <div>
                                            <button onClick={forgotPassword} className="border-2 border-indigo-400 bg-indigo-400 py-2 px-8 rounded-full">Verify your Email</button>
                                        </div>
                                    </div>
                                    <div className="pt-2.5 pl-4">
                                        <Link to="/admin/login"><span className="text-blue-600">Remember Password ?</span></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 hidden md:w-2/5 md:inline-block self-center">
                                <img className="" src={mail} alt="register" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminForgot
