import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'
import { fetchAllTeams, dispatchGetAllTeams } from '../../../../redux/actions/TeamsAction'
import { useSelector, useDispatch } from 'react-redux'
import TeamDetails from './Details/TeamDetails'
import teams_pic from '../../../../assets/img/teams.svg'

function Teams() {

    const adminToken = useSelector(state => state.adminToken)
    const adminAuth = useSelector(state => state.adminAuth)
    const allTeams = useSelector(state => state.allTeams)

    const { isAdminLogged } = adminAuth

    const { teams } = allTeams

    const dispatch = useDispatch()
    useEffect(() => {
        if(isAdminLogged) {
            return fetchAllTeams(adminToken).then(res => {
                dispatch(dispatchGetAllTeams(res))
            })
        }
    }, [adminToken, isAdminLogged, dispatch])


    return (
        <>
        <main className="overflow-auto pb-4 px-6">
            <div className="container mx-auto max-w-8xl">
                <div className="md:flex bg-gray-100 mb-10 p-6 rounded-lg shadow">
                    <div className="md:w-1/2">
                        <h2 className="text-xl font-bold text-gray-800">Teams</h2>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mt-2 leading-tight mb-6">Find the list of Teams.</h2>
                        <p className="text-gray-700 mb-6">Read, Update and Delete the Teams.</p>
                        <p className="text-xl md:text-2xl font-bold text-gray-800 mt-2 leading-tight mb-6">Total no. of Teams: <span className="ml-4"></span></p>
                        <Link to='/admin/teams/create' className="shadow inline-flex items-center bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:shadow-outline text-white font-semibold py-2 px-4 rounded-lg">
                        <FiPlus size={25} className="mr-4" />Create Team			  
                        </Link>
                    </div>
                    <div className="md:w-1/2">
                        <img className="w-auto h-48 object-cover mx-auto" src={teams_pic} alt="course" />
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-4 pb-4">
                    {
                        teams.map(team => (
                            <TeamDetails key={team._id} team={team} />
                        ))
                    }
                </div>
            </div>
        </main>
        </>
    )
}

export default Teams
