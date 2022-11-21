import type { NextPage } from "next";
import Layout from "../components/Layout";
import HeroBanner from "../components/HeroBanner";
import TermsSection from "../components/TermsSection";
import styles from "../styles/Home.module.css";
import React from "react";
import { Box } from "@mui/system";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import FoodBankOutlinedIcon from "@mui/icons-material/FoodBankOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Router from "next/router";

const heroResult = {
  imageUrl: "https://i.imgur.com/p9E5i02.png",
  title: "工作指引",
};

const actionSize = {
  width: 50,
  height: 50,
  backgroundColor: "#53C351",
};

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
const Terms: NextPage = () => {
  return (
    <Layout>
      {/* Hero unit */}
      <section className={styles.banner} id="home">
        <HeroBanner resultConfig={heroResult} showButton="false" />
      </section>
      <section id="terms">
        <Box
          padding={16}
          sx={{ width: "100vw", height: "auto", textAlign: "center" }}
        ></Box>
        <TermsSection
          title="性騷擾指引"
          content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        />
        <TermsSection
          title="私隱條例"
          content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        />
        <TermsSection
          title="Website and Cookies 用途"
          content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        />
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
                Router.push({
                  pathname: "/",
                  query: { position: "contact" },
                });
              } else if (action.key == "home") {
                Router.push({
                  pathname: "/",
                  query: {},
                });
              } else if (action.key == "guideline") {
                Router.push({
                  pathname: "/terms",
                  query: {},
                });
              }
            }}
          />
        ))}
      </SpeedDial>
    </Layout>
  );
};

export default Terms;
