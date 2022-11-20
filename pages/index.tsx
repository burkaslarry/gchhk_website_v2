import type { NextPage } from "next";
import Image from "next/image";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Layout from "../components/Layout";
import ContactUs from "../components/ContactUs";
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
  backgroundColor: "#FFFFFF",
};

const Home: NextPage = () => {
  return (
    <Layout>
      {/* Hero unit */}

      <Box
        sx={{
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          width: "100%",
          height: "496px",
          background: "#123456",
        }}
      >
        <Image
          layout="fill"
          objectFit="cover"
          alt="Cover Picture"
          src={banner}
          placeholder="blur"
          quality={100}
        />
        <Container className={styles.container_translucent}>
          <Typography variant="h6" align="center">
            Welcome
          </Typography>
        </Container>
      </Box>

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
