import type {NextPage} from "next";
import Link from "next/link";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import {Box} from "@mui/system";
import Button from "@mui/material/Button";
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
import {Typography} from "@mui/material";
import {getEvents, getProjects, getRecycle} from "../lib/notion";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import Router from "next/router";
import React from "react";
import {hotjar} from "react-hotjar";
import { Analytics } from '@vercel/analytics/react';
import {ABOUT_US, actionSize, BACK_HOME, CONTACT_US, SHARE_NOT_SUPPORTED} from "../lib/constant";

const actions = [
  {
    icon: (
      <Link href="/">
        <HomeOutlinedIcon sx={{ color: "#ffffff" }} />
      </Link>
    ),
    name: BACK_HOME,
    key: "home",
  },
  {
    icon: <ContactMailOutlinedIcon sx={{ color: "#ffffff" }} />,
    name: CONTACT_US,
    key: "contact",
  },
  {
    icon: (
      <Link href="/about">
        <Diversity2Icon sx={{ color: "#ffffff" }} />,
      </Link>
    ),
    name: ABOUT_US,
    key: "aboutus",
  },
  {
    icon: <ShareOutlinedIcon sx={{ color: "#ffffff" }} />,
    name: "分享主頁",
    key: "share",
  },
];

const heroResult = {
  imageUrl:"https://i.imgur.com/i7kskkY.jpg",
  title: "草根文化館",
  subtitle:
    "本會是一個非牟利機構，旨在促進教育、保護環境、救助貧困。秉承本會宗旨，我們就相關議題進行社區服務、培訓、研究及與這些領域上的其他群體交流合作。",
};

export async function getServerSideProps() {
  let results = await getEvents();
  let resultKing = await getProjects();
  let resultQueen = await getRecycle();

  // Return the result
  return {
    props: {
      eventList: results.slice(0,6),
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

const handleAboutClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  Router.push({
    pathname: "/about",
  });
};

const handleMoreProjectClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  Router.push({
    pathname: "/project_list",
  });
};

const handleMoreEventClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  Router.push({
    pathname: "/event_list",
  });
};

const Home: NextPage<Props> = (props) => {
  React.useEffect(() => {
    // Initialise Hotjar only client side
    hotjar.initialize(3287549, 6);
    hotjar.stateChange("主頁");
  }, []);

  return (
    <Layout>
      <section className={styles.banner} id="home">
        <HeroBanner
          resultConfig={heroResult}
          showButton="true"
          handleClick={handleAboutClick}
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
          <strong>機構活動</strong>
        </Typography>
      </section>
      <section id="event_content">
        <div className="cards">
          {props.eventList.map((result, index) => {
            console.log("eventId : " + JSON.stringify(result.id))
            console.log("event Gallery : " + JSON.stringify(result.properties.Gallery))
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
      <section id="event_more">
        <div className="cards_more_button">
          <Button
            variant="outlined"
            type="submit"
            onClick={handleMoreEventClick}
            sx={{
              color: "#9926B8",
              padding: 1,
              display: "inline",
            }}
          >
            更多活動
          </Button>
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
          <strong>機構工作</strong>
        </Typography>
      </section>
      <section id="project_content">
        <div className="cards_project">
          {props.project.map((result, index) => {
            return (
              <div className="" key={index}>
                <Link
                  href={`/projects/${result.properties.ProjectCode.title[0].plain_text}`}
                >
                  <EventGridItem
                    imageUrl=""
                    title={result.properties.LongName.rich_text[0].plain_text}
                    subtitle=""
                    type="darkgreen"
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </section>
      <section id="project_more">
        <div className="cards_more_button">
          <Button
            variant="outlined"
            type="submit"
            onClick={handleMoreProjectClick}
            sx={{
              color: "#9926B8",
              padding: 1,
              margin: 2,
              display: "inline",
            }}
          >
            更多工作
          </Button>
        </div>
      </section>
      <section id="recycle_kpi_title">
        <Typography
          variant="h4"
          gutterBottom
          fontWeight="700"
          sx={{ paddingTop: 3 }}
          align="center"
        >
          <strong>至今廚餘回收總數</strong>
        </Typography>
      </section>
      <section id="recycle_kpi_content">
        <div className="gcccardhk3">
          {props.recycle.map((result, index) => {
            return (
              <div className="" key={index}>
                <EventGridItem
                  imageUrl=""
                  title={result.properties.Title.title[0].plain_text}
                  subtitle={
                    result.properties.Number.number +
                    " " +
                    result.properties.Unit.rich_text[0].plain_text
                  }
                  type="lightgreen"
                />
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
                    .catch((err) => {
                      console.error(err)
                      alert(SHARE_NOT_SUPPORTED);
                    } );
                } else {
                  // Fallback
                    alert(SHARE_NOT_SUPPORTED);
                }
              }
            }}
          />
        ))}
      </SpeedDial>
        <Analytics />
    </Layout>
  );
};

export default Home;
