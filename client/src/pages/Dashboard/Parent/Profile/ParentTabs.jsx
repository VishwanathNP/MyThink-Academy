import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import './Tab.css'

const ParentTabs = ({ children }) => {
    const [activeTab, setActiveTab] = useState(children[0].props.label)
    
    const handleClick = (e, newActiveTab) => {
        e.preventDefault();
        setActiveTab(newActiveTab);
    } 

    return (
        <div className="container mx-auto max-w-4xl ">
            <h1 className="text-2xl font-bold text-gray-700 px-6 md:px-0">Account Settings</h1>
            <ul className="flex border-b border-gray-300 text-sm font-medium text-gray-600 mt-4 px-4 md:px-0">
                {children.map((tab) => {
                    const label = tab.props.label;

                    return (
                    <li className={label === activeTab ? "current mr-8 md:mr-16 pb-4 hover:text-gray-900" : "mr-8 md:mr-16 pb-4 hover:text-gray-900"} 
                        key={label}>
                        <Link to="#" onClick={e => handleClick(e, label)}>
                            {label}
                        </Link>
                    </li>
                    )
                })}
            </ul>
            { children.map((one) => {
                if(one.props.label === activeTab)
                    return (
                        <div key={one.props.label}>
                            {one.props.children}
                        </div>
                    );
                return null
            })}
        </div>
    )
}

export { ParentTabs }