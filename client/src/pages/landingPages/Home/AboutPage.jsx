import React from 'react'
import Navbar from '../Components/Navbar'
import { Link } from 'react-router-dom'
import { AiOutlineArrowRight } from "react-icons/ai"

import photo from '../../../assets/img/photo.jpg'
import photo1 from '../../../assets/img/photo1.jpg'
import photo2 from '../../../assets/img/photo3.jpg'
import bangalore from '../../../assets/img/bangalore.png'
import celebration_pic from '../../../assets/img/celebration.svg'

const AboutPage = () => {
    return (
        <div>
            <Navbar />
            <div>
                <div className="container mx-auto max-w-7xl px-5 py-24 ">
                    <div className="justify-center items-center text-center">
                        <h1 className="text-3xl font-semibold tracking-tight leading-snug md:leading-normal text-black sm:text-5xl title-font">About us</h1>
                        <h1 className="text-3xl font-semibold tracking-tight leading-snug md:leading-normal text-black sm:text-5xl title-font">"Making an impact, together"</h1>
                        <p className="mb-8 text-lg font-normal tracking-normal leading-normal text-black sm:text-xl title-font">To free the genius within everyone by making learning stunningly easy to work with</p>
                    </div>
                </div>
                <div>
                        <div className="bg-gray-100 h-auto w-full p-4 mt-16">
                            <div className="container mx-auto max-w-7xl mb-8">
                                <div className="bg-green-500 h-auto -mt-32 rounded-xl shadow-xl  p-8">
                                    <h1 className="mb-6 text-2xl text-center font-semibold tracking-tight text-white sm:text-5xl title-font">
                                        Our values
                                    </h1>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        <div>
                                            <h2 className="text-gray-900 text-lg title-font font-medium pb-4">Give superpower to your child</h2>
                                            <p className="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.</p>
                                        </div>
                                        <div>
                                            <h2 className="text-gray-900 text-lg title-font font-medium pb-4">Give superpower to your child</h2>
                                            <p className="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.</p>
                                        </div>
                                        <div>
                                            <h2 className="text-gray-900 text-lg title-font font-medium pb-4">Give superpower to your child</h2>
                                            <p className="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.</p>
                                        </div>
                                        <div>
                                            <h2 className="text-gray-900 text-lg title-font font-medium pb-4">Give superpower to your child</h2>
                                            <p className="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.</p>
                                        </div>
                                        <div>
                                            <h2 className="text-gray-900 text-lg title-font font-medium pb-4">Give superpower to your child</h2>
                                            <p className="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.</p>
                                        </div>
                                        <div>
                                            <h2 className="text-gray-900 text-lg title-font font-medium pb-4">Give superpower to your child</h2>
                                            <p className="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 mt-16 mb-8">
                                        <div className="text-center md:text-left">
                                            <h1 className="mb-6 text-3xl font-semibold tracking-tight leading-snug md:leading-normal text-black sm:text-8xl title-font">Our <br className="hidden" />Leadership</h1>
                                        </div>
                                        <div>
                                            <h1 className="mb-4 text-2xl font-bold tracking-tight leading-snug text-black sm:text-5xl title-font">Meet the Team</h1>
                                            <p className="mb-4 text-md font-normal tracking-tight leading-tight text-gray-800 sm:text-lg title-font">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8">
                                            <div className=" ">
                                                <img className="w-full h-96 rounded" src={photo1} alt="img" />
                                            </div>
                                            <div className="justify-start text-left">
                                                <h1 className="mb-4 text-2xl font-bold tracking-tight leading-snug text-black sm:text-3xl title-font">Pavan</h1>
                                                <h1 className="text-gray-900 text-lg title-font font-medium pb-4">CEO, Bangalore</h1>
                                                <p className="mb-4 text-md font-normal tracking-tight leading-tight text-gray-800 sm:text-lg title-font">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8">
                                            <div className="">
                                                <img className="w-full h-96 rounded" src={photo} alt="img" />
                                            </div>
                                            <div className="justify-start text-left">
                                                <h1 className="mb-4 text-2xl font-bold tracking-tight leading-snug text-black sm:text-3xl title-font">Harish</h1>
                                                <h1 className="text-gray-900 text-lg title-font font-medium pb-4">CEO, Bangalore</h1>
                                                <p className="mb-4 text-md font-normal tracking-tight leading-tight text-gray-800 sm:text-lg title-font">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8">
                                            <div className="">
                                                <img className="w-full h-96 rounded" src={photo2} alt="img" />
                                            </div>
                                            <div className="justify-start text-left">
                                                <h1 className="mb-4 text-2xl font-bold tracking-tight leading-snug text-black sm:text-3xl title-font">Afeef</h1>
                                                <h1 className="text-gray-900 text-lg title-font font-medium pb-4">CEO, Bangalore</h1>
                                                <p className="mb-4 text-md font-normal tracking-tight leading-tight text-gray-800 sm:text-lg title-font">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="bg-red-400 h-auto w-full p-8">
                            <div className="container mx-auto max-w-7xl mb-8 mt-8">
                            <h1 className="text-2xl font-semibold tracking-tight leading-snug md:leading-normal text-white sm:text-5xl title-font">Our Locations</h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4">
                                <img className="object-cover object-center rounded" alt="hero" src={bangalore} />
                                </div>
                                <div className="p-4">
                                <p className="text-xl font-semibold tracking-tight leading-snug md:leading-normal text-white sm:text-4xl title-font">Bangalore</p>
                                <p className="text-xl font-semibold tracking-tight leading-snug md:leading-normal text-white sm:text-4xl title-font pb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inc</p>
                                <button className="inline-flex rounded-full text-black bg-yellow-400 hover:border-0 border-yellow-400 border-2 py-2 px-6 rounded text-lg">Contact Us <AiOutlineArrowRight className="ml-2 self-center" /></button>
                                </div>
                            </div>
                            </div>
                            <div className="container mx-auto max-w-7xl relative">
                                <div className="bg-white h-auto -mb-32 rounded-xl shadow-xl text-center p-8">
                                    <div>
                                    <div className="container mx-auto max-w-7xl flex md:flex-row flex-col items-center">
                                    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-8 md:mb-0 items-center text-center">
                                        <h1 className="text-3xl font-semibold tracking-tight leading-snug md:leading-normal text-black sm:text-5xl title-font">Take your child to the next level</h1>
                                        <p className="mb-8 text-lg font-normal tracking-normal leading-normal text-black sm:text-xl title-font">Set up, run and monitor live classes for your classrooms</p>
                                        <div className="flex justify-center">
                                            <button className="inline-flex rounded-full text-black hover:bg-indigo-500 hover:border-0 border-indigo-500 border-2 py-2 px-6 rounded text-lg">Join Now <AiOutlineArrowRight className="ml-2 self-center" /></button>
                                        </div>
                                        </div>
                                        <div className="lg:max-w-md lg:w-full md:w-5/6 w-5/6">
                                        <img className="object-cover object-center rounded" alt="hero" src={celebration_pic} />
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <footer className="text-white bg-gray-900 body-font pt-32">
                            <div className="border-gray-200">
                                <div className="container flex flex-col flex-wrap items-center justify-between p-5 mx-auto md:flex-row">
                                        <h1 className="text-white pb-4">Mythink Academy</h1>
                                    <div className="flex flex-wrap items-center justify-center mx-auto text-base md:ml-auto md:mr-auto">
                                        <Link to="/curriculum" className="justify-center mr-5 text-sm text-center text-white hover:text-gray-800">Courses</Link>
                                        <Link to="/curriculum" className="justify-center mr-5 text-sm text-center text-white hover:text-gray-800">FAQs</Link>
                                        <Link to="#" className="justify-center mr-5 text-sm text-center text-white hover:text-gray-800">Contact</Link>
                                        <Link to="#" className="justify-center mr-5 text-sm text-center text-white hover:text-gray-800">About</Link>
                                    </div>
                                    <div className="inline-flex items-center justify-center md:justify-start ">
                                        <span className="inline-flex justify-center mt-2 sm:ml-auto sm:mt-0 sm:justify-start">
                                            <Link to="#" className="text-blue-807 hover:text-blue-500">
                                                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                    className="w-5 h-5" viewBox="0 0 24 24">
                                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                                </svg>
                                            </Link>
                                            <Link to="#" className="ml-4 text-blue-870 hover:text-blue-500">
                                                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                    className="w-5 h-5" viewBox="0 0 24 24">
                                                    <path
                                                        d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z">
                                                    </path>
                                                </svg>
                                            </Link>
                                            <Link to="#" className="ml-4 text-blue-870 hover:text-blue-500">
                                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                                                </svg>
                                            </Link>
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center px-5 py-6 mx-auto text-base bg-gray-900 fle7-wrap md:ml-auto md:mr-auto">
                                    <div className="flex flex-wrap items-center justify-center mx-auto text-base">
                                        <p className="mr-5 text-sm text-center text-gray-200">© My Think Academy — 2021
                                        </p>
                                        <Link to="#" className="justify-center mr-5 text-sm text-center text-blueGray-200 hover:text-blue-700"> Privacy
                                            Policy</Link>
                                        <Link to="#" className="justify-center mr-5 text-sm text-center text-blueGray-200 hover:text-blue-700"> Terms Of
                                            Service</Link>
                                    </div>
                                </div>
                            </div>
                        </footer>
                    </div>
            </div>
        </div>
    )
}

export default AboutPage
