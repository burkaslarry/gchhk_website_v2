import type { NextPage } from "next";
import Link from "@mui/material/Link";
import Image from "next/image";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Box from "@mui/material/Box";
import Layout from "../components/Layout";
import ContactUs from "../components/ContactUs";
import HeroBanner from "../components/HeroBanner";
import GCHHKGird from "../components/GCHHKGird";
import EventBanner from "../components/EventBanner";
import styles from "../styles/Home.module.css";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import FoodBankOutlinedIcon from "@mui/icons-material/FoodBankOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import React from "react";
import Router from "next/router";
import { Typography } from "@mui/material";
import { getPosts, getEvents, getRecycle } from "../lib/notion";

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

const eventList = [
  {
    title: "單幢式樓宇藉都市固體廢物收費試驗項目—旺角",
    createDate: "2022-09-02",
    imageUrl: "https://i.imgur.com/PSi9TDW.jpg",
  },
  {
    title: "Milmill 參觀",
    createDate: "2022-07-02",
    imageUrl: "https://i.imgur.com/PSi9TDW.jpg",
  },
  {
    title: "嘉道理農場參觀",
    createDate: "2022-06-01",
    imageUrl: "https://i.imgur.com/PSi9TDW.jpg",
  },
];

const projectList = [
  { title: "單幢式樓宇藉都市固體廢物收費試驗項目—旺角" },
  { title: "多棄多付測試計劃" },
  { title: "廚餘回收計劃" },
  { title: "其他" },
];

class REcycleClass {
  title: string;
  figure: number;
  unit: string;

  constructor(name: string, amount: number, unit: string) {
    this.title = name;
    this.figure = amount;
    this.unit = unit;
  }
}

const heroResult = {
  imageUrl:
    "https://images.unsplash.com/photo-1563770660941-20978e870e26?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=3600",
  title: "草根文化館",
  subtitle: "本會致力 \n 促進教育、保護環境、救助貧困",
};

export async function getServerSideProps() {
  let { results } = await getPosts();
  // Return the result
  return {
    props: {
      eventList: results,
    },
  };
}

interface Props {
  eventList: [any];
  project: [any];
  recycle: [any];
}

const Home: NextPage<Props> = (props) => {
  console.log("eventList:" + props.eventList);
  console.log("project :" + props.project);
  console.log("recycler :" + props.recycle);

  return (
    <Layout>
      {/* Hero unit */}
      <section className={styles.banner} id="home">
        <HeroBanner resultConfig={heroResult} showButton="true" />
      </section>

      <section id="event_title">
        <Typography
          variant="h4"
          gutterBottom
          fontWeight="700"
          sx={{ paddingTop: 3 }}
          align="center"
        >
          <strong>網誌日常</strong>
        </Typography>
      </section>
      <section id="event_content">
        {props.eventList.map((result, index) => {
          console.log("email sent :" + JSON.stringify(result.properties));
          console.log(
            "email sent Name:" + JSON.stringify(result.properties.Name)
          );
          console.log(
            "email sentXX :" + JSON.stringify(result.properties.Title)
          );
          return (
            <div className={styles.cardHolder} key={index}>
              <Link href={`/posts/${result.id}`}>
                <Image
                  src={"https://i.imgur.com/PSi9TDW.jpg"}
                  width={300}
                  height={200}
                />
              </Link>
              <div className={styles.cardContent}>
                {result.properties.Name.title[0].rich_text}
                {result.properties.Title.rich_text[0].plain_text}
              </div>
            </div>
          );
        })}
      </section>
      <section id="project_title">
        <Typography
          variant="h4"
          gutterBottom
          fontWeight="700"
          sx={{ paddingTop: 3 }}
          align="center"
        >
          <strong>項目總覽</strong>
        </Typography>
      </section>
      <section id="project_content">
        {/* <GCHHKGird
          appliedStyle="gchhkgrid2"
          itemStyle="squarelight"
          resultList={props.posts}
        /> */}
      </section>
      <section id="recycle_kpi_title">
        <Typography
          variant="h4"
          gutterBottom
          fontWeight="700"
          sx={{ paddingTop: 3 }}
          align="center"
        >
          <strong>項目回收總數</strong>
        </Typography>
      </section>
      <section id="recycle_kpi_content">
        {/* <GCHHKGird
          appliedStyle="gchhkgrid3"
          itemStyle="squaredark"
          resultList={props.recycle}
        /> */}
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

export default Home;
