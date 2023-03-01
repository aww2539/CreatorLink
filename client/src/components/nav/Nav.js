import "./Nav.css"
import React from "react"
import { getCurrentUserId } from "../../utils/apiManager"
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import Toolbar from '@mui/material/Toolbar';

export const NavDrawer = () => {
    const userId = getCurrentUserId()
    return (
        <section className="navbar">
            <Toolbar />
            
            <Divider />

            <List>

                <ListItem disablePadding>
                    <ListItemButton href="/home">
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home"/>
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton href="/search">
                    <ListItemIcon>
                        <SearchIcon />
                    </ListItemIcon>
                    <ListItemText primary="Search"/>
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton href={`/profile/${userId}`}>
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="My Profile"/>
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton onClick={() => localStorage.removeItem("creatorLink_user")} href="/login">
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout"/>
                    </ListItemButton>
                </ListItem>

            </List>

            <Divider />
        </section>



        // <section className="navbar">
        //     <div className="navbar__item active">
        //         <Link className="navbar__link" to="/home"><button className="nav__button">Home</button></Link>
        //     </div>
        //     <div className="navbar__item active">
        //         <Link className="navbar__link" to="/search"><button className="nav__button">Search</button></Link>
        //     </div>
        //     <div className="navbar__item active">
        //         <Link className="navbar__link" to={`/profile/My${userId}`}><button className="nav__button">My Profile</button></Link>
        //     </div>
        //     <div className="navbar__item active">
        //         <Link className="navbar__link" to="/login" onClick={
        //             () => localStorage.removeItem("creatorLink_user")
        //         }><button className="nav__button">Logout</button></Link>
        //     </div>
        // </section>
    )
}
