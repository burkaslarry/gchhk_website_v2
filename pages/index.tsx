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
import ContactUs from "../components/ui/ContactUs";
import styles from "../styles/Home.module.css";
import banner from "../assets/image2.jpg";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import FoodBankOutlinedIcon from "@mui/icons-material/FoodBankOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import React from "react";

const actions = [
  { icon: <HomeOutlinedIcon />, name: "回到主頁", key: "home" },
  { icon: <ContactMailOutlinedIcon />, name: "聯絡我們", key: "contact" },
  { icon: <PeopleOutlinedIcon />, name: "社區回收", key: "community" },
  { icon: <FoodBankOutlinedIcon />, name: "廚餘回收", key: "food" },
  { icon: <GavelOutlinedIcon />, name: "工作指引", key: "guideline" },
];

const actionSize = {
  width: 50,
  height: 50,
  backgroundColor: "#53C351",
};

const Home: NextPage = () => {
  return (
    <Layout>
      {/* Hero unit */}
      <section className={styles.banner}>
        <Image
          layout="fill"
          alt="Cover Picture"
          src={banner}
          placeholder="blur"
          width={700}
          height={475}
          sizes="80vw"
          quality={100}
        />
        <Container className={styles.container_translucent}>
          <h1>My awesome website</h1>
          <h2>Look at this website and bask in its amazing glory!</h2>
          <a href="https://example.com/" className={styles.btn}>
            Go ahead...
          </a>
        </Container>
      </section>

      <section id="contact">
        <ContactUs />
      </section>
      <SpeedDial
        ariaLabel="Custom SpeedDial example"
        sx={{
          position: "fixed",
          bottom: 42,
          right: 42,
          "& .MuiFab-primary": {
            backgroundColor: "#53C351",
            color: "white",
            width: 64,
            height: 64,
            "& .MuiSpeedDialIcon-icon": { fontSize: 32 },
            "&:hover": { backgroundColor: "#53C351" },
          },
        }}
        openIcon={<ClearOutlinedIcon />}
        icon={<MenuOutlinedIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            sx={actionSize}
            onClick={(e) => {
              if (action.key == "contact") {
                const element = document.getElementById("contact");
                if (element != null) {
                  element.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                    inline: "nearest",
                  });
                }
              }
            }}
          />
        ))}
      </SpeedDial>
    </Layout>
  );
};

export default Home;
