import React, {useState, useEffect} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import axios from 'axios'
import { useSelector } from 'react-redux'

function StudentDetails() {
    const history = useHistory()
    const handleGoBack = () => {
        history.goBack()
    }

    const parentToken = useSelector(state => state.parentToken)

    const params = useParams()
    const [student, setStudent] = useState({})
    const [grade, setGrade] = useState({})
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        if(params) {
            axios.get(`/parent/child/${params.sid}`, {headers: {Authorization: parentToken}}).then(res => {
                setStudent(res.data)
                setGrade(res.data.grade)
                setLoading(false)
            })
        }
    }, [params, parentToken])

    if (loading) return "Loading..."

    return (
        <>
        <main className="overflow-auto pb-4 px-6">
            <div className="container mx-auto max-w-8xl">
                    <div className="md:w-1/2">
                        <button onClick={handleGoBack} className="flex mb-4"><FiArrowLeft className="self-center mr-2"/> Go back</button>
                    </div>
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap">
                        <div className="col-span-1 rounded-xl ">
                            <div className="flex item-center justify-center p-4">
                                <img className="rounded-full shadow-md ring-2 ring-offset-8 w-64 h-auto object-cover mx-auto" src={student.avatar} alt="student" />
                            </div>
                        </div>
                        <div className="col-span-2 flex flex-col gap-8 p-4">
                            <div>
                                <h1 className="text-2xl font-semibold tracking-wide">Username: <span className="text-gray-500">{student.username}</span></h1>
                            </div>
                            <div className="flex gap-32">
                            <h1 className="text-2xl font-semibold tracking-wide">First Name: <span className="text-gray-500">{student.firstName}</span></h1>
                            <h1 className="text-2xl font-semibold tracking-wide">Last Name: <span className="text-gray-500">{student.lastName}</span></h1>
                            </div>
                            <div>
                                <h1 className="text-2xl font-semibold tracking-wide">Birthday: <span className="text-gray-500">{student.birthday}</span></h1>
                            </div>
                            <div>
                                <h1 className="text-2xl font-semibold tracking-wide">Grade: <span className="text-gray-500">{grade.name}</span></h1>
                            </div>
                            <div>
                                <h1 className="text-2xl font-semibold tracking-wide">Team Name: <span className="text-gray-500">{grade.name}</span></h1>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 h-2 bg-blue-800 rounded-full">

                    </div>
                    <div className="mt-8">
                        <h1 className="text-2xl font-semibold tracking-wide text-center">Course Details will come here</h1>
                    </div>
                </div>
            </div>
        </main>
        </>
    )
}

export default StudentDetails
