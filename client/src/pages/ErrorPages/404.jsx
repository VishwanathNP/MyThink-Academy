import React from 'react'
import { Link } from 'react-router-dom'

function NotFoundPage() {
    return (
        <div>
            <div className='text-center p-8'>
                <h1 className="text-9xl ">404</h1>
                <p className="text-5xl">Page Not Found</p>
                <div className="four_zero_four_bg h-96 bg-center bg-no-repeat" style={{ backgroundImage: `url("https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif")` }}>
                </div>
                <h3 className="text-3xl">Look like you're lost</h3>
                <h3 className="text-xl">The page you are looking for not avaible!</h3>
                <div className="mt-8">
                    <Link to="/" className="px-8 py-2 bg-white border-green-500	border-2 hover:bg-green-500 rounded-full text-xl">Home</Link>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage
