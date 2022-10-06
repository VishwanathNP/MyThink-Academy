import React from 'react'

const Overview = () => {
    return (
        <main className="overflow-auto pb-4 px-6">

        <div className="container mx-auto max-w-8xl">
            <div className="md:flex bg-gray-100 mb-10 p-6 rounded-lg shadow">
                <div className="md:w-1/2">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 leading-tight mb-6">Glad to have you as a part of the family.</h2>
                    <p className="text-gray-700 mb-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, ipsam vero. Ut mollitia, cumque amet suscipit quas error minima maiores aperiam.</p>
                    <button  className="shadow inline-flex items-center bg-red-500 hover:bg-red-600 focus:outline-none focus:shadow-outline text-white font-semibold py-2 px-4 rounded-lg">
                        Add Children 
                    </button>
                </div>
                <div className="md:w-1/2">
                </div>
            </div>
            </div>
        </main>
    )
}

export default Overview