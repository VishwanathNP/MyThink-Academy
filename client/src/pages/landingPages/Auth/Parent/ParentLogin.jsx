import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Navbar from '../../Components/Navbar'
import { FaGoogle, FaFacebookSquare, FaArrowLeft } from "react-icons/fa"
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { dispatchParentLogin } from '../../../../redux/actions/ParentAuthAction'

import makeToast from '../../../../Utils/Notification/Toaster'

import './parent.css'
import parentRegister from  '../../../../assets/img/parent.svg'

const initialState = {
    email: '',
    password: '',
    err: '',
    success: ''
}
const ParentLogin = (props) => {
    const [parent, setParent] = useState(initialState)
    const dispatch = useDispatch()
    const history= useHistory()

    const  { email, password, err, success } = parent

    const handleChangeInput = e => {
        const { name, value } = e.target
        setParent({...parent, [name]:value, err: '', success: ''})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const res = await axios.post('/parent/login', {email, password})
            setParent({...parent, err: '', success: res.data.msg})

            localStorage.setItem('Login', true)

            dispatch(dispatchParentLogin())
            history.push("/parent/overview")

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
                                <Link to="/student/login" className="flex text-sm pb-2">
                                    <FaArrowLeft />
                                    <h1 className="pl-4">Not a Adult,</h1><span className="text-green-600 pl-2">Student Login</span>
                                </Link>
                                <h1 className="text-md md:text-xl px-4 md:px-8">Login with your Email</h1>
                                <h1 className="text-md pt-2 px-4 md:px-8">Don't have an account ? <Link to="/parent/register" className="text-blue-600">Register</Link></h1>
                                <form onSubmit={handleSubmit} className="mt-2 pt-8 p-2 md:p-8">
                                    <div className="field pb-2">
                                        <input type="e-mail" required id="email" value={email} name="email" onChange={handleChangeInput} />
                                        <label htmlFor="email" title="Email" data-title="Email"></label>
                                    </div>
                                    <div className="field pb-2">
                                        <input type="password" required id="password" value={password} name="password" onChange={handleChangeInput} />
                                        <label htmlFor="password" title="Password" data-title="Password"></label>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="pt-2.5">
                                            <Link to="/parent/forgot" ><span className="text-blue-600">Forgot Password ?</span></Link>
                                        </div>
                                        <div>
                                            <button type="submit" className="border-2 border-indigo-400 bg-indigo-400 py-2 px-8 rounded-full">Login</button>
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

export default ParentLogin
