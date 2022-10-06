import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllChapters, dispatchGetAllChapters } from '../../../../../redux/actions/ChaptersAction'
import { fetchAllHeadings, dispatchGetAllHeadings } from '../../../../../redux/actions/HeadingsAction'
import { fetchAllGrades, dispatchGetAllGrades } from '../../../../../redux/actions/GradesAction'

function ChapterFilters() {

    const dispatch = useDispatch()

    const [grade, setGrade] = useState('')
    const [heading, setHeading] = useState('')

    const allGrades = useSelector(state => state.allGrades)

    const {grades} = allGrades

    useEffect(() => {
        fetchAllGrades().then(res => {
            dispatch(dispatchGetAllGrades(res))
        })
    }, [dispatch])

    const allHeadings = useSelector(state => state.allHeadings)

    const {headings} = allHeadings

    useEffect(() => {
        fetchAllHeadings().then(res => {
            dispatch(dispatchGetAllHeadings(res))
        })
    }, [dispatch])
    
    useEffect(() => {
        fetchAllChapters(grade, heading).then(res => {
            dispatch(dispatchGetAllChapters(res))
        })
    }, [grade, heading, dispatch])




    return (
        <div className="grid grid-cols-1 grid-cols-2 gap-4 w-full">
            <div className="mb-4">
                <label className="block text-black font-medium text-sm mb-2">Filter by Grade</label>
                <div className="relative">
                    <select value={grade} onChange={e=> setGrade(e.target.value)} className="block appearance-none w-full bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
                        <option value="">All</option>
                        {
                            grades.map(grade => (
                                <option value={"grade="+ grade._id} key={grade._id}>{grade.name}</option>
                            ))
                        }
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-black font-medium text-sm mb-2">Filter by Heading</label>
                <div className="relative">
                    <select value={heading} onChange={e=> setHeading(e.target.value)} className="block appearance-none w-full bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
                        <option value="">All</option>
                        {
                            headings.map(heading => (
                                <option value={"heading="+ heading._id} key={heading._id}>{heading.heading}</option>
                            ))
                        }
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChapterFilters
