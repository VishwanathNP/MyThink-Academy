import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineArrowRight } from "react-icons/ai"
import Typewriter from 'typewriter-effect';
import { FcVideoCall, FcSelfie, FcEngineering, FcConferenceCall, FcIdea, FcServices } from 'react-icons/fc'

import Navbar from '../Components/Navbar'
import './main.css'

import thinktank from '../../../assets/img/thinktank.png'
import finance from '../../../assets/img/finance.png'
import technology from '../../../assets/img/technology.webp'
import emotion from '../../../assets/img/emotion.png'
import communication from '../../../assets/img/communication.webp'
import basic from '../../../assets/img/basic.webp'

import land1 from '../../../assets/img/land1.svg'
import land2 from '../../../assets/img/land2.svg'
import land4 from '../../../assets/img/land4.svg'
import land5 from '../../../assets/img/land5.svg'
import land6 from '../../../assets/img/land6.svg'
import land8 from '../../../assets/img/land8.svg'
import land9 from '../../../assets/img/land9.svg'


const Homepage = () => {

    return (
        <div>
            <Navbar />
            <div>
                <div className="container mx-auto max-w-7xl px-5 py-24 flex flex-col items-center md:flex-row">
                    <div className="flex flex-col items-center w-full pt-0 text-left lg:flex-grow md:w-1/2 xl:mr-10 md:pr-10 md:items-start md:text-left md:mb-0">
                    <h1 className="mb-4 xl:mb-6 text-5xl md:text-6xl xl:leading-snug xl:text-7xl md:leading-relaxed font-semibold text-gray-700 leading-normal">Feed your mind with <br/>
                        <span>
                            <Typewriter options={{loop: true}} onInit={(typewriter) => {
                                typewriter.typeString('<span style="color: #ffb200;">Creativity</span>').pauseFor(2000).deleteAll()
                                            .typeString('<span style="color: #0b5d99;">Tranquillity</span>').pauseFor(2000).deleteAll()
                                            .typeString('<span style="color: #ff7e5b;">Curiosity</span>').pauseFor(2000).deleteAll()
                                            .typeString('<span style="color: rgba(239, 68, 68,1);">Actions</span>').pauseFor(2000).deleteAll()
                                            .typeString('<span style="color: rgba(29, 78, 216,1);">Reality</span>').pauseFor(2000).deleteAll()
                                            .typeString('<span style="color: rgb(255,215,0);">Ideas</span>').pauseFor(2000).deleteAll().start()
                            }} />
                        </span>
                    </h1>
                    <p className="mb-8 text-lg text-gray-800 md:text-xl md:leading-relaxed font-normal leading-loose tracking-normal">MyThink Academy is a real world thinking development system that helps children gain variety of essential knowledge and mindsets to build strong personality and enhanced thinking in a fun and challenging interactive exploration.</p>
                    <div>
                    <Link to="/course"><button className="button-3 learn-more mb-8">
                        <span className="circle" aria-hidden="true">
                        <span className="icon arrow"></span>
                        </span>
                        <span className="button-3-text">Explore More</span>
                    </button></Link>
                    </div>
                    </div>
                    <div>
                    <div class="w-full lg:max-w-3xl lg:w-full md:w-1/2 flex items-center">
                    <img class="object-cover object-center rounded-lg " alt="hero"
                        src={land9} />
                    </div>
                    </div>
                </div> 
            <div>
                <div className="bg-gray-100 h-auto w-full p-4 pt-12">
                    <div className="container mx-auto max-w-7xl mb-8">
                    <div className="yellow h-auto -mt-32 rounded-3xl shadow-xl text-center p-8">
                        <h1 className="mb-6 text-3xl font-semibold text-white md:text-5xl ">
                            Book a free online <br className="md:hidden" /> session
                        </h1>
                        <p className="mx-auto text-lg font-medium leading-relaxed text-gray-800 lg:w-2/3">
                            Program is scientifically designed for holistic cognitive development of kids aged 9-16 years across Reasoning, Comprehension, Critical Thinking and Problem Solving.
                        </p>
                        <div className="flex justify-center pt-4">
                        <Link to="/parent/register"><button className="transition transform hover:-translate-y-2 inline-flex rounded-full text-white blue hover:border-0 py-2 px-6 rounded text-lg font-medium">Book a free session</button>
                        </Link>
                        </div>
                    </div>
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                            <div className="text-center md:text-left">
                                    <h1 className="text-3xl font-bold tracking-normal leading-normal md:leading-normal text-gray-700 md:text-5xl ">Extensive Learning program for Children</h1>
                                    <h1 className="text-3xl font-bold tracking-normal leading-normal md:leading-normal md:text-5xl text-blue-700">Class 4th to 9th</h1>
                                    <h1 className="text-3xl font-bold tracking-normal leading-normal md:leading-normal md:text-5xl text-blue-700">Age group (9-16yrs)</h1>
                                </div>
                                <div>
                                <div className="">
                                    <p className="text-lg md:text-2xl md:leading-relaxed font-normal leading-loose tracking-normal">Our program is designed to develop mental thinking ability in children. We provide personalized course structure specific to age group which would cover multi dimensional areas and subjects which is of utmost importance in the current era.</p>
                                </div>
                                </div>
                            </div>
                            <h1 className="my-6 xl:my-12 text-3xl font-bold tracking-normal leading-normal md:leading-normal text-gray-700 md:text-5xl text-center">Our Course will encompass areas such as:</h1>
                            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                                <div className="cursor-pointer relative h-72 shadow-2xl rounded-xl w-full bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${thinktank})`}}>
                                    <div className="absolute w-full h-full rounded-xl bg-gradient-to-b from-transparent to-gray-900 flex flex-col justify-center items-center">
                                        <h1 className="text-4xl text-center tracking-wider font-medium text-white p-2">Critical Thinking</h1>
                                    </div>
                                </div>
                                <div className="cursor-pointer relative h-72 shadow-2xl rounded-xl w-full bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${finance})`}}>
                                    <div className="absolute w-full h-full rounded-xl bg-gradient-to-b from-transparent to-gray-900 flex flex-col justify-center items-center">
                                        <h1 className="text-4xl text-center tracking-wider font-medium text-white p-2">Financial and Business Literacy</h1>
                                    </div>
                                </div>    
                                <div className="cursor-pointer relative h-72 shadow-2xl rounded-xl w-full bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${technology})`}}>
                                    <div className="absolute w-full h-full rounded-xl bg-gradient-to-b from-transparent to-gray-900 flex flex-col justify-center items-center">
                                        <h1 className="text-4xl text-center tracking-wider font-medium text-white p-2">Latest Technologies</h1>
                                    </div>
                                </div>     
                                <div className="cursor-pointer relative h-72 shadow-2xl rounded-xl w-full bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${emotion})`}}>
                                    <div className="absolute w-full h-full rounded-xl bg-gradient-to-b from-transparent to-gray-900 flex flex-col justify-center items-center">
                                        <h1 className="text-4xl text-center tracking-wider font-medium text-white p-2">Emotional Intelligence</h1>
                                    </div>
                                </div>     
                                <div className="cursor-pointer relative h-72 shadow-2xl rounded-xl w-full bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${communication})`}}>
                                    <div className="absolute w-full h-full rounded-xl bg-gradient-to-b from-transparent to-gray-900 flex flex-col justify-center items-center">
                                        <h1 className="text-4xl text-center tracking-wider font-medium text-white p-2">Communication and society</h1>
                                    </div>
                                </div>     
                                <div className="cursor-pointer relative h-72 shadow-2xl rounded-xl w-full bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${basic})`}}>
                                    <div className="absolute w-full h-full rounded-xl bg-gradient-to-b from-transparent to-gray-900 flex flex-col justify-center items-center">
                                        <h1 className="text-4xl text-center tracking-wider font-medium text-white p-2">Productivity and Basic Foundations</h1>
                                    </div>
                                </div>     
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
            <div className=" mb-8 mt-8">
                <div className="container h-auto mx-auto max-w-7xl px-4">
                    <h1 className="mb-6 text-3xl font-bold tracking-normal leading-normal text-gray-700 md:text-5xl text-center">Why thinking development is required ?</h1>
                    <div className="mb-12">
                        <p className="text-lg md:text-2xl md:leading-relaxed font-normal leading-loose tracking-normal">
                        In a world where everyone is educated and graduated, the future world and workplaces rely on people who can think creatively and dynamically, learn new skills quickly, have a broad understanding of the world around them.
                        </p>
                    </div>
                </div>
                <div>
                <div className="container mx-auto max-w-7xl mb-8 mt-8">
                        <div className="flex flex-col md:flex-row mb-4">
                            <div className="w-full md:w-4/12 mx-auto p-4">
                                <img className="object-cover object-center rounded" src={land6} alt="empower" />
                            </div>
                            <div className="w-full md:w-1/2 mx-auto p-4">
                                <h3 className="text-xl font-normal tracking-wider leading-normal">Students</h3>
                                <p className="mt-2 text-lg md:text-xl md:leading-relaxed font-normal leading-relaxed tracking-normal">
                                Child growing up would definitely not know which is their area of interest and where they can excel. As they grow up they learn it by trial and error.</p>
                                <p className="mt-2 text-lg md:text-xl md:leading-relaxed font-normal leading-relaxed tracking-normal">Without proper thought process and cognitive skills the child would not be able to efficiently learn and excel</p>
                                <Link to="/parent/register"><button className="mt-6 inline-flex rounded-full text-black hover:bg-indigo-500 hover:border-0 border-indigo-500 border-2 py-2 px-6 rounded text-lg">Get Started</button>
                                </Link>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row-reverse mb-4">
                            <div className="w-full md:w-4/12 mx-auto p-4">
                                <img className="object-cover object-center rounded" src={land5} alt="empower" />
                            </div>
                            <div className="w-full md:w-1/2 mx-auto p-4">
                                <h3 className="text-xl font-normal tracking-wider leading-normal">Society</h3>
                                <p className="mt-2 text-lg md:text-xl md:leading-relaxed font-normal leading-relaxed tracking-normal">
                                In a society where there is an increase in unemployment, crime rates, fraudsters, cheaters the child should be capable of asking valid questions before blindly believing in something and making decisions based on here-say.
                                </p>
                                <Link to="/parent/register"><button className="mt-6 inline-flex rounded-full text-black hover:bg-indigo-500 hover:border-0 border-indigo-500 border-2 py-2 px-6 rounded text-lg">Get Started</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="container h-auto mx-auto max-w-7xl p-4 mt-4">
                        <h1 className="mb-6 text-3xl font-bold tracking-normal leading-normal text-gray-700 md:text-5xl text-center">Child’s should ask questions to himself like:</h1>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="grid grid-cols-2 gap-4" >
                                    <div className="place-self-center floating bg-white shadow-2xl col-span-2 rounded-xl p-4">
                                        <h1 className=" text-md text-center">Why is it important? Who is affected by this?</h1>
                                    </div>
                                    <div className="place-self-center floating-1 bg-white shadow-2xl rounded-lg p-4">What’s happening? What am I seeing?</div>
                                    <div className="place-self-center floating-2 bg-white shadow-2xl row-span-2 rounded-lg p-4">What am I missing? What’s hidden and why is it important?</div>
                                    <div className="place-self-center floating-3 bg-white shadow-2xl rounded-lg p-4">What else should I consider?</div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="place-self-center w-auto col-span-2 p-8"><img className="object-cover object-center rounded" src={land4} alt="empower" /></div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="place-self-center floating-3 bg-white shadow-2xl col-span-2 rounded-lg p-4">Where did this come from? How do I know for sure?</div>
                                    <div className="place-self-end floating-2 bg-white shadow-2xl rounded-lg p-4">What if …? Why not?</div>
                                    <div className="place-self-start floating-1 bg-white shadow-2xl col-span-3 rounded-lg p-4">Who is saying this? Why should I listen to this person? What can they teach me?</div>
                                </div>
                        </div>
                    
                    </div>
                </div>
                <div>
                <div className="container mx-auto max-w-7xl mb-8 mt-8">
                        <div className="flex flex-col md:flex-row mb-4">
                            <div className="w-full md:w-4/12 mx-auto p-4">
                                <img className="object-cover object-center rounded" src={land8} alt="empower" />
                            </div>
                            <div className="w-full md:w-1/2 mx-auto p-4">
                                <h3 className="text-xl font-normal tracking-wider leading-normal">Competition</h3>
                                <p className="mt-2 text-lg md:text-xl md:leading-relaxed font-normal leading-relaxed tracking-normal">
                                In the competition driven current world, children need to have problem-solving ability combined with broad awareness about the world and opportunities around them.
                                </p>
                                <Link to="/parent/register"><button className="mt-6 inline-flex rounded-full text-black hover:bg-indigo-500 hover:border-0 border-indigo-500 border-2 py-2 px-6 rounded text-lg">Get Started</button>
                                </Link>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row-reverse mb-4">
                            <div className="w-full md:w-4/12 mx-auto p-4">
                                <img className="object-cover object-center rounded" src={land2} alt="empower" />
                            </div>
                            <div className="w-full md:w-1/2 mx-auto p-4">
                                <h3 className="text-xl font-normal tracking-wider leading-normal">Future</h3>
                                <p className="mt-2 text-lg md:text-xl md:leading-relaxed font-normal leading-relaxed tracking-normal">
                                The future demands students who have the capability to think independently, communicate their knowledge effectively, translate it into action and lead from front.
                                </p>
                                <Link to="/parent/register"><button className="mt-6 inline-flex rounded-full text-black hover:bg-indigo-500 hover:border-0 border-indigo-500 border-2 py-2 px-6 rounded text-lg">Get Started</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div>
                <div className="bg-gray-100 h-auto w-full p-4">
                    <div className="container mx-auto max-w-7xl mt-4">
                    <h1 className="mb-8 text-3xl font-bold tracking-normal leading-normal text-gray-700 md:text-5xl text-left">How are we different?</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <div className="mb-6">
                                <h1 className="text-2xl text-gray-700 font-semibold tracking-wide">Our Course</h1>
                                <div className="h-2 w-1/4 bg-indigo-600 rounded-full my-4"></div>
                                <p className="text-lg md:text-xl md:leading-relaxed font-normal leading-relaxed tracking-normal">Mythink Academy focuses on enlightening the child in Real world knowledge and fundamentals in different dimensional areas covering critical thinking, logical reasoning, technology, business and many more which is suitable for the specific age groups.</p>
                                </div>
                                <div className="mb-6">
                                    <h1 className="text-2xl text-gray-700 font-semibold tracking-wide">Our concepts</h1>
                                    <div className="h-2 w-1/4 bg-indigo-600 rounded-full my-4"></div>
                                    <p className="text-lg md:text-xl md:leading-relaxed font-normal leading-relaxed tracking-normal">We help children to understand concepts visually and structurally, pose questions and assessments that will get children to think.</p>
                                </div>
                                <div className="mb-6">
                                    <h1 className="text-2xl text-gray-700 font-semibold tracking-wide">Our Goal</h1>
                                    <div className="h-2 w-1/4 bg-indigo-600 rounded-full my-4"></div>
                                    <p className="text-lg md:text-xl md:leading-relaxed font-normal leading-relaxed tracking-normal">Our objective is to encourage curiosity in the child, reinforce problem-solving ability, enhance creativity, and to foster independent thinking.</p>
                                </div>
                            
                            </div>
                            <div>
                            <img className="object-cover object-center rounded" src={land1} alt="empower" />
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
            
            <div>
            <div className="container mx-auto max-w-7xl mt-4 p-4">
                <h1 className="mb-4 text-3xl font-bold tracking-normal leading-normal text-gray-700 md:text-5xl text-center">Our courses show you the concepts at their core through:</h1>
                            
                <div className="grid grid-cols-2 text-center md:grid-cols-3 gap-4 mt-16">
                    <div className="flex flex-col items-center mx-auto">
                        <FcConferenceCall size={80} />
                        <h1 className="text-xl text-gray-700 font-medium tracking-normal py-8">Activity Based interactive classes</h1>
                    </div>
                    <div className="flex flex-col items-center mx-auto">
                        <FcIdea size={80} />
                        <h1 className="text-xl text-gray-700 font-medium tracking-normal py-8">Through mind games</h1>
                    </div>
                    <div className="flex flex-col items-center mx-auto">
                        <FcServices size={80} />
                        <h1 className="text-xl text-gray-700 font-medium tracking-normal py-8">Live projects</h1>
                    </div>
                    <div className="flex flex-col items-center mx-auto">
                        <FcEngineering size={80} />
                        <h1 className="text-xl text-gray-700 font-medium tracking-normal py-8">Workshops</h1>
                    </div>
                    <div className="flex flex-col items-center mx-auto">
                        <FcVideoCall size={80} />
                        <h1 className="text-xl text-gray-700 font-medium tracking-normal py-8">Adaptive classes</h1>
                    </div>
                    <div className="flex flex-col items-center mx-auto">
                    <FcSelfie size={80} />
                        <h1 className="text-xl text-gray-700 font-medium tracking-normal py-8">Productive screen time</h1>
                    </div>
                </div>
            
            </div>
            <div className="container mx-auto max-w-7xl relative p-4">
                <div className="bg-white -mb-32 rounded-xl shadow-2xl text-center p-8 yellow">
                    <div>
                        <div className="container mx-auto max-w-7xl flex md:flex-row flex-col items-center ">
                            <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-center md:text-left mb-8 md:mb-0 items-center">
                                <h1 className="text-3xl font-bold xl:leading-normal text-white md:text-5xl text-center xl:text-center">"Thinking Development is a skill for life, not just learning"</h1>
                                <div className="mt-8 flex items-center justify-center">
                                    <Link to="/parent/register"><button className="inline-flex rounded-full text-black font-bold hover:bg-indigo-500 hover:border-0 border-indigo-500 border-2 py-2 px-6 rounded text-lg">Join Now <AiOutlineArrowRight className="ml-2 self-center" /></button>
                                    </Link>
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

export default Homepage
