import Container from "@mui/material/Container";
import styles from "../styles/Home.module.css";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Image from "next/image";
import gchLogo from "../public/GCH.svg";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

const TermsSection = ({ title, content }) => {
  return (
    <div>
      <Box
        padding={16}
        sx={{ width: "100vw", height: "auto", textAlign: "center" }}
      >
        <Typography
          variant="h4"
          gutterBottom
          fontWeight="700"
          sx={{ paddingTop: 3 }}
          align="center"
        >
          <strong>{title}</strong>
        </Typography>
        <br />
        <Typography
          variant="h6"
          gutterBottom
          fontWeight="500"
          sx={{ paddingTop: 3 }}
          align="left"
        >
          {content}
        </Typography>
        <br />
        <br />
      </Box>
    </div>
  );
};

export default TermsSection;
