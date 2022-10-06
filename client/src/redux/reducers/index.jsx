import { combineReducers } from 'redux'
import adminAuth from './AdminAuthReducer'
import parentAuth from './ParentAuthReducer'
import teacherAuth from './TeacherAuthReducer'
import studentAuth from './StudentAuthReducer'

import adminToken from './AdminTokenReducer'
import parentToken from './ParentTokenReducer'
import teacherToken from './TeacherTokenReducer'
import studentToken from './StudentTokenReducer'

import allParents from './AllParentsReducer'
import allTeachers from './AllTeachersReducer'
import allStudents from './AllStudentsReducer'

import allGrades from './GradesReducers'
import allHeadings from './HeadingsReducer'
import allChapters from './ChaptersReducer'
import allTopics from './TopicsReducer'

import allTeams from './TeamsReducer'

import allSchedules from './AllChatroomReducer'

export default combineReducers({
    adminAuth,
    parentAuth,
    teacherAuth,
    studentAuth,
    adminToken,
    parentToken,
    teacherToken,
    studentToken,
    allParents,
    allTeachers,
    allStudents,
    allGrades,
    allHeadings,
    allChapters,
    allTopics,
    allTeams,
    allSchedules
})