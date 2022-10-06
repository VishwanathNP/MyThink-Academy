import React from 'react'
import Navbar from '../Components/Navbar'
import { AiOutlineArrowRight } from "react-icons/ai"
import { Link } from 'react-router-dom'
import { FeaturesTab  } from './FeaturesTab'
import course_pic from '../../../assets/img/undraw_Code_thinking_re_gka2.svg'
import ct from '../../../assets/img/undraw_new_ideas_jdea.svg'
import finance from '../../../assets/img/undraw_investing_7u74.svg'
import latest from '../../../assets/img/undraw_drone_surveillance_kjjg.svg'
import fulness from '../../../assets/img/undraw_mindfulness_scgo.svg'
import communication from '../../../assets/img/undraw_Work_chat_re_qes4.svg'
import productivity  from '../../../assets/img/undraw_dev_productivity_umsq.svg'
import features  from '../../../assets/img/undraw_features_overview_jg7a.svg'


const CoursePage = () => {
    return (
        <div>
            <Navbar />
            <div>
                <div className="container mx-auto max-w-7xl xl:px-0 px-4 py-24 xl:py-32">
                    <div className="flex md:flex-row flex-col gap-8">
                        <div className="w-full md:w-1/2 pt-12">
                            <img className="object-cover object-center rounded" alt="hero" src={course_pic} />
                        </div>
                        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left mt-8 md:mb-0 items-center text-center">
                            <h1 className="mb-6 xl:mb-7 text-4xl md:text-6xl xl:leading-snug xl:text-5xl md:leading-relaxed font-semibold text-gray-800 leading-normal">Thinking development course for children age group (9-16)</h1>
                            <p className="text-md md:text-xl md:leading-relaxed font-normal leading-loose tracking-normal">The world is a connected place, everything is connected. For any skill to work the individual needs to have a broad understanding of the elements which run the world.</p>
                        </div>
                    </div>
                    </div>
                    <div>
                        <div className="bg-gray-100 h-auto w-full p-4 mt-16">
                            <div className="container mx-auto max-w-7xl">
                            <div className="yellow h-auto -mt-32 rounded-xl shadow-xl text-center p-8">
                                    <h1 className="mb-6 text-2xl font-semibold tracking-tight text-white sm:text-5xl title-font">
                                        Our Program
                                    </h1>
                                    <p className="mx-auto text-lg font-medium leading-relaxed text-gray-800 lg:w-2/3">
                                    Program is scientifically designed for holistic cognitive development of kids aged 9-16 years across Reasoning, Comprehension, Critical Thinking and Problem Solving.
                                    </p>
                                    
                                </div>
                                <div className="grid grid-cols-1 gap-2 mt-8 md:mt-16">
                                    <div>
                                    <div className="flex flex-col md:flex-row-reverse mb-16">
                                        <div className="w-full md:w-4/12 mx-auto px-4 md:pt-0 my-0">
                                            <img className="object-cover object-center rounded" src={ct} alt="empower" />
                                        </div>
                                        <div className="w-full md:w-5/12 ml-auto mr-auto pt-4 md:pt-0 px-4">
                                            <div className="md:pr-4">
                                                <h3 className="text-3xl font-semibold leading-normal">Critical Thinking</h3>
                                                <div className="h-2 w-1/4 bg-green-600 rounded-full my-4"></div>
                                                <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 pt-8">
                                                    <div>
                                                        <div className="flex justify-center items-center h-24 border-2 border-green-500 rounded-lg">
                                                            <h1 className="text-center text-sm p-1">Analysis</h1>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="flex justify-center items-center h-24 border-2 border-green-500 rounded-lg">
                                                            <h1 className="text-center text-sm p-1">Interpretation</h1>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="flex justify-center items-center h-24 border-2 border-green-500 rounded-lg">
                                                            <h1 className="text-center text-sm p-1">Inference</h1>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="flex justify-center items-center h-24 border-2 border-green-500 rounded-lg">
                                                        <h1 className="text-center text-sm p-1">Problem solving</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                <div className="mt-8 items-ends">
                                                        <button className="inline-flex rounded-full text-black hover:border-0 border-green-500 border-2 py-2 px-6 rounded text-lg">and many more...</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                    <div>
                                    <div className="flex flex-col md:flex-row mb-16">
                                        <div className="w-full md:w-4/12 mx-auto px-4 md:pt-0 my-0">
                                            <img className="object-cover object-center rounded" src={finance} alt="empower" />
                                        </div>
                                        <div className="w-full md:w-5/12 ml-auto mr-auto pt-4 md:pt-0 px-4">
                                            <h3 className="text-3xl font-semibold leading-normal">Financial and Business Literacy</h3>
                                            <div className="h-2 w-1/4 bg-yellow-400 rounded-full my-4"></div>
                                            <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 pt-8">
                                                    <div>
                                                        <div className="flex justify-center items-center h-24 border-2 border-yellow-400 rounded-lg">
                                                            <h1 className="text-center text-sm p-1">Money flows</h1>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="flex justify-center items-center h-24 border-2 border-yellow-400 rounded-lg">
                                                            <h1 className="text-center text-sm p-1">Financial planning</h1>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="flex justify-center items-center h-24 border-2 border-yellow-400 rounded-lg">
                                                            <h1 className="text-center text-sm p-1">Taxation</h1>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="flex justify-center items-center h-24 border-2 border-yellow-400 rounded-lg">
                                                        <h1 className="text-center text-sm p-1">Small business, startup’s, corporate</h1>
                                                        </div>
                                                    </div>
                                                </div>                                        
                                            </div>
                                    </div>
                                    </div>
                                    <div>
                                    <div className="flex flex-col md:flex-row-reverse mb-16">
                                        <div className="w-full md:w-4/12 mx-auto px-4 md:pt-0 my-0">
                                            <img className="object-cover object-center rounded" src={latest} alt="empower" />
                                        </div>
                                        <div className="w-full md:w-5/12 ml-auto mr-auto pt-4 md:pt-0 px-4">
                                            <div className="md:pr-4">
                                                <h3 className="text-3xl font-semibold leading-normal">Latest Technologies</h3>
                                                <div className="h-2 w-1/4 bg-blue-600 rounded-full my-4"></div>
                                                <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 pt-8">
                                                    <div>
                                                        <div className="flex justify-center items-center h-24 border-2 border-blue-600 rounded-lg">
                                                            <h1 className="text-center text-sm p-1">Introductions to Data Science</h1>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="flex justify-center items-center h-24 border-2 border-blue-600 rounded-lg">
                                                            <h1 className="text-center text-sm p-1">Artificial intelligence</h1>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="flex justify-center items-center h-24 border-2 border-blue-600 rounded-lg">
                                                            <h1 className="text-center text-sm p-1">Machine learning</h1>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="flex justify-center items-center h-24 border-2 border-blue-600 rounded-lg">
                                                        <h1 className="text-center text-sm p-1">Internet use and well being</h1>
                                                        </div>
                                                    </div>
                                                </div>                                            
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                    <div>
                                    <div className="flex flex-col md:flex-row mb-16">
                                        <div className="w-full md:w-4/12 mx-auto px-4 md:pt-0 my-0">
                                            <img className="object-cover object-center rounded" src={fulness} alt="empower" />
                                        </div>
                                        <div className="w-full md:w-5/12 ml-auto mr-auto pt-4 md:pt-0 px-4">
                                            <h3 className="text-3xl font-semibold leading-normal">Mindfulness and Emotional Intelligence</h3>
                                            <div className="h-2 w-1/4 bg-pink-600 rounded-full my-4"></div>
                                            <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 pt-8">
                                                    <div>
                                                        <div className="flex justify-center items-center h-24 border-2 border-pink-600 rounded-lg">
                                                            <h1 className="text-center text-sm p-1">Empathy</h1>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="flex justify-center items-center h-24 border-2 border-pink-600 rounded-lg">
                                                            <h1 className="text-center text-sm p-1">Forgiveness</h1>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="flex justify-center items-center h-24 border-2 border-pink-600 rounded-lg">
                                                            <h1 className="text-center text-sm p-1">Meditation</h1>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="flex justify-center items-center h-24 border-2 border-pink-600 rounded-lg">
                                                        <h1 className="text-center text-sm p-1">Presence of mind</h1>
                                                        </div>
                                                    </div>
                                                </div>                                        
                                            </div>
                                    </div>
                                    </div>
                                    <div>
                                    <div className="flex flex-col md:flex-row-reverse mb-16">
                                        <div className="w-full md:w-4/12 mx-auto px-4 md:pt-0 my-0">
                                            <img className="object-cover object-center rounded" src={communication} alt="empower" />
                                        </div>
                                        <div className="w-full md:w-5/12 ml-auto mr-auto pt-4 md:pt-0 px-4">
                                            <div className="md:pr-4">
                                                <h3 className="text-3xl font-semibold leading-normal">Communication and society</h3>
                                                <div className="h-2 w-1/4 bg-indigo-600 rounded-full my-4"></div>
                                                <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 pt-8">
                                                    <div>
                                                        <div className="flex justify-center items-center h-24 border-2 border-indigo-600 rounded-lg">
                                                            <h1 className="text-center text-sm p-1">Active listening</h1>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="flex justify-center items-center h-24 border-2 border-indigo-600 rounded-lg">
                                                            <h1 className="text-center text-sm p-1">Conflict Management</h1>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="flex justify-center items-center h-24 border-2 border-indigo-600 rounded-lg">
                                                            <h1 className="text-center text-sm p-1">Skills of diplomacy</h1>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="flex justify-center items-center h-24 border-2 border-indigo-600 rounded-lg">
                                                        <h1 className="text-center text-sm p-1">Internet social skills</h1>
                                                        </div>
                                                    </div>
                                                </div>                                            
                                                </div>
                                        </div>
                                    </div>
                                    <div>
                                    <div className="flex flex-col md:flex-row mb-16">
                                        <div className="w-full md:w-4/12 mx-auto px-4 md:pt-0 my-0">
                                            <img className="object-cover object-center rounded" src={productivity} alt="empower" />
                                        </div>
                                        <div className="w-full md:w-5/12 ml-auto mr-auto pt-4 md:pt-0 px-4">
                                            <h3 className="text-3xl font-semibold leading-normal">Productivity and Basic Foundations</h3>
                                            <div className="h-2 w-1/4 bg-red-600 rounded-full my-4"></div>
                                            <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 pt-8">
                                                    <div>
                                                        <div className="flex justify-center items-center h-24 border-2 border-red-600 rounded-lg">
                                                            <h1 className="text-center text-sm p-1">Quants foundation</h1>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="flex justify-center items-center h-24 border-2 border-red-600 rounded-lg">
                                                            <h1 className="text-sm text-center p-1">Verbal and written ability foundation</h1>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="flex justify-center items-center h-24 border-2 border-red-600 rounded-lg">
                                                            <h1 className="text-center text-sm p-1">STEM foundations</h1>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="flex justify-center items-center h-24 border-2 border-red-600 rounded-lg">
                                                        <h1 className="text-center text-sm p-1">Goal setting</h1>
                                                        </div>
                                                    </div>
                                                </div>                                        
                                                </div>
                                    </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="bg-gray-100 h-auto w-full p-8">
                        <h1 className="text-2xl font-semibold tracking-tight leading-snug md:leading-normal text-black sm:text-5xl title-font text-center">Program Features</h1>
                            <div className="container mx-auto max-w-7xl mb-8 mt-8">
                            <FeaturesTab>
                                <div label="Productive screen time">
                                <div className="">
                                <div className="flex flex-col md:flex-row-reverse mb-16">
                                        <div className="w-full md:w-4/12 mx-auto md:pt-0 my-0">
                                            <img className="object-cover object-center rounded" src={features} alt="empower" />
                                        </div>
                                        <div className="w-full md:w-5/12 ml-auto mr-auto pt-4 md:pt-0">
                                            <div className="md:pr-4">
                                                <h3 className="text-3xl font-semibold leading-normal">Productive screen time</h3>
                                                <p className="mt-4 text-lg leading-relaxed text-gray-600">
                                                Engage your child in productive and educational activity over watching meaningless videos and online games.
                                                </p>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                                <div label="Adaptive Learning">
                                <div className="">
                                <div className="flex flex-col md:flex-row-reverse mb-16">
                                        <div className="w-full md:w-4/12 mx-auto md:pt-0 my-0">
                                            <img className="object-cover object-center rounded" src={features} alt="empower" />
                                        </div>
                                        <div className="w-full md:w-5/12 ml-auto mr-auto pt-4 md:pt-0">
                                            <div className="md:pr-4">
                                                <h3 className="text-3xl font-semibold leading-normal">Adaptive Learning</h3>
                                                <p className="mt-4 text-lg leading-relaxed text-gray-600">
                                                Adaptive practice ensures that you start off at a level that’s best suited to you, and gives you questions so that you can achieve your unique learning goals. With the right questions at the right time, you don’t have to worry about your practice.
                                                </p>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                                <div label="Live projects">
                                <div className="">
                                <div className="flex flex-col md:flex-row-reverse mb-16">
                                        <div className="w-full md:w-4/12 mx-auto md:pt-0 my-0">
                                            <img className="object-cover object-center rounded" src={features} alt="empower" />
                                        </div>
                                        <div className="w-full md:w-5/12 ml-auto mr-auto pt-4 md:pt-0">
                                            <div className="md:pr-4">
                                                <h3 className="text-3xl font-semibold leading-normal">Live projects</h3>
                                                <p className="mt-4 text-lg leading-relaxed text-gray-600">
                                                These projects will enable the child to work along with team members on projects dynamically with mentors guiding them. This method enhances their comprehension and team work
                                                </p>
                                                </div>
                                        </div>
                                    </div>
                                </div>                               
                                </div>
                                <div label="Mind Games">
                                <div className="">
                                <div className="flex flex-col md:flex-row-reverse mb-16">
                                        <div className="w-full md:w-4/12 mx-auto md:pt-0 my-0">
                                            <img className="object-cover object-center rounded" src={features} alt="empower" />
                                        </div>
                                        <div className="w-full md:w-5/12 ml-auto mr-auto pt-4 md:pt-0">
                                            <div className="md:pr-4">
                                                <h3 className="text-3xl font-semibold leading-normal">Mind Games</h3>
                                                <p className="mt-4 text-lg leading-relaxed text-gray-600">
                                                Mind games are scientifically designed to get your child to think.
                                                </p>
                                                </div>
                                        </div>
                                    </div>
                                </div>                               
                                </div>
                            </FeaturesTab>
                            </div>
                            <div className="container mx-auto max-w-7xl relative">
                                <div className="yellow h-auto -mb-32 rounded-xl shadow-xl text-center p-8">
                                    <div>
                                    <div className="container mx-auto max-w-7xl flex md:flex-row flex-col items-center">
                                    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-center md:text-left mb-8 md:mb-0 items-center text-center">
                                        <h1 className="text-3xl mb-8 font-semibold tracking-tight leading-snug md:leading-normal text-white sm:text-5xl title-font">Take your child to the next level</h1>
                                        <div className="flex justify-center">
                                            <Link to="/parent/register"><button className="inline-flex rounded-full bg-white text-black hover:bg-indigo-500 hover:border-0 border-indigo-500 border-2 py-2 px-6 rounded text-lg">Join Now <AiOutlineArrowRight className="ml-2 self-center" /></button>
                                            </Link>
                                        </div>
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
                                        <Link to="/course" className="justify-center mr-5 text-sm text-center text-white hover:text-gray-800">Courses</Link>
                                        <Link to="#" className="justify-center mr-5 text-sm text-center text-white hover:text-gray-800">FAQs</Link>
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

export default CoursePage
