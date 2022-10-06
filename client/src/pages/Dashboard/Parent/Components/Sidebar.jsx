import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { IoGridOutline, IoTimeOutline, IoBookOutline, IoPersonOutline } from 'react-icons/io5'
import logo_small from "../../../../assets/img/Logo_small.png"

import './parentdashboard.css'

const DashboardParentSidebar = ({ sidebarOpen, closeSidebar }) => {
    return (
        <>
        <div onClick={() => closeSidebar()} className={sidebarOpen ? 'block fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden' : 'hidden fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden'}></div>
        <div className={sidebarOpen ? 'translate-x-0 ease-out border-r-2 fixed z-30 inset-y-0 left-0 w-60 transition bg-white duration-300 transform overflow-y-auto lg:translate-x-0 lg:static lg:inset-0' : '-translate-x-full ease-in border-r-2 fixed z-30 inset-y-0 left-0 w-60 transition bg-white duration-300 transform overflow-y-auto lg:translate-x-0 lg:static lg:inset-0'}>
            <div className="flex items-center justify-center mt-8">
                <div className="flex items-center justify-center">
                    <Link to='/parent/overview'><img className="p-4" src={logo_small} alt="logo" /></Link>
                </div>
            </div>
            <nav className="mt-5 pl-4 navbar-nav">
                <div className="nav-list text-black rounded-l-lg hover:text-blue-600 hover:bg-gray-200">
                    <NavLink className="mt-10 py-3 px-6 rounded-l-lg flex items-center font-medium text-gray-700" to="/parent/overview">
                        <IoGridOutline size={25} />
                        <span className="mx-3">Overview</span>
                    </NavLink>
                </div>
                <div className="nav-list text-black rounded-l-lg hover:text-blue-600 hover:bg-gray-200">
                    <NavLink className="mt-10 py-3 px-6 rounded-l-lg flex items-center font-medium text-gray-700 " to="/parent/students">
                        <IoTimeOutline size={25} />
                        <span className="mx-3">Students</span>
                    </NavLink>
                </div>
                <div className="nav-list text-black rounded-l-lg hover:text-blue-600 hover:bg-gray-200">
                    <NavLink className="mt-10 py-3 px-6 rounded-l-lg flex items-center font-medium text-gray-700 " to="/parent/profile">
                        <IoPersonOutline size={25} />
                        <span className="mx-3">Profile</span>
                    </NavLink>
                </div>
                </nav>
            </div>
        </>
    )
}

export default DashboardParentSidebar