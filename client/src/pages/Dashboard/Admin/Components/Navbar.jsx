import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { IoSettingsOutline, IoNotificationsOutline } from 'react-icons/io5'
import './admindashboard.css'

const DashboardAdminNavbar = ({ sidebarOpen, openSidebar}) => {

    const adminAuth = useSelector(state => state.adminAuth)

    const {admin} = adminAuth

    const handleLogout = async () => {
        try {
            await axios.get('/admin/logout')
            localStorage.removeItem('Login')
            window.location.href = "/";
        } catch (err) {
            window.location.href = "/";
        }
    }

    return(
        <header className="container mx-auto max-w-8xl flex justify-between items-center py-4 px-6 md:px-0 bg-white">
            <div className="flex items-center">
                <button onClick={() => openSidebar()} className="text-gray-500 focus:outline-none lg:hidden">
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 6H20M4 12H20M4 18H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </button>
                <div className="relative mx-4 lg:mx-0">
                    <h1 className="lg:text-xl">Welcome <span className="capitalize">{admin.firstName}</span></h1>
                </div>
            </div>
            <div className="flex  items-center">
                <div className="mx-4  relative">
                    <Link to='/'><IoSettingsOutline size={25} /></Link>
                </div>
                <div className="dropdown inline-block relative ">
                    <ul className="dropdown-menu hidden absolute right-0 pt-2 w-80 bg-white rounded-lg shadow-xl overflow-hidden z-10">
                        <li className="">
                            <Link to="#" className="flex items-center px-4 py-3 text-gray-600 hover:text-white hover:bg-red-600 -mx-2">
                                <img className="h-8 w-8 rounded-full object-cover mx-1"
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=334&amp;q=80"
                                    alt="avatar" />
                                    <p className="text-sm mx-2">
                                        <span className="font-bold" href="#">Sara Salah</span> replied on the <span className="font-bold text-red-400" href="#">Upload Image</span> artical . 2m
                                    </p>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="relative">
                    <div className="dropdown inline-block relative">
                        <button className="block h-10 w-10 rounded-full overflow-hidden shadow focus:outline-none">
                            <img src={admin.avatar} alt="avatar"/>
                        </button>
                        <ul className="dropdown-menu hidden absolute right-0 pt-1 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
                            <li className=""><Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-600 hover:text-white" to="/admin/profile">Profile</Link></li>
                            <li className=""><Link onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-600 hover:text-white" to="/">Logout</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default DashboardAdminNavbar

