import { useEffect, useState } from "react";
import axios from "axios";
import AdminLeftBar from "../Component/AdminLeftBar";
import API from "../API/api";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get(API.USERs, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setUsers(response.data);
            } catch (err) {
                setError("Failed to fetch users.");
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    }, []);

    
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest("#mobile-menu") && !event.target.closest("#menu-button")) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener("click", handleClickOutside);
        }

        return () => document.removeEventListener("click", handleClickOutside);
    }, [isMenuOpen]);

    const toggleAdminStatus = async (userId, currentStatus) => {
        try {
            const url = currentStatus
                ? `http://localhost:3000/users/remove-admin/${userId}`
                : `http://localhost:3000/users/promote/${userId}`;

            await axios.patch(url, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });

            alert(currentStatus ? "Admin status removed!" : "User promoted to admin!");

            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === userId ? { ...user, admin: !currentStatus } : user
                )
            );
        } catch (err) {
            setError("Failed to toggle admin status.");
        }
    };

    const removeUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:3000/users/${userId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });

            alert("User removed successfully!");
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        } catch (err) {
            setError("Failed to remove user.");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <section className="w-full flex flex-row relative">
            
            <div className="hidden lg:block w-1/6">
                <AdminLeftBar />
            </div>

            
            <div className="block lg:hidden mt-8">
                <button id="menu-button" onClick={toggleMenu} className="p-2 border rounded-md shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-align-justify">
                        <path d="M3 12h18" />
                        <path d="M3 18h18" />
                        <path d="M3 6h18" />
                    </svg>
                </button>
            </div>

            
            {isMenuOpen && (
                <div id="mobile-menu" className="absolute left-0 top-0 w-2/3 h-full bg-white shadow-lg z-50 p-4">
                    <AdminLeftBar />
                </div>
            )}

            
            <div className="flex mt-8 ml-8 flex-col w-full">
                <h2 className="text-2xl font-bold text-cyan-500">All Users</h2>
                <table className="table-auto mt-4 border-collapse w-full">
                    <thead>
                        <tr className="bg-blue-100">
                            <th className="px-4 py-2 rounded-xl">ID</th>
                            <th className="px-4 py-2 rounded-xl">Name</th>
                            <th className="px-4 py-2 rounded-xl">Email</th>
                         
                            <th className="px-4 py-2 rounded-xl">Admin</th>
                            <th className="px-4 py-2 rounded-xl">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-b">
                                <td className="px-4 py-2">{user.id}</td>
                                <td className="px-4 py-2">{user.name}</td>
                                <td className="px-4 py-2">{user.email}</td>
                              
                                <td className="px-4 py-2">{user.admin ? "Yes" : "No"}</td>
                                <td className="px-4 py-2 flex flex-col sm:flex-row gap-2">
                                    
                                    <button
                                        className={`w-40 text-white px-4 py-2 rounded ${user.admin ? "bg-yellow-500" : "bg-blue-500"}`}
                                        onClick={() => toggleAdminStatus(user.id, user.admin)}
                                    >
                                        <div className="flex gap-2 items-center">
                                            {user.admin ? " Remove Admin" : "Promote to Admin"}
                                        </div>
                                    </button>

                                    
                                    <button
                                        className="bg-red-500 w-40 text-white px-4 py-2 rounded"
                                        onClick={() => removeUser(user.id)}
                                    >
                                        <div className="flex gap-2 items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                                            Remove User
                                        </div>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
