import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import CheckIcon from "@mui/icons-material/Check";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Layout from "../components/ui/Layout";
import styles from "../styles/Home.module.css";
import banner from "/image1.png";
const actions = [
  { icon: "TEST", name: "Text" },
  { icon: <CheckIcon />, name: "Check" },
  { icon: <ErrorOutlineIcon />, name: "Error" },
  { icon: <ThumbUpIcon />, name: "Share" },
];

const actionSize = {
  width: 50,
  height: 50,
  backgroundColor: "lightblue",
};

const Home: NextPage = () => {
  return (
    <Layout>
      {/* Hero unit */}
      <section className={styles.banner}>
        <Image
          layout="fill"
          src={banner}
          placeholder="blur"
          quality={100}
          sizes="100vw"
          alt="banner home"
        />
        <Container className={styles.container}>
          <h1>My awesome website</h1>
          <h2>Look at this website and bask in its amazing glory!</h2>
          <a href="https://example.com/" className={styles.btn}>
            Go ahead...
          </a>
        </Container>
      </section>

      <SpeedDial
        ariaLabel="Custom SpeedDial example"
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
          "& .MuiFab-primary": {
            backgroundColor: "gold",
            color: "blue",
            width: 80,
            height: 80,
            "& .MuiSpeedDialIcon-icon": { fontSize: 30 },
            "&:hover": { backgroundColor: "yellow" },
          },
        }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            sx={actionSize}
            onClick={(e) => {}}
          />
        ))}
      </SpeedDial>
    </Layout>
  );
};

export default Home;
