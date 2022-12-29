import type { NextPage } from "next";
import Link from "next/link";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { Box, Container } from "@mui/system";
import Layout from "../components/Layout";
import ContactUs from "../components/ContactUs";
import HeroBanner from "../components/HeroBanner";
import EventGridItem from "../components/EventGridItem";
import styles from "../styles/Home.module.css";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { getEvents } from "../lib/notion";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import Router from "next/router";
import React from "react";
import { hotjar } from "react-hotjar";

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
    icon: (
      <Link href="/about">
        <Diversity2Icon sx={{ color: "#ffffff" }} />,
      </Link>
    ),
    name: "關於我們",
    key: "aboutus",
  },
  {
    icon: <ShareOutlinedIcon sx={{ color: "#ffffff" }} />,
    name: "分享主頁",
    key: "share",
  },
];

const actionSize = {
  width: 54,
  height: 54,
  backgroundColor: "#9926B8",
};

const heroResult = {
  imageUrl:
    "https://images.unsplash.com/photo-1563770660941-20978e870e26?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=3600",
  title: "機構活動一覽",
  subtitle: "",
};

export async function getServerSideProps() {
  let results = await getEvents();

  // Return the result
  return {
    props: {
      eventList: results,
    },
  };
}

interface Props {
  eventList: [any];
}

const handleAboutClick = (event: React.MouseEvent<HTMLButtonElement>) => {};

const Home: NextPage<Props> = (props) => {
  React.useEffect(() => {
    // Initialise Hotjar only client side
    hotjar.initialize(3287549, 6);
    hotjar.stateChange("機構活動一覽");
  }, []);

  return (
    <Layout>
      <section className={styles.banner} id="home">
        <HeroBanner
          resultConfig={heroResult}
          showButton="true"
          facebookLink=""
          igLink=""
          handleClick={handleAboutClick}
        />
      </section>
      <section id="event_content">
        <div className="cards">
          {props.eventList.map((result, index) => {
            return (
              <div className="" key={index}>
                <Link href={`/events/${result.id}`}>
                  <EventGridItem
                    imageUrl={result.properties.Gallery.rich_text[0].plain_text}
                    title={result.properties.Title.rich_text[0].plain_text}
                    subtitle=""
                    type="cover"
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <section id="contact">
        <Box sx={{ width: "100%" }}>
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
            backgroundColor: "#9926B8",
            color: "white",
            width: 64,
            height: 64,
            "& .MuiSpeedDialIcon-icon": { fontSize: 32 },
            "&:hover": { backgroundColor: "#6A1AA8" },
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
              } else if (action.key == "aboutus") {
                Router.push({
                  pathname: "/about",
                });
              } else if (action.key == "share") {
                // Check for Web Share api support
                if (navigator.share) {
                  // Browser supports native share api
                  navigator
                    .share({
                      text: "草根文化館致力促進教育、保護環境、救助貧困",
                      url: window.location.href,
                    })
                    .then(() => {})
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
