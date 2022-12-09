import type { NextPage } from "next";
import Link from "next/link";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Box from "@mui/material/Box";
import Layout from "../components/Layout";
import ContactUs from "../components/ContactUs";
import HeroBanner from "../components/HeroBanner";
import EventBanner from "../components/EventBanner";
import styles from "../styles/Home.module.css";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import FacebookIcon from "@mui/icons-material/Facebook";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import React from "react";
import { Typography } from "@mui/material";
import { getEvents, getRecycle, getProjects } from "../lib/notion";
import Container from "@mui/material/Container";
import GCHHKGird from "../components/GCHHKGird";

const actions = [
  {
    icon: (
      <Link href="/">
        <HomeOutlinedIcon sx={{ color: "#ffffff" }} />
      </Link>
    ),
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
    icon: <ShareOutlinedIcon sx={{ color: "#ffffff" }} />,
    name: "分享主頁",
    key: "share",
  },
  {
    icon: (
      <Link href="/terms">
        <GavelOutlinedIcon sx={{ color: "#ffffff" }} />
      </Link>
    ),
    name: "工作指引",
    key: "guideline",
  },
  {
    icon: (
      <Link target="_blank" href="https://www.facebook.com/JaPeiGoal">
        <FacebookIcon sx={{ color: "#ffffff" }} />
      </Link>
    ),
    name: "Facebook專頁",
    key: "facebookpage",
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

export async function getServerSideProps() {
  let results = await getEvents();
  let resultKing = await getProjects();
  let resultQueen = await getRecycle();

  // Return the result
  return {
    props: {
      eventList: results,
      project: resultKing,
      recycle: resultQueen,
    },
  };
}

interface Props {
  eventList: [any];
  project: [any];
  recycle: [any];
}

const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  const element = document.getElementById("contact");
  if (element != null) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }
};

const Home: NextPage<Props> = (props) => {
  return (
    <Layout>
      <section className={styles.banner} id="home">
        <HeroBanner
          resultConfig={heroResult}
          showButton="true"
          handleClick={handleClick}
        />
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
        <div className="gchhkgrid1">
          {props.eventList.map((result, index) => {
            return (
              <div className={""} key={index}>
                <Link href={`/events/${result.id}`}>
                  <EventBanner
                    parentStyle={"gccard"}
                    imageUrl={result.properties.Gallery.rich_text[0].plain_text}
                    createDate={result.properties.PublishDate.date?.start}
                    title={result.properties.Title.rich_text[0].plain_text}
                  />
                </Link>
              </div>
            );
          })}
        </div>
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
        <GCHHKGird resultList={props.project} type="project" />
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
        <GCHHKGird resultList={props.recycle} type="recycle" />
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
              } else if (action.key == "share") {
                // Check for Web Share api support
                if (navigator.share) {
                  // Browser supports native share api
                  navigator
                    .share({
                      text: "Please read this page: ",
                      url: window.location.href,
                    })
                    .then(() => {
                      console.log("Thanks for sharing!");
                    })
                    .catch((err) => console.error(err));
                } else {
                  // Fallback
                  alert(
                    "The current browser does not support the share function. Please, manually share the link"
                  );
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
