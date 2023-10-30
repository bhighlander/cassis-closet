import "./Navbar.css";
import { Add, Checkroom, DoorSliding, Home, Logout } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = ({ token, setToken }) => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(0)

    if (!token) {
        return null;
    }

    return (
        <header className="navbar">
            <BottomNavigation 
                showLabels
                value={selected}
                onChange={(event, newValue) => {
                    setSelected(newValue);
                }}
                >
                <BottomNavigationAction label="Home" value="home" icon={<Home />} onClick={() => navigate("/")} />
                <BottomNavigationAction label="Closet" value="articles" icon={<Checkroom />} onClick={() => navigate("/closet")} />
                <BottomNavigationAction label="Outfits" value="outfits" icon={<DoorSliding />} onClick={() => navigate("/outfits")} />
                <BottomNavigationAction label="New" value="create" icon={<Add />} /> {/* will update with expanding option to choose new article or new outfit form */}
                <BottomNavigationAction label="Logout" value="logout" icon={<Logout />} onClick={() => {
                    localStorage.removeItem("token");
                    setToken(null);
                    navigate("/login");
                }} />
            </BottomNavigation>
        </header>
    );
}