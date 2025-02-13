import { useEffect, useState, useRef } from "react";
import AdminLeftBar from "../Component/AdminLeftBar";
import Calander from "../Component/calander";

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

export default function Home() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const sidebarRef = useRef(null);

    useEffect(() => {
        const user = getUserFromToken();
        if (user && user.admin) {
            setIsAdmin(true);
        }
    }, []);

    // Toggle sidebar menu
    const toggleMenu = () => setIsMenuOpen((prevState) => !prevState);

    // Close sidebar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target) && !event.target.closest("#menu-button")) {
                setIsMenuOpen(false);
            }
        };

        // Only add event listener if the menu is open
        if (isMenuOpen) {
            document.addEventListener("click", handleClickOutside);
        } else {
            document.removeEventListener("click", handleClickOutside);
        }

        return () => document.removeEventListener("click", handleClickOutside);
    }, [isMenuOpen]);

    return (
        <div className="w-full flex flex-row bg-gray-100 relative">
            {isAdmin && (
                <>
                    {/* Admin LeftBar for large screens */}
                    <div className="hidden lg:block lg:w-1/6 w-full">
                        <AdminLeftBar />
                    </div>

                    {/* Admin LeftBar Icon for small screens */}
                    <div className="lg:hidden sm:block">
                        <button
                            id="menu-button"
                            onClick={toggleMenu}
                            className="p-2 border rounded-md shadow-md mt-4 ml-8"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-align-justify"
                            >
                                <path d="M3 12h18" />
                                <path d="M3 18h18" />
                                <path d="M3 6h18" />
                            </svg>
                        </button>
                    </div>

                    {/* Admin LeftBar Popup for small screens */}
                    {isMenuOpen && (
                        <div
                            ref={sidebarRef}
                            className="sm:hidden fixed inset-0 z-20 bg-black bg-opacity-50"
                        >
                            <div className="w-3/4 h-full bg-white shadow-lg">
                                <AdminLeftBar />
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* Main content area */}
            <div className="flex flex-col w-full mt-4 ml-8">
                <div className="ml-8">
                    {/* Calander component with responsiveness */}
                    <div className="w-full items-center sm:w-3/4 lg:w-2/3 xl:w-full">
                        <Calander />
                    </div>
                </div>
            </div>
        </div>
    );
}
