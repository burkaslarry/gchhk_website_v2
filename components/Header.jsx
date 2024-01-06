import {AppBar, Toolbar, Typography} from "@mui/material";
import React from "react";
import CameraIcon from "@mui/icons-material/PhotoCamera";

const Header = () => {
  return (
    <AppBar position="relative">
      <Toolbar>
        <CameraIcon sx={{ mr: 2 }} />
        <Typography variant="h6" color="inherit" noWrap>
          Album layout
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
