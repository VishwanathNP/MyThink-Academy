import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'

import logo_small from "../../../assets/img/Logo_small.png"
import './Navbar.css'

const Navbar = () => {
    const adminAuth = useSelector(state => state.adminAuth)
    const parentAuth = useSelector(state => state.parentAuth)
    const teacherAuth = useSelector(state => state.teacherAuth)
    const studentAuth = useSelector(state => state.studentAuth)

    const {admin, isAdminLogged} = adminAuth
    const {parent, isParentLogged} = parentAuth
    const {teacher, isTeacherLogged} = teacherAuth
    const {student, isStudentLogged} = studentAuth

    const [navbar, setNavbar] = useState(false)

    const changeBackground = () => {
        if(window.scrollY > 0) {
            setNavbar(true)
        } else {
            setNavbar(false)
        }
    }

    window.addEventListener('scroll', changeBackground)

    const handleAdminLogout = async () => {
        try {
            await axios.get('/admin/logout')
            localStorage.removeItem('Login')
            window.location.href = "/";

        } catch (err) {
            window.location.href = "/";
        }
    }

    const handleParentLogout = async () => {
        try {
            await axios.get('/parent/logout')
            localStorage.removeItem('Login')
            window.location.href = "/";

        } catch (err) {
            window.location.href = "/";
        }
    }

    const handleTeacherLogout = async () => {
        try {
            await axios.get('/teacher/logout')
            localStorage.removeItem('Login')
            window.location.href = "/";

        } catch (err) {
            window.location.href = "/";
        }
    }

    const handleStudentLogout = async () => {
        try {
            await axios.get('/student/logout')
            localStorage.removeItem('Login')
            window.location.href = "/";

        } catch (err) {
            window.location.href = "/";
        }
    }

    const adminLink = () => {
        return <ul className="menu border-b md:border-none flex justify-end list-reset m-0 w-full md:w-auto">
        <li>
            <Link to="/course" className="text-xl font-medium block md:inline-block px-2 py-3 text-grey-darkest hover:text-grey-darker"><span className="navitems nav-y p-1.5 px-2.5 rounded-full">Course</span></Link>
        </li>
        <li>
            <Link to="/admin/overview" className="text-xl font-medium block md:inline-block px-2 py-3 text-grey-darkest hover:text-grey-darker"><span className="navitems nav-r p-1.5 px-2.5 rounded-full">{admin.firstName}</span></Link>
        </li>
        <li>
            <Link to="/" onClick={handleAdminLogout} className="text-xl font-medium block md:inline-block px-2 py-3 text-grey-darkest hover:text-grey-darker"><span className="border-2 border-green-400 bg-green-400 p-1.5 px-3 rounded-full">Logout</span></Link>
        </li>
    </ul>
    }

    const parentLink = () => {
        return <ul className="menu border-b md:border-none flex justify-end list-reset m-0 w-full md:w-auto">
        <li>
            <Link to="/course" className="text-xl font-medium block md:inline-block px-2 py-3 text-grey-darkest hover:text-grey-darker"><span className="navitems nav-y p-1.5 px-2.5 rounded-full">Course</span></Link>
        </li>
        <li>
            <Link to="/parent/overview" className="text-xl font-medium block md:inline-block px-2 py-3 text-grey-darkest hover:text-grey-darker"><span className="navitems nav-r p-1.5 px-2.5 rounded-full">{parent.firstName}</span></Link>
        </li>
        <li>
            <Link to="/" onClick={handleParentLogout} className="text-xl font-medium block md:inline-block px-2 py-3 text-grey-darkest hover:text-grey-darker"><span className="border-2 border-green-400 bg-green-400 p-1.5 px-3 rounded-full">Logout</span></Link>
        </li>
    </ul>
    }

    const teacherLink = () => {
        return <ul className="menu border-b md:border-none flex justify-end list-reset m-0 w-full md:w-auto">
        <li>
            <Link to="/course" className="text-xl font-medium block md:inline-block px-2 py-3 text-grey-darkest hover:text-grey-darker"><span className="navitems nav-y p-1.5 px-2.5 rounded-full">Course</span></Link>
        </li>
        <li>
            <Link to="/teacher/overview" className="text-xl font-medium block md:inline-block px-2 py-3 text-grey-darkest hover:text-grey-darker"><span className="navitems nav-r p-1.5 px-2.5 rounded-full">{teacher.firstName}</span></Link>
        </li>
        <li>
            <Link to="/" onClick={handleTeacherLogout} className="text-xl font-medium block md:inline-block px-2 py-3 text-grey-darkest hover:text-grey-darker"><span className="border-2 border-green-400 bg-green-400 p-1.5 px-3 rounded-full">Logout</span></Link>
        </li>
    </ul>
    }

    const studentLink = () => {
        return <ul className="menu border-b md:border-none flex justify-end list-reset m-0 w-full md:w-auto">
        <li>
            <Link to="/course" className="text-xl font-medium block md:inline-block px-2 py-3 text-grey-darkest hover:text-grey-darker"><span className="navitems nav-y p-1.5 px-2.5 rounded-full">Course</span></Link>
        </li>
        <li>
            <Link to="/student/overview" className="text-xl font-medium block md:inline-block px-2 py-3 text-grey-darkest hover:text-grey-darker"><span className="navitems nav-r p-1.5 px-2.5 rounded-full">{student.firstName}</span></Link>
        </li>
        <li>
            <Link to="/" onClick={handleStudentLogout} className="text-xl font-medium block md:inline-block px-2 py-3 text-grey-darkest hover:text-grey-darker"><span className="border-2 border-green-400 bg-green-400 p-1.5 px-3 rounded-full">Logout</span></Link>
        </li>
    </ul>
    }

    return (
    <div className={navbar ? 'fixed top-0 inset-x-0 z-50 shadow-xl bg-white' : 'fixed top-0 inset-x-0 z-50 bg-transparent'}>
        <nav className="container mx-auto max-w-7xl nav flex flex-wrap items-center justify-between px-2 md:px-2">
            <div className="flex flex-no-shrink items-center py-3 text-grey-darkest">
                <span><Link to='/'><img className="w-1/2 xl:w-3/5" src={logo_small} alt="logo" /></Link></span>
            </div>
            <input className="menu-btn hidden" type="checkbox" id="menu-btn" />
            <label className="menu-icon block cursor-pointer md:hidden px-2 py-4 relative select-none" htmlFor="menu-btn">
                <span className="navicon bg-grey-darkest flex items-center relative"></span>
            </label>
                {
                    isAdminLogged ? adminLink()
                    : isParentLogged ? parentLink()
                    : isTeacherLogged ? teacherLink()
                    : isStudentLogged ? studentLink()
                    : <ul className='bg-white menu text-black border-b md:border-none flex justify-end list-reset m-0 w-full md:w-auto tracking-wider'>
                        <li>
                            <Link to="/course" className="text-xl font-medium block md:inline-block px-2 py-3 text-grey-darkest hover:text-grey-darker"><span className="navitems nav-y p-1.5 px-2.5 rounded-full">Course</span></Link>
                        </li>
                        <li>
                            <Link to="/user" className="text-xl font-medium block md:inline-block px-2 py-3 text-grey-darkest hover:text-grey-darker"><span className="navitems nav-r p-1.5 px-2.5 rounded-full">Login</span></Link>
                        </li>
                        <li>
                            <Link to="/parent/register"><button className="button-1 slide-1">Join Now</button></Link>
                        </li>
                    </ul>
                }
        </nav>
    </div>
    )
}

export default Navbar

