import "./Navbar.css";
import { Add, Checkroom, DoorSliding, Home, Logout } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = ({ token, setToken }) => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

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
                }}>
                <BottomNavigationAction label="Home" value="home" icon={<Home />} onClick={() => navigate("/")} />
                <BottomNavigationAction label="Closet" value="articles" icon={<Checkroom />} onClick={() => navigate("/closet")} />
                <BottomNavigationAction label="Outfits" value="outfits" icon={<DoorSliding />} onClick={() => navigate("/outfits")} />
                <BottomNavigationAction label="New" value="create" icon={<Add />} onClick={handleMenuOpen} />
                <BottomNavigationAction label="Logout" value="logout" icon={<Logout />} onClick={() => {
                    localStorage.removeItem("token");
                    setToken(null);
                    navigate("/login");
                }} />
            </BottomNavigation>

            <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => {
                    handleMenuClose();
                    navigate("/articles/create");
                }}>New Article</MenuItem>
                <MenuItem onClick={() => {
                    handleMenuClose();
                    navigate("/outfits/create");
                }}>New Outfit</MenuItem>
            </Menu>
        </header>
    );
}
