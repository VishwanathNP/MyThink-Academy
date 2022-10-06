import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchChild, dispatchGetChild } from '../../../../redux/actions/ParentAuthAction'
import children_pic from "../../../../assets/img/children.svg"
import { Link } from 'react-router-dom'

const Students = () => {

    const parentAuth = useSelector(state => state.parentAuth)
    const parentToken = useSelector(state => state.parentToken)

    const {isParent, child} = parentAuth
    
    const dispatch = useDispatch()
    useEffect(() => {
        if(isParent) {
            fetchChild(parentToken).then(res => {
                dispatch(dispatchGetChild(res))
            })
        }
    }, [parentToken, isParent, dispatch])

    return (
        <>
        <main className="overflow-auto pb-4 px-6">
            <div className="container mx-auto max-w-8xl">
            <div className="md:flex bg-gray-100 mb-10 p-6 rounded-lg shadow">
                <div className="md:w-1/2">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 leading-tight mb-6">Glad to have you as a part of the family.</h2>
                    <p className="text-gray-700 mb-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, ipsam vero. Ut mollitia, cumque amet suscipit quas error minima maiores aperiam.</p>
                </div>
                <div className="md:w-1/2">
                    <img className="w-64 h-48 object-cover mx-auto" src={children_pic} alt="children" />
                </div>
            </div>
            <div>
            {child === [] ? null : (

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8">
                {
                    child.map(std => (
                        <div key={std._id} className="bg-white p-10 rounded-lg shadow hover:shadow-lg">
                            <div className="flex flex-col items-center justify-center">
                                <img src={std.avatar} className="rounded-full shadow h-32 w-32 ring ring-gray-100 ring-offset-4 ring-offset-gray-100" alt="avatar" />
                                <h1 className="text-gray-800 font-semibold text-xl mt-5">{std.username}</h1>
                                <h1 className="text-gray-500 text-md mt-1">{std.grade.name}</h1>
                            </div>
                            <div>
                                <h1 className="text-gray-600 font-semibold text-xl mt-2">{std.firstName}</h1>
                                <p className="ext-gray-500 text-sm mt-2">See how {std.firstName} is progressing.</p>
                            </div>
                            <div className="mt-4">
                                <p className="text-gray-600">Course 0% completed</p>
                                <div className="bg-gray-400 w-64 h-3 rounded-lg mt-2 overflow-hidden">
                                    <div className="bg-pink-400 w-0 h-full rounded-lg shadow-md"></div>
                                </div>
                                <Link to={`/parent/students/${std._id}`}>
                                <button className="bg-purple-400 py-3 px-8 mt-6 rounded-md text-sm font-semibold hover:bg-opacity-75">Go to Report</button>
                                </Link>
                            </div>
                    </div>
                    ))
                }
            </div>
            )
            }
            </div>
            </div>
        </main>

        </>
    )
}

export default Students
