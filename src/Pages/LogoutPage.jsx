import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        
        localStorage.removeItem("token");

       

        
        navigate("/"); 
    }, [navigate]);

    return (
        <div className="logout-page">
            <p>Logging you out...</p>
        </div>
    );
};

export default LogoutPage;
