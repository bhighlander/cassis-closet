import { useEffect } from "react";
import { useNavigate, useLocation, Route, Routes } from "react-router-dom"
import { Login } from "../auth/Login";
import { Register } from "../auth/Register";
import { CreateArticleForm } from "../forms/ArticleForm";
import { UserHome } from "../../Home";
import { ArticleList } from "../clothingArticles/ViewAllArticles";

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
                    <Route path="/login" element={<Login token={token} setToken={setToken} />} />
                    <Route path="/register" element={<Register token={token} setToken={setToken} />} />
                </Route>
            </Routes>
            </>
        )
        
    } else {
    return (
        <>
        <Routes>
            <Route path="/" element={<UserHome />} />
            <Route>
                <Route path="/login" element={<Login token={token} setToken={setToken} />} />
                <Route path="/register" element={<Register token={token} setToken={setToken} />} />
            </Route>
            <Route path="/closet" element={<ArticleList token={token} setToken={setToken} />} />
            <Route path="/articles">
                <Route path="create" element={<CreateArticleForm token={token} setToken={setToken} />} />
            </Route>
        </Routes>
        </>
    )
    }
}