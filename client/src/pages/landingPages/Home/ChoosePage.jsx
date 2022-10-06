import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Components/Navbar'

import users from '../../../assets/img/users.svg'

const ChoosePage = () => {
    return (
        <div>
            <Navbar />
            <div className="container mx-auto mt-20 sm:mt-0">
                    <div className="flex h-full md:h-screen justify-center items-center">
                        <div className="flex flex-col md:flex-row w-full md:w-4/5 lg:w-4/5 xl:w-6/12 bg-white rounded-lg md:border-2 p-4 md:shadow-md">
                            <div className="w-full md:w-3/5 flex flex-col justify-center items-center text-center">
                                <h1 className="text-md md:text-xl px-4 md:px-8">Welcome to <span className="text-bold">MyThinkacademy</span></h1>
                                <h1 className="text-md pt-2 px-4 md:px-8">Tell us who your to proceed.</h1>
                                <div className="flex justify-evenly gap-8 mt-2 pt-8 p-2 md:p-8">
                                <div>
                                    <Link to='/parent/login' className="border-2 border-indigo-400 bg-indigo-400 py-2 px-8 rounded-full">Parent</Link>
                                </div>
                                <div>
                                    <Link to='/student/login' className="border-2 border-green-400 bg-green-400 py-2 px-8 rounded-full">Student</Link>
                                </div>
                                </div>
                            </div>
                            <div className="p-4 md:w-2/5 md:inline-block self-center">
                                <img className="" src={users} alt="register" />
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default ChoosePage
