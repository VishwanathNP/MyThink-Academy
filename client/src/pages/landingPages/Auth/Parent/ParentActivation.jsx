import React, { useState, useEffect } from 'react'
import { useParams, Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import makeToast from '../../../../Utils/Notification/Toaster'
import Navbar from '../../Components/Navbar'


const ParentActivation = () => {
    const {activation_token} = useParams()
    const [err, setErr] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        if(activation_token) {
            const activationEmail = async () => {
                try {
                    const res = await axios.post('/parent/activation', {activation_token})
                    setSuccess(res.data.msg)

                } catch (err) {
                    err.response.data.msg && setErr(err.response.data.msg)
                }
            }
            activationEmail()
        }
    }, [activation_token])

    const [toLogin, setToLogin] = useState(false)
    setTimeout(() => setToLogin(true), 3000)

    return (
        <div>
            <Navbar />
            <div className="container mx-auto mt-20 sm:mt-0">
                <div className="flex h-full md:h-screen justify-center items-center">
                    <div className="text-center w-full md:w-4/5 lg:w-4/5 xl:w-6/12 bg-white rounded-lg md:border-2 p-4 md:shadow-md">
                        <div className="mb-4">
                                {err && makeToast("error", err)}
                                {success && makeToast("success", success)}
                        </div>
                        {
                            err ? (
                                <div>
                                    <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 leading-tight mb-6">ohh!, please try again.</h1>
                                </div>
                            ) : (
                            <>
                            {
                                toLogin ? <Redirect to="/parent/login" /> 
                                        :<>
                                        <div>
                                            <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 leading-tight mb-6">Thank you for verifying your email address</h1>
                                            <p className="text-lg md:text-xl text-gray-800 mb-2 leading-tight mb-6">Please Login to get started</p>
                                            <div className="mb-4">
                                                <Link to="/parent/login" className="border-2 border-green-400 bg-green-400 py-2 px-8 rounded-full">Login</Link>
                                            </div>
                                        </div>
                                        </>
                            }
                            </>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ParentActivation
