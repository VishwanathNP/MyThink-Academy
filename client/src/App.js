import { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { dispatchAdminLogin, fetchAdmin, dispatchGetAdmin } from './redux/actions/AdminAuthAction'
import { dispatchParentLogin, fetchParent, dispatchGetParent} from './redux/actions/ParentAuthAction'
import { dispatchTeacherLogin, fetchTeacher, dispatchGetTeacher } from './redux/actions/TeacherAuthAction'
import { dispatchStudentLogin, fetchStudent, dispatchGetStudent } from './redux/actions/StudentAuthAction'

// Pages

// Landing
const HomePage = lazy(() => import("./pages/landingPages/Home/Homepage"))
const CoursePage = lazy(() => import("./pages/landingPages/Home/CoursePage"))
const AboutPage = lazy(() => import("./pages/landingPages/Home/AboutPage"))
const ChoosePage = lazy(() => import("./pages/landingPages/Home/ChoosePage"))
const EmployeePage = lazy(() => import("./pages/landingPages/Home/EmployeePage"))

// Auth
const ParentRegister = lazy(() => import("./pages/landingPages/Auth/Parent/ParentRegister"))
const ParentLogin = lazy(() => import("./pages/landingPages/Auth/Parent/ParentLogin"))
const ParentActivation = lazy(() => import("./pages/landingPages/Auth/Parent/ParentActivation"))
const ParentForgot = lazy(() => import("./pages/landingPages/Auth/Parent/ParentForgot"))
const ParentReset = lazy(() => import("./pages/landingPages/Auth/Parent/ParentReset"))

const StudentLogin = lazy(() => import("./pages/landingPages/Auth/Student/StudentLogin"))

const TeacherLogin = lazy(() => import("./pages/landingPages/Auth/Teacher/TeacherLogin"))
const TeacherForgot = lazy(() => import("./pages/landingPages/Auth/Teacher/TeacherForgot"))
const TeacherReset = lazy(() => import("./pages/landingPages/Auth/Teacher/TeacherReset"))

const AdminLogin = lazy(() => import("./pages/landingPages/Auth/Admin/AdminLogin"))
const AdminForgot = lazy(() => import("./pages/landingPages/Auth/Admin/AdminForgot"))
const AdminReset = lazy(() => import("./pages/landingPages/Auth/Admin/AdminReset"))

// Dashboard
const Admin = lazy(() => import("./pages/Dashboard/Layout/Admin"))
const Parent = lazy(() => import("./pages/Dashboard/Layout/Parent"))
const Teacher = lazy(() => import("./pages/Dashboard/Layout/Teacher"))
const Student = lazy(() => import("./pages/Dashboard/Layout/Student"))

// Chatroom
const Chatroom = lazy(() => import("./pages/Chatroom/Chatroom"))

// Error
const NotFoundPage = lazy(() => import("./pages/ErrorPages/404"))



function App() {
  const dispatch = useDispatch()
  const adminToken = useSelector(state => state.adminToken)
  const parentToken = useSelector(state => state.parentToken)
  const teacherToken = useSelector(state => state.teacherToken)
  const studentToken = useSelector(state => state.studentToken)

  const adminAuth = useSelector(state => state.adminAuth)
  const parentAuth = useSelector(state => state.parentAuth)
  const teacherAuth = useSelector(state => state.teacherAuth)
  const studentAuth = useSelector(state => state.studentAuth)

  const { isAdminLogged } = adminAuth
  const { isParentLogged } = parentAuth
  const { isTeacherLogged } = teacherAuth
  const { isStudentLogged } = studentAuth

  // Admin
  useEffect(() => {
    const Login = localStorage.getItem('Login')
    if(Login){
      const getToken = async () => {
        const res = await axios.post('/admin/refresh_token', null)
        dispatch({type: 'GET_ADMIN_TOKEN', payload: res.data.access_token})
      }
      getToken()
    }
  },[adminAuth.isAdminLogged, dispatch])

  useEffect(() => {
    if(adminToken){
      const getAdmin = () => {
        dispatch(dispatchAdminLogin())

        return fetchAdmin(adminToken).then(res => {
          dispatch(dispatchGetAdmin(res))
        })
      }
      getAdmin()
    }
  },[adminToken, dispatch])

  // Parent
  useEffect(() => {
    const Login = localStorage.getItem('Login')
    if(Login){
      const getToken = async () => {
        const res = await axios.post('/parent/refresh_token', null)
        dispatch({type: 'GET_PARENT_TOKEN', payload: res.data.access_token})
      }
      getToken()
    }
  },[parentAuth.isParentLogged, dispatch])

  useEffect(() => {
    if(parentToken){
      const getParent = () => {
        dispatch(dispatchParentLogin())

        return fetchParent(parentToken).then(res => {
          dispatch(dispatchGetParent(res))
        })
      }
      getParent()
    }
  },[parentToken, dispatch])

  // Teacher
  useEffect(() => {
    const Login = localStorage.getItem('Login')
    if(Login){
      const getToken = async () => {
        const res = await axios.post('/teacher/refresh_token', null)
        dispatch({type: 'GET_TEACHER_TOKEN', payload: res.data.access_token})
      }
      getToken()
    }
  },[teacherAuth.isTeacherLogged, dispatch])

  useEffect(() => {
    if(teacherToken){
      const getTeacher = () => {
        dispatch(dispatchTeacherLogin())

        return fetchTeacher(teacherToken).then(res => {
          dispatch(dispatchGetTeacher(res))
        })
      }
      getTeacher()
    }
  },[teacherToken, dispatch])

  // Student
  useEffect(() => {
    const Login = localStorage.getItem('Login')
    if(Login){
      const getToken = async () => {
        const res = await axios.post('/student/refresh_token', null)
        dispatch({type: 'GET_STUDENT_TOKEN', payload: res.data.access_token})
      }
      getToken()
    }
  },[studentAuth.isStudentLogged, dispatch])

  useEffect(() => {
    if(studentToken){
      const getStudent = () => {
        dispatch(dispatchStudentLogin())

        return fetchStudent(studentToken).then(res => {
          dispatch(dispatchGetStudent(res))
        })
      }
      getStudent()
    }
  },[studentToken, dispatch])

  //Socket

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          {/* Landing Pages */}
          <Route exact path="/" component={HomePage} />
          <Route exact path="/course" component={CoursePage} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/user" component={isAdminLogged || isParentLogged || isTeacherLogged || isStudentLogged ? HomePage : ChoosePage} />
          <Route exact path="/employee" component={isAdminLogged || isParentLogged || isTeacherLogged || isStudentLogged ? HomePage : EmployeePage} />

          {/* Auth Pages */}
          {/* Parent Auth */}
          <Route exact path="/parent/register" component={isParentLogged  || isAdminLogged || isTeacherLogged || isStudentLogged ? HomePage : ParentRegister} />
          <Route exact path="/parent/activate/:activation_token" component={ParentActivation} />
          <Route exact path="/parent/login" component={ isParentLogged  || isAdminLogged || isTeacherLogged || isStudentLogged ? HomePage: ParentLogin } />
          <Route exact path="/parent/forgot" component={isParentLogged  || isAdminLogged || isTeacherLogged || isStudentLogged ? HomePage : ParentForgot} />
          <Route exact path="/parent/reset/:token" component={isParentLogged  || isAdminLogged || isTeacherLogged || isStudentLogged ? HomePage : ParentReset} />

          {/* Student Auth */}
          <Route exact path="/student/login" component={ isStudentLogged || isAdminLogged || isParentLogged || isTeacherLogged ? HomePage : StudentLogin} />

          {/* Teacher Auth */}
          <Route exact path="/teacher/login" component={ isTeacherLogged || isParentLogged || isAdminLogged || isStudentLogged ? HomePage : TeacherLogin} />
          <Route exact path="/teacher/forgot" component={isTeacherLogged || isParentLogged || isAdminLogged || isStudentLogged ? HomePage : TeacherForgot} />
          <Route exact path="/teacher/reset/:token" component={isTeacherLogged || isParentLogged || isAdminLogged || isStudentLogged ? HomePage : TeacherReset} />

          {/* Admin Auth */}
          <Route exact path="/admin/login" component={ isAdminLogged || isParentLogged || isTeacherLogged || isStudentLogged ? HomePage : AdminLogin} />
          <Route exact path="/admin/forgot" component={isAdminLogged || isParentLogged || isTeacherLogged ||isStudentLogged ? HomePage : AdminForgot} />
          <Route exact path="/admin/reset/:token" component={isAdminLogged || isParentLogged || isTeacherLogged || isStudentLogged? HomePage : AdminReset} />

          {/* Parent Dashboard */}
          <Route exact path="/parent/overview" component={isParentLogged ? Parent : isAdminLogged ? HomePage : isTeacherLogged ? HomePage : isStudentLogged ? HomePage : ParentLogin} />
          <Route exact path="/parent/students" component={isParentLogged ? Parent : isAdminLogged ? HomePage : isTeacherLogged ? HomePage : isStudentLogged ? HomePage : ParentLogin} />
          <Route exact path="/parent/students/:sid" component={isParentLogged ? Parent : isAdminLogged ? HomePage : isTeacherLogged ? HomePage : isStudentLogged ? HomePage : ParentLogin} />
          <Route exact path="/parent/profile" component={isParentLogged ? Parent : isAdminLogged ? HomePage : isTeacherLogged ? HomePage : isStudentLogged ? HomePage : ParentLogin} />

          {/* Teacher Dashboard */}
          <Route exact path="/teacher/overview" component={isTeacherLogged ? Teacher : isParentLogged ? HomePage : isAdminLogged ? HomePage : isStudentLogged ? HomePage : TeacherLogin} />
          <Route exact path="/teacher/profile" component={isTeacherLogged ? Teacher : isParentLogged ? HomePage : isAdminLogged ? HomePage : isStudentLogged ? HomePage : TeacherLogin} />
          <Route exact path="/teacher/schedules" component={isTeacherLogged ? Teacher : isParentLogged ? HomePage : isAdminLogged ? HomePage : isStudentLogged ? HomePage : TeacherLogin} />

          {/* Student Dashboard */}
          <Route exact path="/student/overview" component={isStudentLogged ? Student : isParentLogged ? HomePage : isAdminLogged ? HomePage : isTeacherLogged ? HomePage : StudentLogin} />
          <Route exact path="/student/profile" component={isStudentLogged ? Student : isParentLogged ? HomePage : isAdminLogged ? HomePage : isTeacherLogged ? HomePage : StudentLogin} />
          <Route exact path="/student/schedules" component={isStudentLogged ? Student : isParentLogged ? HomePage : isAdminLogged ? HomePage : isTeacherLogged ? HomePage : StudentLogin} />

          {/* Admin Dashboard */}
          <Route exact path="/admin/overview" component={isAdminLogged ? Admin : isParentLogged ? HomePage : isTeacherLogged ? HomePage : isStudentLogged ? HomePage : AdminLogin} />
          <Route exact path="/admin/parent" component={isAdminLogged ? Admin : isParentLogged ? HomePage : isTeacherLogged ? HomePage : isStudentLogged ? HomePage : AdminLogin} />
          <Route exact path="/admin/teacher" component={isAdminLogged ? Admin : isParentLogged ? HomePage : isTeacherLogged ? HomePage : isStudentLogged ? HomePage : AdminLogin} />
          <Route exact path="/admin/student" component={isAdminLogged ? Admin : isParentLogged ? HomePage : isTeacherLogged ? HomePage : isStudentLogged ? HomePage : AdminLogin} />
          <Route exact path="/admin/course" component={isAdminLogged ? Admin : isParentLogged ? HomePage : isTeacherLogged ? HomePage : isStudentLogged ? HomePage : AdminLogin} />
          <Route exact path="/admin/course/heading" component={isAdminLogged ? Admin : isParentLogged ? HomePage : isTeacherLogged ? HomePage : isStudentLogged ? HomePage : AdminLogin} />
          <Route exact path="/admin/course/chapter" component={isAdminLogged ? Admin : isParentLogged ? HomePage : isTeacherLogged ? HomePage : isStudentLogged ? HomePage : AdminLogin} />
          <Route exact path="/admin/course/chapter/:cid" component={isAdminLogged ? Admin : isParentLogged ? HomePage : isTeacherLogged ? HomePage : isStudentLogged ? HomePage : AdminLogin} />
          <Route exact path="/admin/teams" component={isAdminLogged ? Admin : isParentLogged ? HomePage : isTeacherLogged ? HomePage : isStudentLogged ? HomePage : AdminLogin} />
          <Route exact path="/admin/teams/create" component={isAdminLogged ? Admin : isParentLogged ? HomePage : isTeacherLogged ? HomePage : isStudentLogged ? HomePage : AdminLogin} />
          <Route exact path="/admin/settings" component={isAdminLogged ? Admin : isParentLogged ? HomePage : isTeacherLogged ? HomePage : isStudentLogged ? HomePage : AdminLogin} />
          <Route exact path="/admin/schedules" component={isAdminLogged ? Admin : isParentLogged ? HomePage : isTeacherLogged ? HomePage : isStudentLogged ? HomePage : AdminLogin} />

          {/* Chatroom */}
          <Route exact path="/chatroom/:roomID" component={isParentLogged  || isAdminLogged || isTeacherLogged || isStudentLogged ? Chatroom : HomePage} />

          {/* Error Pages */}
          <Route exact path="/404" component={NotFoundPage} />
          <Redirect to="/404" />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default App
