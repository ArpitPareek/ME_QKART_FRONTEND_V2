import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import {useHistory} from "react-router-dom"
import "./Header.css";

const Header = ({ children, hasHiddenAuthButtons }) => {
  const history = useHistory()
  const handleLogout=()=>{
    localStorage.removeItem("username");
    localStorage.removeItem("balance");
    localStorage.removeItem("token");
    history.push("/",{from:"Header"});
    window.location.reload();
  }
  
  return (
    <Box className="header">
      <Box className="header-title">
        <img src="logo_light.svg" alt="QKart-icon"></img>
      </Box>
      <Stack direction="row" spacing={2}>
        {hasHiddenAuthButtons ? (
          <Button
            className="explore-button"
            startIcon={<ArrowBackIcon />}
            variant="text"
            onClick={()=>history.push("/",{from:"Header"})}
          >
            Back to explore
          </Button>
        ) : window.localStorage.username ? (
          <>
            <Button>
            <Avatar>
        <img src="avatar.png" alt={localStorage.getItem('username')}/>
        
            </Avatar>
            {localStorage.getItem("username")}
            </Button>
            <Button className="button" variant="contained"
            onClick={handleLogout}
            >
              LOGOUT
            </Button>
          </>
        ) : (
          <>
            <Button className="button" variant="contained"
            onClick={()=>history.push("/login",{from:"Header"})}
            >
              LOGIN
            </Button>
            <Button className="button" variant="contained"
            onClick={()=>history.push("/register",{from:"Header"})}
            >
              REGISTER
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default Header;
