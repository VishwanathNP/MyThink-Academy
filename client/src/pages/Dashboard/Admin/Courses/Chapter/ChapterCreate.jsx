import React, { useRef, useEffect, useCallback, useState } from 'react'
import { FiX } from 'react-icons/fi'
import makeToast from '../../../../../Utils/Notification/Toaster'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from '../../../../../Utils/Validation/Validation'
import axios from 'axios'
import { fetchAllGrades, dispatchGetAllGrades } from '../../../../../redux/actions/GradesAction'
import { fetchAllHeadings, dispatchGetAllHeadings } from '../../../../../redux/actions/HeadingsAction'

const initialState = {
    grade: '',
    heading: '',
    chapter: '',
    description: '',
    err: '',
    success: ''
}

export const AddChapter = ({ showModal, setShowModal }) => {
    const adminToken = useSelector(state => state.adminToken)
    const allGrades = useSelector(state => state.allGrades)
    const allHeadings = useSelector(state => state.allHeadings)

    const {grades} = allGrades

    const dispatch = useDispatch()
    useEffect(() => {
        fetchAllGrades().then(res => {
            dispatch(dispatchGetAllGrades(res))
        })
    }, [dispatch])

    const {headings} = allHeadings

    useEffect(() => {
        fetchAllHeadings().then(res => {
            dispatch(dispatchGetAllHeadings(res))
        })
    }, [dispatch])

    const [chap, seChap] = useState(initialState)

    const { grade, heading, chapter, description, err, success } = chap

    const handleChangeInput = e => {
        const { name, value } = e.target
        seChap({...chap, [name]:value, err: '', success: ''})
    }

    const [image, setImage] = useState([{name: "", url: ""}])

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...image];
        list[index][name] = value;
        setImage(list);
    }

    const handleRemoveClick = index => {
        const list = [...image];
        list.splice(index, 1);
        setImage(list);
    }
    
    const handleAddClick = () => {
        setImage([...image, {name: "", url: ""}]);
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if(isEmpty(chapter || description || grade || heading))
            return seChap({...chap, err: 'Please fill in all fields.' , success: ''})
        
        try {
            const res = await axios.post('/api/chapter', {
                grade, heading, chapter, description, image
            }, {
                headers: {Authorization: adminToken}
            })

            seChap({...chap, err: '', success: res.data.msg})
            window.location.reload(false)            
        } catch (err) {
            err.response.data.msg && 
            seChap({...chap, err: err.response.data.msg, success: ''})
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
            <div ref={modalRef} onClick={closeModal} className="overflow-auto w-full h-full fixed inset-0 z-10 flex items-center justify-center p-4 " style={{background: "rgba(0, 0, 0, 0.8)"}}>
                <div className="bg-white shadow-2xl m-4 sm:m-8 rounded-lg w-full md:w-1/2 border-t-8 border-red-500 p-4" showModal={showModal}>
                <div className="flex justify-between items-center text-xl">
                    <h6 className="text-xl font-bold">Create a Heading</h6>
                    <button onClick={() => setShowModal(prev => !prev)} ><FiX /></button>
                </div>
                <div>
                    <form onSubmit={handleSubmit} className="p-4 grid grid-cols-2 gap-4">
                    <div>
                    <div className="px-4 mb-2">
                        {err && makeToast("error", err)}
                        {success && makeToast("success", success)}
                    </div>
                    <div className="mb-4">
                            <label htmlFor="grade" className="block text-black font-medium text-sm mb-2">Grade</label>
                            <div className="relative">
                                <select id="grade" value={grade} name="grade" onChange={handleChangeInput} className="block appearance-none w-full bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500">
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
                            <label htmlFor="heading" className="block text-black font-medium text-sm mb-2">Heading</label>
                            <div className="relative">
                                <select id="heading" value={heading} name="heading" onChange={handleChangeInput} className="block appearance-none w-full bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500">
                                    <option value="">Select the Heading</option>
                                    {
                                        headings.map(heading => (
                                            <option value={heading._id} key={heading._id}>{heading.heading}</option>
                                        ))
                                    }
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                        </div>
                    <div className="mb-4">
                        <label htmlFor="chapter" className="block text-black font-medium text-sm mb-2">Name</label>
                        <input type="text" placeholder="Enter chapter name" id="chapter" value={chapter} name="chapter" onChange={handleChangeInput} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500" />
                    </div>
                    </div>
                    <div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-black font-medium text-sm mb-2">Description</label>
                        <textarea rows="8" type="text" placeholder="Enter chapter description" id="description" value={description} name="description" onChange={handleChangeInput} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500" />
                    </div>
                    <div>
                    {
                            image.map((x, i) => {
                                return (
                                    <div className="grid grid-cols-2 gap-4" key={i}>
                                        <div className="mb-4">
                                            <label htmlFor="name" className="block text-black font-medium text-sm mb-2">Image Name</label>
                                            <input type="text" placeholder="Enter chapter image" id="name" value={x.name} name="name" onChange={e => handleInputChange(e, i)} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="url" className="block text-black font-medium text-sm mb-2">Image Url</label>
                                            <input type="text" placeholder="Enter chapter url" id="name" value={x.url} name="url" onChange={e => handleInputChange(e, i)} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500" />
                                        </div>
                                        <div className="mb-4">
                                        {image.length !== 1 && <span onClick={() => handleRemoveClick(i)} className="border-2 border-red-400 bg-red-400 py-2 px-8 rounded-full">Remove</span>}
                                        {image.length - 1 === i && <span onClick={handleAddClick} className="border-2 border-green-400 bg-green-400 py-2 px-8 rounded-full">Add</span>}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="border-2 border-red-400 bg-red-400 py-2 px-8 rounded-full">Add Heading</button>
                    </div>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        ) : null}
        </>
    )
}