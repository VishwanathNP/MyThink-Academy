import React, { useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

// Components
import DashboardTeacherNavbar from '../Student/Components/Navbar'
import DashboardStudentSidebar from '../Student/Components/Sidebar'

// Views
import Overview from "../Student/Overview/Overview"
import Profile from "../Student/Profile/Profile"
import Schedules from "../Student/Schedules/Schedules"

function Student() {

    const [sidebarOpen, setSidebarOpen] = useState(false)

    const openSidebar = () => {
        setSidebarOpen(true)
    }

    const closeSidebar = () => {
        setSidebarOpen(false)
    }

    return (
        <>
        <div className="flex h-screen">
            <DashboardStudentSidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardTeacherNavbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
                <Switch>
                    <Route exact path="/student/overview" component={Overview} />
                    <Route exact path="/student/profile" component={Profile} />
                    <Route exact path="/student/schedules" component={Schedules} />
                    <Redirect from="/student/overview" to="/student/overview" />
                </Switch>
            </div>
        </div>
        </>
    )
}

export default Student
