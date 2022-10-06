import React, {useState, useEffect} from 'react'
import { FiPlus } from 'react-icons/fi'
import { AddHeading } from './Heading/HeadingCreate'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllHeadings, dispatchGetAllHeadings } from '../../../../redux/actions/HeadingsAction'
import { Link } from 'react-router-dom'

import HeadingDetails from './Heading/HeadingDetails'

import course_pic from '../../../../assets/img/course.svg'

function Headings() {
    const [showModal, setShowModal] = useState(false)

    const openModal = () => {
        setShowModal(prev => !prev)
    }

    const allHeadings = useSelector(state => state.allHeadings)

    const {headings} = allHeadings

    const dispatch = useDispatch()
    useEffect(() => {
        fetchAllHeadings().then(res => {
            dispatch(dispatchGetAllHeadings(res))
        })
    }, [dispatch])

    return (
        <>
        <AddHeading showModal={showModal} setShowModal={setShowModal} />
        <main className="overflow-auto pb-4 px-6">
            <div className="container mx-auto max-w-8xl">
            <div className="md:flex bg-gray-100 mb-10 p-6 rounded-lg shadow">
                <div className="md:w-1/2">
                    <h2 className="text-xl font-bold text-gray-800">Courses</h2>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 mt-2 leading-tight mb-6">Find the list of available courses.</h2>
                    <p className="text-gray-700 mb-2">Create, Read, Update and Delete the courses.</p>
                    <p className="text-gray-700 mb-6">All the courses are create according to the class groups.</p>
                    <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
                    <Link to="/admin/course">
                        <button className="shadow inline-flex items-center bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:shadow-outline text-white font-semibold py-2 px-4 rounded-lg">
                        Grade
                        </button>
                    </Link>
                    <Link to="/admin/course/heading">
                        <button className="shadow inline-flex items-center bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:shadow-outline text-white font-semibold py-2 px-4 rounded-lg">
                            Headings
                        </button>
                    </Link>
                    <Link to="/admin/course/chapter">
                    <button className="shadow inline-flex items-center bg-red-500 hover:bg-red-600 focus:outline-none focus:shadow-outline text-white font-semibold py-2 px-4 rounded-lg">
                        Chapters
                    </button>
                    </Link>
                    </div>
                </div>
                <div className="md:w-1/2">
                    <img className="w-64 h-48 object-cover mx-auto" src={course_pic} alt="course" />
                </div>
            </div>
            <div className="pb-8">
                <button  onClick={openModal} className="shadow inline-flex items-center bg-yellow-900 hover:bg-yellow-900 focus:outline-none focus:shadow-outline text-white font-semibold py-2 px-4 rounded-lg">
                    <FiPlus size={25} className="mr-4" />Create Headings			  
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8">
            {
                headings.map(head => {
                    return <HeadingDetails key={head._id} head={head} />
                })
            }
            </div>
        </div>
        </main>
        </>
    )
}

export default Headings
