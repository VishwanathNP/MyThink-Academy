// import React, { useState } from 'react'
// import { Switch, Route, Redirect } from 'react-router-dom'

// // Components
// import DashboardTeacherNavbar from '../Teacher/Components/Navbar'
// import DashboardTeacherSidebar from '../Teacher/Components/Sidebar'

// // Views
// import Overview from "../Teacher/Overview/Overview"
// import Profile from "../Teacher/Profile/Profile"
// import Schedules from "../Teacher/Schedules/Schedules"

// const Teacher = () => {

//     const [sidebarOpen, setSidebarOpen] = useState(false)

//     const openSidebar = () => {
//         setSidebarOpen(true)
//     }

//     const closeSidebar = () => {
//         setSidebarOpen(false)
//     }

//     return (
//         <>
//         <div className="flex h-screen">
//             <DashboardTeacherSidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
//             <div className="flex-1 flex flex-col overflow-hidden">
//                 <DashboardTeacherNavbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
//                 <Switch>
//                     <Route exact path="/teacher/overview" component={Overview} />
//                     <Route exact path="/teacher/profile" component={Profile} />
//                     <Route exact path="/teacher/schedules" component={Schedules} />

//                     <Redirect from="/teacher/overview" to="/parent/overview" />
//                 </Switch>
//             </div>
//         </div>
//         </>
//     )
// }

// export default Teacher
