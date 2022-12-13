import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import { ParsedUrlQuery } from "querystring";
import { getEventsByProjectCode, projects, blocks } from "../../lib/notion";
import EventBanner from "../../components/EventBanner";
import Link from "next/link";
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

interface IParams extends ParsedUrlQuery {
  id: string;
}

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
    icon: <ShareOutlinedIcon sx={{ color: "#ffffff" }} />,
    name: "分享主頁",
    key: "share",
  },
];

const actionSize = {
  width: 50,
  height: 50,
  backgroundColor: "#9926B8",
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  let { id } = ctx.params as IParams;
  // Get the dynamic id
  let page_result = await getEventsByProjectCode(id);
  let pageResult = JSON.parse(JSON.stringify(page_result));

  // Fetch the post

  return {
    props: {
      id,
      post: pageResult,
      blocks: pageResult,
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
  let resultList = post.results;
  let isEmpty = Object.keys(resultList).length === 0;

  if (isEmpty) {
    Router.back();
    return <div></div>;
  }
  return (
    <Layout>
      <section className={styles.banner} id="home">
        <HeroBanner
          resultConfig={{
            imageUrl:
              "https://images.unsplash.com/photo-1563770660941-20978e870e26?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=3600",
            title: post.id,
          }}
          showButton="false"
          handleClick={console.log("")}
        />
      </section>
      <section id="project_content"></section>
      <section id="event_content">
        <div className="gchhkgrid1">
          {resultList.forEach((resultItem: any) => {
            let mappedResultItem = JSON.parse(JSON.stringify(resultItem));
            console.log("Thanks for sharing: " + mappedResultItem);
            return (
              <div className={"gccard"}>
                <Link href={`/events/${resultItem.id}`}>
                  <EventBanner
                    imageUrl={
                      resultItem.properties.Gallery.rich_text[0].plain_text
                    }
                    createDate={resultItem.properties.PublishDate.date?.start}
                    title={resultItem.properties.Title.rich_text[0].plain_text}
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
            sx={actionSize}
            onClick={(e) => {
              if (action.key == "contact") {
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
