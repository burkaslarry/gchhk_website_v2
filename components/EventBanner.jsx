import { Box, Container } from "@mui/system";
import Typography from "@mui/material/Typography";
import { Client } from "@notionhq/client";
import { useEffect } from "react";

const EventBanner = ({ parentStyle, imageUrl, createDate, title }) => {
  return (
    <div className={parentStyle}>
      <Container
        borderRadius="25%"
        sx={{
          width: "100vw",
          height: "40vh",
          background:
            "linear-gradient(0deg, rgba(0 0 0 / 80%), rgba(0 0 0 / 29%)), url('" +
            imageUrl +
            "')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Box sx={{ display: "block", marginTop: 4 }} borderRadius="25%">
          <Typography variant="h4" color="white" align="right">
            {createDate}
          </Typography>
          <Typography variant="h4" color="white" align="left">
            {title}
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default EventBanner;
