import React, { useEffect,  useState } from 'react'
import { fetchAllGrades, dispatchGetAllGrades } from '../../../../../redux/actions/GradesAction'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllTeachers, dispatchGetAllTeachers } from '../../../../../redux/actions/AllTeachersAction'
import TeachersFilters from '../../Teachers/Details/TeachersFilters'
import LoadMoreTeachers from '../../Teachers/Details/TeachersLoadMore'
import { fetchAllStudents, dispatchGetAllStudents } from '../../../../../redux/actions/AllStudentsAction'
import StudentsFilters from '../../Students/Details/StudentsFilters'
import LoadMoreStudents from '../../Students/Details/StudentsLoadMore'
import axios from 'axios'
import { isEmpty } from '../../../../../Utils/Validation/Validation'
import makeToast from '../../../../../Utils/Notification/Toaster'
import { useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'


const initialState = {
    name: '',
    grade_id: '',
    teacher: '',
    students_list: [],
    err: '',
    success: ''
}

function TeamCreate() {
    const history = useHistory()
    const handleGoBack = () => {
        history.goBack()
    }
    const adminToken = useSelector(state => state.adminToken)
    const allGrades = useSelector(state => state.allGrades)

    const {grades} = allGrades

    const dispatch = useDispatch()
    useEffect(() => {
        fetchAllGrades().then(res => {
            dispatch(dispatchGetAllGrades(res))
        })
    }, [dispatch])

    const adminAuth = useSelector(state => state.adminAuth)
    const allTeachers = useSelector(state => state.allTeachers)

    const [page] = useState(1)
    const [search_email] = useState('')
    const [search_name] = useState('')
    const [sort] = useState('')

    const { isAdminLogged } = adminAuth

    const { teachers } = allTeachers


    useEffect(() => {
        if(isAdminLogged) {
            return fetchAllTeachers(adminToken, page, sort, search_email, search_name).then(res => {
                dispatch(dispatchGetAllTeachers(res))
            })
        }
    }, [adminToken, page, sort, search_email, search_name, isAdminLogged, dispatch])

    const allStudents = useSelector(state => state.allStudents)

    const [search_username] = useState('')
    const [grade] = useState('')


    const { students } = allStudents
    console.log(students)

    useEffect(() => {
        if(isAdminLogged) {
            return fetchAllStudents(adminToken, page, grade, sort, search_username, search_name).then(res => {
                dispatch(dispatchGetAllStudents(res))
            })
        }
    }, [adminToken, page, grade, sort, search_username, search_name, isAdminLogged, dispatch])

    const [avatar, setAvatar] = useState(false)

    const [team, setTeam] = useState(initialState)
    const [loading, setLoading] = useState(false)

    const { name, grade_id, teacher, students_list, err, success } = team


    const handleChange = e => {
        const { name, value } = e.target 
        setTeam({ ...team, [name]:value, err: '', success: ''})
    }



    const changeAvatar = async(e) => {
        e.preventDefault()
        try {
            const file = e.target.files[0]

            if(!file) return setTeam({ ...team, err: 'No files were uploaded.', success: ''})

            if(file.size > 1024 * 1024) 
                return setTeam({ ...team, err: 'Size too large.', success: ''})

            if(file.type !== 'image/jpeg' && file.type !== 'image/png')
                return setTeam({ ...team, err: 'File format is incorrect.', success: ''})

            let formData = new FormData()

            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload_avatar', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: adminToken}
            })

            setLoading(false)
            setAvatar(res.data.url)
            
        } catch (err) {
            setTeam({ ...team, err: err.response.data.msg, success:''})
        }
    }

    const handleCheck = e => {
        if(e.target.checked){
            students_list.push(e.target.value)
        } else {
            let index = students_list.indexOf(e.target.value)
            students_list.splice(index, 1)
        }
    }

    

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(isEmpty(name) || isEmpty(grade_id) || isEmpty(teacher) || isEmpty(students_list) || isEmpty(avatar))
            return setTeam({...team, err: 'Fill in all the details.' , success: ''})

        try {

            await axios.post('/api/teams', {
                name, avatar, grade_id, teacher, students_list
            }, {
                headers: {Authorization: adminToken}
            })
            setTeam({ ...team, err: '', success: "Create a team"})
            history.push("/admin/teams")

        } catch (err) {
            setTeam({ ...team, err: err.response.data.msg, success:''})

        }
    }


    return (
        <>
        <main className="overflow-auto pb-4 px-6">
        <button onClick={handleGoBack} className="flex mb-4"><FiArrowLeft className="self-center mr-2"/> Go back</button>

            <form onSubmit={handleSubmit} className="container mx-auto max-w-8xl">
            {err && makeToast("error", err)}
                        {success && makeToast("success", success)}
                        {loading && <h3>Loading...</h3>}

                <div className="md:flex bg-gray-100 mb-10 p-6 rounded-lg shadow">
                    <div className="md:w-1/2">
                        <h2 className="text-xl font-bold text-gray-800">Teams</h2>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mt-2 leading-tight mb-6">Create Teams.</h2>
                        <p className="text-gray-700 mb-6">Read, Update and Delete the Teams.</p>
                    </div>
                    <div className="md:w-1/2">
                    <div className="px-4 py-5  text-center w-48">
                    <div className="mb-4">
                        <img className="w-auto mx-auto rounded-full object-cover object-center" src={avatar ? avatar : null} alt="Avatar Upload" />
                    </div>
                    <div className="bg-gray-200 text-gray-500 text-xs mt-5 ml-8 font-bold px-4 py-2 rounded-lg float-left hover:bg-gray-300 hover:text-gray-600 relative overflow-hidden cursor-pointer">
                        <input onChange={changeAvatar} type="file" name="file" id="file_up" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" /> Change Photo
                    </div>
                    </div>
                    </div>
                    <div className="md:w-1/2 pr-0 md:pr-8 mb-8 md:mb-0">
                    <label htmlFor="name" className="block text-black font-medium text-sm mb-2">Team Name</label>
                    <input onChange={handleChange}  value={name} className="block appearance-none w-full bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500" 
                                    type="text" name="name" id="name" placeholder="Enter the Team Name" />
                    </div>
                    <div className="md:w-1/2 flex flex-col justify-between">
                    <div className="">
                            <label htmlFor="grade_id" className="block text-black font-medium text-sm mb-2">Grade</label>
                            <div className="relative">
                                <select id="grade_id" value={grade_id} onChange={handleChange} name="grade_id" className="block appearance-none w-full bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500">
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
                        <div className="flex justify-end ">
                        <button  type="submit" className="shadow inline-flex items-center bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:shadow-outline text-white font-semibold py-2 px-4 rounded-lg">
                            Create Team
                        </button>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                    <TeachersFilters />
                        <div className="flex flex-col gap-4 pb-8">
                            {
                                teachers.map(teacher => {
                                    return <div key={teacher._id} teacher={teacher} className="flex gap-4 bg-yellow-400 p-2 rounded-lg">
                                        <label htmlFor="teacher"></label>
                                        <input className="w-5 h-5" value={teacher._id} onChange={handleChange} id="teacher" type="radio" name="teacher"  />
                                        <div>
                                            <h1 className="text-sm text-black">Email: {teacher.email}</h1>
                                        </div>
                                        <div>
                                            <h1 className="text-sm text-black">Name: {teacher.firstName}</h1>
                                        </div>
                                        <div>
                                            <h1 className="text-sm text-black">Team: {teacher.teams.length === 0 ? "Not assigned" : teacher.teams.map(team => (<span className="p-1">{team.name}</span>))}</h1>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                        <LoadMoreTeachers />
                    </div>
                    <div>
                    <StudentsFilters />
                    <div className="flex flex-col gap-4 pb-8">
                        {
                            students.map(student => {
                                return <div key={student._id} className="flex gap-4 bg-green-400 p-2 rounded-lg">
                                <label htmlFor="students_list"></label>
                                <input className="w-5 h-5" value={student._id} onChange={handleCheck} id="students_list" type="checkbox" name="students_list" />
                                <div>
                                    <h1 className="text-sm text-black">Email: {student.username}</h1>
                                </div>
                                <div>
                                    <h1 className="text-sm text-black">Name: {student.firstName}</h1>
                                </div>
                                <div>
                                    <h1 className="text-sm text-black">Name: {student.grade.name}</h1>
                                </div>
                                <div>
                                    <h1 className="text-sm text-black">Team: {student.team === undefined || student.team === null ? "Not assigned" : student.team.name}</h1>
                                </div>
                            </div>
                            })
                        }
                    </div>
                    <LoadMoreStudents />
                    </div>
                </div>
            </form>
        </main>
        </>
    )
}

export default TeamCreate
