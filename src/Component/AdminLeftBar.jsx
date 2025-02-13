import { Link } from "react-router-dom";

export default function AdminLeftBar(){
    return(
        <div className="flex flex-col w-full h-fit mb-8 mt-4 rounded-r-3xl bg-blue-500 text-white font-mono text-2xl">
            <span className="text-base font-serif mt-8 pl-2 font-bold text-red-500 text-center">Welcome to Admin Panel</span>
            <div className="mt-8 px-8 flex gap-2 hover:bg-gray-100 hover:text-gray-900 hover:rounded-l-2xl hover:ml-3 py-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users-round"><path d="M18 21a8 8 0 0 0-16 0"/><circle cx="10" cy="8" r="5"/><path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"/></svg>
               <Link to={'/home'}>Home</Link> 
            </div>

            <div className="mt-8 px-8 flex gap-2 hover:bg-gray-100 hover:text-gray-900 hover:rounded-l-2xl hover:ml-3 py-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users-round"><path d="M18 21a8 8 0 0 0-16 0"/><circle cx="10" cy="8" r="5"/><path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"/></svg>
               <Link to={'/users'}>Users</Link> 
            </div>

            <div className="mt-8 px-8 flex gap-2 py-4 hover:bg-gray-100 hover:text-gray-900 hover:rounded-l-2xl hover:ml-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-library-big"><rect width="8" height="18" x="3" y="3" rx="1"/><path d="M7 3v18"/><path d="M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z"/></svg>
                <Link to={'/bookings'}>Bookings</Link> 
            </div>

           
            <div className="mt-8 px-8 flex gap-2 text-red-700 py-4 mb-8 hover:bg-gray-100 hover:text-gray-900 hover:ml-1 hover:rounded-l-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-power"><path d="M12 2v10"/><path d="M18.4 6.6a9 9 0 1 1-12.77.04"/></svg>
                <Link to={'/logout'}> Log out</Link> 
            </div>
        </div>
    );
}