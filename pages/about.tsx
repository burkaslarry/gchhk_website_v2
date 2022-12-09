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
    icon: <GavelOutlinedIcon sx={{ color: "#ffffff" }} />,
    name: "工作指引",
    key: "guideline",
  },
];
const AboutUs: NextPage = () => {
  return (
    <Layout>
      {/* Hero unit */}
      <section className={styles.banner} id="home">
        <HeroBanner
          resultConfig={heroResult}
          showButton="false"
          handleClick={console.log("")}
        />
      </section>
      <section id="terms">
        <Box
          padding={16}
          sx={{ width: "100vw", height: "auto", textAlign: "center" }}
        ></Box>
        <TermsSection
          title="關於我們"
          content="草根文化館是一個非牟利機構，旨在促進教育、保護環境、救助貧困。秉承本會宗旨，我們就相關議題進行社區服務、培訓、研究及與這些領域上的其他群體交流合作。草根文化館為《稅務條例》第88條獲豁免繳稅的慈善機構。捐款港幣100元或以上可憑收據在課税年度申請扣稅。"
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

export default AboutUs;
