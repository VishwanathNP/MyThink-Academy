import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import './main.css'

export const FeaturesTab = ({ children }) => {
    const [activeTab, setActiveTab] = useState(children[0].props.label)
    
    const handleClick = (e, newActiveTab) => {
        e.preventDefault();
        setActiveTab(newActiveTab);
    } 
    
    return (
        <div className="">
            <ul className="flex justify-evenly text-xs sm:text-sm md:text-md xl:text-lg text-black mt-4 mb-8">
                {children.map((tab) => {
                    const label = tab.props.label;

                    return (
                    <li className={label === activeTab ? "current p-2 hover:text-gray-900" : "p-2 hover:text-gray-900"} 
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