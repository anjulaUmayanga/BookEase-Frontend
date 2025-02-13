import { Link } from "react-router-dom";
import main from "../assets/main.png"
import jd1 from "../assets/jd1.jpg"
import jd2 from "../assets/jd2.jpg"
export default function Welcome(){
    return(
        <section className="flex flex-col bg-gray-50 h-fit pb-8">
           <div className="w-full flex-row  h-16 bg-red-100 flex">
                <div className="flex justify-center items-center ml-12 text-3xl font-serif">
                    <span className="text-cyan-500">Book</span> 
                    <span className="text-red-600 sm:mt-4 lg:mt-0">Ease</span>
                </div>
                <div className="w-full  flex flex-row justify-end items-center">
                    <div className="">
                        <button className="text-gray-900 text-lg font-semibold w-32 h-8 mr-4 ring-red-800 ring-2 rounded-3xl">
                            <Link to={'/login'}>Log in</Link>
                        </button>
                        <button className="text-white bg-primary text-lg font-semibold mr-4 w-32 h-8 rounded-3xl">
                            <Link to={'/register'}>Sign up</Link>
                        </button>
                    </div>
                </div>
           </div>
           <div className="flex mt-4 flex-col">
                <div className="w-36 text-red-400 bg-white h-12 shadow-md shadow-gray-500 rounded-r-2xl flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-earth"><path d="M21.54 15H17a2 2 0 0 0-2 2v4.54"/><path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17"/><path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"/><circle cx="12" cy="12" r="10"/></svg>
                    <span className="text-blue-400">IWO certified</span>
                </div>
                <div className=" w-full flex flex-row">
                    <div className="w-1/2 flex justify-center items-center flex-col">
                        <span className="text-red-800 mt-16 text-4xl font-sans">Online Booking System for</span>
                        <span className="ml-16 mt-4 text-xl text-red-400">Effortlessly manage your appointments with BookEase,  and you will have clients both old and new making bookings 24/7.</span>
                        <button className="text-white mt-4 items-start bg-primary text-lg font-semibold mr-4 w-56 h-12 rounded-3xl">
                            <Link to={'/register'} className="flex gap-4 pl-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                Get Free Account
                            </Link>
                        </button>
                    </div>
                    <div className="w-1/2">
                        <img src={main} alt="img" />
                    </div>
                </div>
                <div className="w-full ">
                    <span className="text-blue-600 flex justify-center items-center text-3xl">Our Features</span>
                    <div className="flex mt-8 justify-between">
                        <div className="flex w-60 p-8 ml-32 xs:ml-40 lg:ml-32 sm:ml-4 flex-col items-center text-cyan-500 bg-white hover:rounded-t-3xl hover:shadow-md hover:shadow-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
                            <span className="text-gray-900 text-xl">Online Booking</span>
                            <span className="text-gray-900 mt-4">Your 24/7 Smart Online Booking Solution</span>
                        </div>
                        <div className="flex w-64 p-8  flex-col items-center text-cyan-500 bg-white hover:rounded-t-3xl hover:shadow-md hover:shadow-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hand-coins"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"/><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/><path d="m2 16 6 6"/><circle cx="16" cy="9" r="2.9"/><circle cx="6" cy="5" r="3"/></svg>                            
                            <span className="text-gray-900 text-xl">No payment Require</span>
                            <span className="text-gray-900 mt-4">No need to add card details</span>
                        </div>
                        <div className="flex w-64 p-8 flex-col items-center mr-32 xs:mr-40 lg:mr-32 sm:mr-4 text-cyan-500 bg-white hover:rounded-t-3xl hover:shadow-md hover:shadow-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>                            
                            <span className="text-gray-900 text-xl">Customer Satisfication</span>
                            <span className="text-gray-900 mt-4">Various customer feed back</span>
                        </div>
                    </div>
                </div>
                <div className="w-full mt-8 flex justify-center items-center flex-col">
                    <span className="text-red-500 text-3xl mb-4">Customer Feedback</span>
                    <div className="flex justify-center gap-12 items-center flex-row">
                        <div className="shadow-lg shadow-gray-600 hover:shadow-red-300 border w-72 border-gray-400 text-center flex  flex-col items-center justify-center  rounded-2xl p-4">
                                <img src={jd1} className="w-40 h-40 rounded-full items-center"/>
                                <span className="text-2xl font-sans">Jhone Doe</span>
                                <div>
                                    <span className="text-lg font-serif mt-4 text-gray-500">BookEase has completely transformed the way I manage my appointments! The 24/7 booking feature ensures my clients can schedule at their convenience, and the seamless interface makes everything effortless. Highly recommended!</span>
                                </div>
                        </div>
                        <div className="border shadow-lg shadow-gray-600 text-gray-500 hover:shadow-red-300   w-72 border-gray-400 text-center flex  flex-col items-center justify-center  rounded-2xl p-4">
                                <img src={jd2} className="w-40 h-40 rounded-full items-center"/>
                                <span className="text-2xl font-sans">Jane Doe</span>
                                <div>
                                    <span className="text-lg font-serif mt-4"> BookEase is an absolute game-changer! Managing appointments has never been this easy—my clients love the 24/7 booking, and I love how effortless it is to stay organized. A must-have for any service-based business!</span>
                                </div>
                        </div>
                    </div>
                </div>
           </div>
        </section>
    );
}