import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LogoutComp() {

    const navigate = useNavigate();

    useEffect(() => {

        localStorage.removeItem("auth");

        navigate("/login");

    }, [navigate]);

    return <h2>Logging Out...</h2>;
}

export default LogoutComp;