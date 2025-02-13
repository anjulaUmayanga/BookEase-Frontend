import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear authentication token from localStorage
        localStorage.removeItem("token");

        // Optionally, you could also clear sessionStorage if used
        // sessionStorage.removeItem("token");

        // Redirect to the login page or homepage
        navigate("/"); // You can change this to your desired route
    }, [navigate]);

    return (
        <div className="logout-page">
            <p>Logging you out...</p>
        </div>
    );
};

export default LogoutPage;
