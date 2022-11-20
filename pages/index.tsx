import type { NextPage } from "next";
import Image from "next/image";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import ContactUs from "../components/ContactUs";
import HeroBanner from "../components/HeroBanner";
import styles from "../styles/Home.module.css";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import FoodBankOutlinedIcon from "@mui/icons-material/FoodBankOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import React from "react";

const actions = [
  {
    icon: <HomeOutlinedIcon sx={{ color: "#ffffff" }} />,
    name: "回到主頁",
    key: "home",
  },
  {
    icon: <ContactMailOutlinedIcon sx={{ color: "#ffffff" }} />,
    name: "聯絡我們",
    key: "contact",
  },
  {
    icon: <PeopleOutlinedIcon sx={{ color: "#ffffff" }} />,
    name: "社區回收",
    key: "community",
  },
  {
    icon: <FoodBankOutlinedIcon sx={{ color: "#ffffff" }} />,
    name: "廚餘回收",
    key: "food",
  },
  {
    icon: <GavelOutlinedIcon sx={{ color: "#ffffff" }} />,
    name: "工作指引",
    key: "guideline",
  },
];

const actionSize = {
  width: 50,
  height: 50,
  backgroundColor: "#53C351",
};

const heroResult = {
  imageUrl:
    "https://images.unsplash.com/photo-1563770660941-20978e870e26?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=3600",
  title: "草根文化館",
  subtitle: "本會致力 \n 促進教育、保護環境、救助貧困",
};

const Home: NextPage = () => {
  return (
    <Layout>
      {/* Hero unit */}
      <section className={styles.banner} id="home">
        <HeroBanner resultConfig={heroResult} />
      </section>
      <section id="contact">
        <Box sx={{ width: "100vw" }}>
          <ContactUs />
        </Box>
      </section>
      <SpeedDial
        ariaLabel="Menu"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
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
              } else if (action.key == "home") {
                const element = document.getElementById("home");
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
