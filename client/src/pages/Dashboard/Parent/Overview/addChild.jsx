import React, { useState, useRef, useEffect, useCallback } from 'react'
import { FiX } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty, isStrong, isLength, isMatch } from '../../../../Utils/Validation/Validation'
import makeToast from '../../../../Utils/Notification/Toaster'
import axios from 'axios'
import { fetchAllGrades, dispatchGetAllGrades } from '../../../../redux/actions/GradesAction'

const initialState = {
    firstName: '',
    lastName: '',
    username: '',
    birthday: '',
    grade: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}


export const AddChild = ({ showModal, setShowModal }) => {
    const allGrades = useSelector(state => state.allGrades)

    const {grades} = allGrades

    const dispatch = useDispatch()
    useEffect(() => {
        fetchAllGrades().then(res => {
            dispatch(dispatchGetAllGrades(res))
        })
    }, [dispatch])

    const parentToken = useSelector(state => state.parentToken)

    const [student, setStudent] = useState(initialState)

    const { firstName, lastName, username, birthday, grade, password, cf_password, err, success } = student

    const handleChangeInput = e => {
        const { name, value } = e.target
        setStudent({...student, [name]:value, err: '', success: ''})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if(isEmpty(firstName) || isEmpty(lastName) || isEmpty(username) || isEmpty(birthday) || isEmpty(grade) || isEmpty(password) || isEmpty(cf_password))
                return setStudent({...student, err: 'Please fill in all fields.' , success: ''})

        if(isLength(password))
            return setStudent({...student, err: 'Password must be at least 6 characters.' , success: ''})
        
        if(!isStrong(password))
            return setStudent({...student, err: 'Password must contain one or more alphanumeric characters.' , success: ''})

        if(!isMatch(password, cf_password))
            return setStudent({...student, err: 'Password did not match.' , success: ''})
        
        try {
            const res = await axios.post('/parent/addchild', {
                firstName, lastName, username, birthday, grade, password
            }, {
                headers: {Authorization: parentToken}
            })

            setStudent({...student, err: '', success: res.data.msg})
            window.location.reload(false)
        } catch (err) {
            err.response.data.msg && 
            setStudent({...student, err: err.response.data.msg, success: ''})
        }
    }


    const modalRef = useRef()
    
    const closeModal = e => {
        if(modalRef.current === e.target) {
            setShowModal(false);
        }
    }

    const keyPress = useCallback(e => {
        if(e.key === 'Escape' && showModal) {
            setShowModal(false)
        }
    }, [setShowModal, showModal])

    useEffect(() => {
        document.addEventListener('keydown', keyPress);
        return () => document.removeEventListener('keydown', keyPress)
    }, [keyPress])

    return (
        <>
        {showModal ? (
            <div ref={modalRef} onClick={closeModal} className="w-full h-full fixed inset-0 z-10 flex items-center justify-center p-4 " style={{background: "rgba(0, 0, 0, 0.8)"}}>
                <div className="bg-white shadow-2xl sm:m-8 rounded-lg w-full md:w-1/4 border-t-8 border-green-500 p-2" showModal={showModal}>
                <div className="flex justify-between items-center text-xl">
                    <h6 className="text-xl font-bold">Create your Child's profile</h6>
                    <button onClick={() => setShowModal(prev => !prev)} ><FiX /></button>
                </div>
                <div>
                    <form onSubmit={handleSubmit} className="p-4">
                        <div className="px-4 mb-2">
                            {err && makeToast("error", err)}
                            {success && makeToast("success", success)}
                        </div>
                        <div className="mb-4">
                            <div className="flex gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-black font-medium text-sm mb-2">First Name</label>
                                    <input type="text" placeholder="Enter child's first name" id="firstName" value={firstName} name="firstName" onChange={handleChangeInput} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500" />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-black font-medium text-sm mb-2">Last Name</label>
                                    <input type="text" placeholder="Enter child's last name" id="lastName" value={lastName} name="lastName" onChange={handleChangeInput} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500" />
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-black font-medium text-sm mb-2">Username</label>
                            <input type="text" placeholder="Create child's username" id="username" value={username} name="username" onChange={handleChangeInput} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="grade" className="block text-black font-medium text-sm mb-2">Grade</label>
                            <div className="relative">
                                <select id="grade" value={grade} name="grade" onChange={handleChangeInput} className="block appearance-none w-full bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500">
                                    <option value="">Select the Grade</option>
                                    {
                                        grades.map(grade => (
                                            <option value={grade._id} key={grade._id}>{grade.name}</option>
                                        ))
                                    }
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="birthday" className="block text-black font-medium text-sm mb-2">Date of Birth</label>
                            <input type="date" placeholder="Date of Birth" id="birthday" value={birthday} name="birthday" onChange={handleChangeInput} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-black font-medium text-sm mb-2">Password</label>
                            <input type="password" placeholder="Password" id="password" value={password} name="password" onChange={handleChangeInput}  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500" />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="cf_password" className="block text-black font-medium text-sm mb-2">Confirm Password</label>
                            <input type="text" placeholder="Confirm Password" id="cf_password" value={cf_password} name="cf_password" onChange={handleChangeInput} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500" />
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="border-2 border-green-400 bg-green-400 py-2 px-8 rounded-full">Add Child</button>
                        </div>
                    </form>
                </div>
                </div>
            </div>
        ) : null}
        </>
    )
}