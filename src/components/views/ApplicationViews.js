import { useEffect } from "react";
import { useNavigate, useLocation, Route, Routes } from "react-router-dom"
import { Login } from "../auth/Login";
import { Register } from "../auth/Register";
import { ArticleForm } from "../forms/ArticleForm";
import { UserHome } from "../../Home";
import { ArticleList } from "../clothingArticles/ViewAllArticles";
import { ArticleDetails } from "../clothingArticles/ArticleDetails";
import { EditArticleForm } from "../forms/EditArticle";
import { OutfitForm } from "../forms/OutfitForm";
import { OutfitList } from "../outfits/ViewAllOutfits";
import { OutfitDetails } from "../outfits/OutfitDetails";

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
                <Route path="create" element={<ArticleForm token={token} setToken={setToken} />} />
                <Route path="edit-article/:articleId" element={<EditArticleForm token={token} setToken={setToken} />} />
                <Route path=":articleId" element={<ArticleDetails token={token} setToken={setToken} />} />
            </Route>
            <Route path="outfits" element={<OutfitList token={token} setToken={setToken} />} />
            <Route path="outfits/:outfitId" element={<OutfitDetails token={token} setToken={setToken} />} />
            <Route path="outfits/edit-outfit/:outfitId" element={<OutfitForm token={token} setToken={setToken} />} />
            <Route path="outfits/create" element={<OutfitForm token={token} setToken={setToken} />} />
        </Routes>
        </>
    )
    }
}