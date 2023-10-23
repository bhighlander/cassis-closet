import { useEffect } from "react";
import { useNavigate, useLocation, Route, Routes } from "react-router-dom"
import { Login } from "../auth/Login";
import { Register } from "../auth/Register";

export const ApplicationViews = ({ token, setToken }) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!token && location.pathname !== '/login' && location.pathname !== '/register') {
            navigate("/login");
        }
    }, [token, navigate, location]);

    if (!token) {
        return (
            <>
            <Routes>
                <Route>
                    <Route path="/login" element={<Login setToken={setToken} />} />
                    <Route path="/register" element={<Register setToken={setToken} />} />
                </Route>
            </Routes>
            </>
        )
        
    } else {
    return (
        <>
        <Routes>
            <Route>
                <Route path="/login" element={<Login setToken={setToken} />} />
                <Route path="/register" element={<Register setToken={setToken} />} />
            </Route>
        </Routes>
        </>
    )
    }
}