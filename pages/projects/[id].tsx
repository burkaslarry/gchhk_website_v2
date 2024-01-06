import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import {ParsedUrlQuery} from "querystring";
import {getEventsByProjectCode, getProjectByProjectCode, projects,} from "../../lib/notion";
import EventGridItem from "../../components/EventGridItem";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import Router from "next/router";
import Layout from "../../components/Layout";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import HeroBanner from "../../components/HeroBanner";
import styles from "../../styles/Home.module.css";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import FacebookIcon from "@mui/icons-material/Facebook";
import React from "react";
import {hotjar} from "react-hotjar";
import {actionSize50, CONTACT_US} from "../../lib/constant";

interface IParams extends ParsedUrlQuery {
  id: string;
}

const actions = [
  {
    icon: <HomeOutlinedIcon sx={{ color: "#ffffff" }} />,
    name: "回到主頁",
    key: "home",
    link: "",
  },
  {
    icon: <ContactMailOutlinedIcon sx={{ color: "#ffffff" }} />,
    name: CONTACT_US,
    key: "contact",
    link: "",
  },
  {
    icon: <ShareOutlinedIcon sx={{ color: "#ffffff" }} />,
    name: "分享主頁",
    key: "share",
    link: "",
  },
  {
    icon: <FacebookIcon sx={{ color: "#ffffff" }} />,
    name: "臉書專頁",
    key: "socialpage",
    link: "",
  },
];

export const getStaticProps: GetStaticProps = async (ctx) => {
  let { id } = ctx.params as IParams;
  // Get the dynamic id

  let projectresult = await getProjectByProjectCode(id);
  let projectResult = JSON.parse(JSON.stringify(projectresult));

  let page_result = await getEventsByProjectCode(id);

  return {
    props: {
      id,
      post: projectResult,
      blocks: page_result,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  let { results } = await projects();
  // Get all posts
  return {
    paths: results.map((post) => {
      // Go through every post
      let pageResult = JSON.parse(JSON.stringify(post));
      return {
        params: {
          // set a params object with an id in it
          id: pageResult.properties.ProjectCode.title[0].plain_text,
        },
      };
    }),
    fallback: false,
  };
};

interface Props {
  id: string;
  post: any;
  blocks: [any];
}

const ProjectList: NextPage<Props> = ({ id, post, blocks }) => {
  let projectResultList = post.results;
  let projectResultFirst = projectResultList[0];
  let resultList = blocks;
  let projectContent =
    projectResultFirst.properties.Content.rich_text[0].plain_text;
  React.useEffect(() => {
    // Initialise Hotjar only client side
    hotjar.initialize(3287549, 6);
    hotjar.stateChange(
      projectResultFirst.properties.LongName.rich_text[0].plain_text
    );
  }, []);

  return (
    <Layout>
      <section className={styles.banner} id="home">
        <HeroBanner
          resultConfig={{
            imageUrl: "https://i.imgur.com/p9E5i02.png",
            title:
              projectResultFirst.properties.LongName.rich_text[0].plain_text,
          }}
          showButton="false"
          facebookLink={""}
          igLink={""}
          handleClick={console.log("")}
        />
      </section>
      <section
        id="project_content"
        style={{ display: projectContent.length > 0 ? "block" : "none" }}
      >
        <div className="gchhkgrid2">
          <Typography variant="h6">{projectContent}</Typography>
        </div>
      </section>
      <section id="event_content">
        <div className="cards">
          {resultList.map((result, index) => {
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
            "&:hover": { backgroundColor: "#9926B8" },
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
            sx={actionSize50}
            onClick={(e) => {
              if (action.key == "socialpage") {
                let pMarks =
                  projectResultFirst.properties.SocialPageLink.rich_text[0]
                    .plain_text;
                let result =
                  pMarks != "" || pMarks !== undefined ? pMarks : "/";
                Router.push({
                  pathname: result,
                });
              } else if (action.key == "contact") {
                Router.push({
                  pathname: "/",
                  query: { action: "contact" },
                });
              } else if (action.key == "home") {
                Router.back();
              } else if (action.key == "share") {
                // Check for Web Share api support
                if (navigator.share) {
                  // Browser supports native share api
                  navigator
                    .share({
                      text: "Please read this great article: ",
                      url: Router.pathname,
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

export default ProjectList;
