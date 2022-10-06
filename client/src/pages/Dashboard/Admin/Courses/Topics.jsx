import React, {useState, useEffect} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { FiPlus, FiArrowLeft } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllChapters, dispatchGetAllChapters } from '../../../../redux/actions/ChaptersAction'
import TopicDetails from './Topic/TopicDetails'
import { AddTopic } from './Topic/TopicCreate' 
import chapter_pic from '../../../../assets/img/chapters.svg'

function Chapters() {
    const history = useHistory()
    const handleGoBack = () => {
        history.goBack()
    }

    const [showModal, setShowModal] = useState(false)
    const openModal = () => {
        setShowModal(prev => !prev)
    }

    const params = useParams()
    const allChapters = useSelector(state => state.allChapters)
    const [details, setDetails] = useState([])
    
    const {chapters} = allChapters

    const dispatch = useDispatch()
    useEffect(() => {
        fetchAllChapters().then(res => {
            dispatch(dispatchGetAllChapters(res))
        })
    }, [dispatch])

    useEffect(() => {
        if(params)
            chapters.forEach(chapter => {
                if(chapter._id === params.cid) setDetails(chapter)
            })
    }, [params, chapters])

    if(details.length === 0) return null;


    return (
        <>
        <AddTopic details={details} showModal={showModal} setShowModal={setShowModal} />
        <main className="overflow-auto pb-4 px-6">
            <div className="container mx-auto max-w-8xl">
                <div className="md:flex bg-gray-100 mb-10 p-6 rounded-lg shadow">
                    <div className="md:w-1/2">
                        <button onClick={handleGoBack} className="flex mb-4"><FiArrowLeft className="self-center mr-2"/> Go back</button>
                        <h2 className="text-xl font-bold text-gray-800">Courses</h2>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mt-2 leading-tight mb-6">Find the list of available topics for {details.chapter}.</h2>
                        <p className="text-gray-700 mb-2">Create, Read, Update and Delete the chapters.</p>
                        <p className="text-gray-700 mb-6">All the courses are create according to the class groups.</p>
                        <button onClick={openModal} className="shadow inline-flex items-center bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:shadow-outline text-white font-semibold py-2 px-4 rounded-lg">
                            <FiPlus size={25} className="mr-4" />Create Topic			  
                        </button>
                    </div>
                    <div className="md:w-1/2">
                        <img className="w-64 h-auto object-cover mx-auto" src={chapter_pic} alt="course" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8">
                    {details.topic.map(top => {
                        return <TopicDetails key={top._id} top={top} />
                    })}
                </div>
            </div>
        </main>
        </>
    )
}

export default Chapters
