import { useEffect, useState } from 'react';
import logo  from '../assets/logo.png'

const getUserFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split(".")[1])); 
        return payload;
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};
export default function Header(){
    const [username, setUsername] = useState("");
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        const user = getUserFromToken();
        if (user) {
            setUsername(user.username); 
            setAdmin(user.admin);
        }
    }, []);
    return(
        <div className="flex justify-between w-full h-16 bg-red-400">
            <div className="text-white ml-12 mt-4 text-xl flex flex-row gap-2"> 
                <img src={logo} alt="Logo here" className='w-8 h-8' />
                <span>BookEase</span>
            </div>
            
            <div className='mr-8 flex justify-center items-center gap-2'>
                <button>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>                
                </button>
                {username ? username : "Guest"}
                ({admin ? "Admin" : "User"})
            </div>
        </div>
    );
}