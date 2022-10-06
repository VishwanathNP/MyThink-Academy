import React, { useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

// Components
import DashboardParentNavbar from '../Parent/Components/Navbar'
import DashboardParentSidebar from '../Parent/Components/Sidebar'

// Views
import Overview from "../Parent/Overview/Overview"
import Students from "../Parent/Students/Students"
import StudentDetails from "../Parent/Students/StudentDetails"
import Profile from "../Parent/Profile/Profile"

const Parent = () => {

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
            <DashboardParentSidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardParentNavbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
                <Switch>
                    <Route exact path="/parent/overview" component={Overview} />
                    <Route exact path="/parent/students" component={Students} />
                    <Route exact path="/parent/students/:sid" component={StudentDetails} />
                    <Route exact path="/parent/profile" component={Profile} />
                    <Redirect from="/parent/overview" to="/parent/overview" />
                </Switch>
            </div>
        </div>
        </>
    )
}

export default Parent
