import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../Components/Navbar'
import axios from 'axios'
import makeToast from '../../../../Utils/Notification/Toaster'
import { useParams } from 'react-router-dom'
import { isStrong, isLength, isMatch } from '../../../../Utils/Validation/Validation'

import './parent.css'
import passwordReset from  '../../../../assets/img/password.svg'

const initialState = {
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

const ParentReset = () => {
    const [parent, setParent] = useState(initialState)
    const { token } = useParams()

    const  { password, cf_password, err, success } = parent

    const handleChangeInput = e => {
        const { name, value } = e.target
        setParent({...parent, [name]:value, err: '', success: ''})
    }

    const handleResetPassword = async () => {
        if(isLength(password))
            return setParent({...parent, err: 'Password must be at least 6 characters.' , success: ''})
        
        if(!isStrong(password))
            return setParent({...parent, err: 'Password must contain one or more alphanumeric characters.' , success: ''})

        if(!isMatch(password, cf_password))
            return setParent({...parent, err: 'Password did not match.' , success: ''})

        try {
            const res = await axios.post('/parent/reset', {password}, {
                headers: {Authorization: token}
            })
            return setParent({...parent, err: '', success: res.data.msg})

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
                                <h1 className="text-md md:text-xl px-4 md:px-8">Reset Your Password</h1>
                                <div className="mt-2 pt-8 p-2 md:p-8">
                                    <div className="field pb-2">
                                        <input type="password" required id="password" value={password} name="password" onChange={handleChangeInput} />
                                        <label htmlFor="password" title="Password" data-title="Password"></label>
                                    </div>
                                    <div className="field pb-2">
                                        <input type="cf_password" required id="cf_password" value={cf_password} name="cf_password" onChange={handleChangeInput} />
                                        <label htmlFor="cf_password" title="Confirm Password" data-title="Confirm Password"></label>
                                    </div>
                                    <div className="flex justify-between">
                                        <div>
                                            <button onClick={handleResetPassword} className="border-2 border-indigo-400 bg-indigo-400 py-2 px-8 rounded-full">Reset Password</button>
                                        </div>
                                        <div className="pt-2.5 pl-4">
                                            <Link to="/parent/login"><span className="text-blue-600">Login Now</span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 hidden md:w-2/5 md:inline-block self-center">
                                <img className="" src={passwordReset} alt="register" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ParentReset
