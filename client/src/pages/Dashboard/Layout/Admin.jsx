import React, { useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

// Components
import DashboardAdminNavbar from '../Admin/Components/Navbar'
import DashboardAdminSidebar from '../Admin/Components/Sidebar'

// Views
import Overview from "../Admin/Overview/Overview"
import Parents from "../Admin/Parents/Parents"
import Teachers from "../Admin/Teachers/Teachers"
import Students from "../Admin/Students/Students"
import Courses from "../Admin/Courses/Courses"
import Headings from "../Admin/Courses/Headings"
import Chapters from "../Admin/Courses/Chapters"
import Topics from "../Admin/Courses/Topics"
import Teams from "../Admin/Teams/Teams"
import TeamCreate from "../Admin/Teams/Details/TeamCreate.jsx"
import Settings from "../Admin/Settings/Settings"
import Schedules from "../Admin/Schedules/Schedules"

const Admin = () => {

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
            <DashboardAdminSidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardAdminNavbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
                <Switch>
                    <Route exact path="/admin/overview" component={Overview} />
                    <Route exact path="/admin/parent" component={Parents} />
                    <Route exact path="/admin/teacher" component={Teachers} />
                    <Route exact path="/admin/student" component={Students} />
                    <Route exact path="/admin/course" component={Courses} />
                    <Route exact path="/admin/course/heading" component={Headings} />
                    <Route exact path="/admin/course/chapter" component={Chapters} />
                    <Route exact path="/admin/course/chapter/:cid" component={Topics} />
                    <Route exact path="/admin/teams" component={Teams} />
                    <Route exact path="/admin/teams/create" component={TeamCreate} />
                    <Route exact path="/admin/settings" component={Settings} />
                    <Route exact path="/admin/schedules" component={Schedules} />

                    <Redirect from="/admin/overview" to="/admin/overview" />
                </Switch>
            </div>
        </div>
        </>
    )
}

export default Admin
