import {Box} from "@mui/material";
import React from "react";
import {Copyright} from "./Copyright";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#F4F9F8", p: 3 }} component="footer">
      <Copyright />
    </Box>
  );
};

export default Footer;
