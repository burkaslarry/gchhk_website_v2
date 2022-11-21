import type { NextPage } from "next";
import Image from "next/image";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Layout from "../components/Layout";
import ContactUs from "../components/ContactUs";
import HeroBanner from "../components/HeroBanner";
import styles from "../styles/Home.module.css";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import React from "react";

const heroResult = {
  imageUrl: "",
  title: "工作指引",
  subtitle: "本會致力 \n 促進教育、保護環境、救助貧困",
};

const Home: NextPage = () => {
  return (
    <Layout>
      {/* Hero unit */}
      <section className={styles.banner} id="home">
        <HeroBanner resultConfig={heroResult} />
      </section>
      <section id="terms">
        <Box sx={{ width: "100vw", textAlign: "center" }}>
          <Typography>
            <strong>電郵已送出，謝謝</strong>
          </Typography>
        </Box>
      </section>
    </Layout>
  );
};

export default Home;
