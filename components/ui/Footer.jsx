import { Box, Typography } from "@mui/material";
import React from "react";
import { Copyright } from "./Copyright";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
      <Copyright />
    </Box>
  );
};

export default Footer;
