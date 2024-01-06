import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import { ParsedUrlQuery } from "querystring";
import { getProject, blocks, posts } from "../../lib/notion";
import styles from "../../styles/Home.module.css";
import Layout from "../../components/Layout";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import HeroBanner from "../../components/HeroBanner";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import Router from "next/router";
import Head from "next/head";
import Typography from "@mui/material/Typography";
import React from "react";
import { hotjar } from "react-hotjar";
import {BACK_HOME, CONTACT_US} from "../../lib/constant";

interface IParams extends ParsedUrlQuery {
  id: string;
}

interface Props {
  id: string;
  post: any;
  blocks: [any];
  imageGallerySet: string[];
}

const actions = [
  {
    icon: <HomeOutlinedIcon sx={{ color: "#ffffff" }} />,
    name: BACK_HOME,
    key: "home",
  },
  {
    icon: <ContactMailOutlinedIcon sx={{ color: "#ffffff" }} />,
    name: CONTACT_US,
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

  let page_result = await getProject(id);
  let pageResult = JSON.parse(JSON.stringify(page_result));
  let bloggerId = pageResult.properties.BlogId.rich_text[0].plain_text;

  let { results } = (await blocks(bloggerId)) as any;

  if (results === undefined) {
    return {
      props: {
        id,
        post: pageResult,
        blocks: [],
        imageGallerySet: [],
      },
    };
  }
  // Get the children

  var imageSet: string[] = [];

  for (const variable of results) {
    if (variable.type == "image") {
      let text = variable["image"].external.url;
      if (text.length > 0) {
        imageSet.push(text);
      }
    }
  }

  //imageGallerySet;
  return {
    props: {
      id,
      post: pageResult,
      blocks: results,
      imageGallerySet: imageSet,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  let { results } = await posts();
  // Get all posts

  return {
    paths: results.map((post) => {
      // Go through every post
      return {
        params: {
          // set a params object with an id in it
          id: post.id,
        },
      };
    }),
    fallback: false,
  };
};

const renderBlock = (block: any) => {
  switch (block.type) {
    case "heading_1":
      // For a heading
      return <h1>{block["heading_1"].rich_text[0].plain_text} </h1>;
    case "paragraph":
      // For a paragraph
      return (
        <Typography variant="h6">
          {block["paragraph"].rich_text[0]?.text?.content}
        </Typography>
      );
    // case "image":
    //   // For an image
    //   let result = block["image"].external.url;
    //   console.log("selected imageresul " + result);
    //   return <Image alt="" fill src={result} />;
    case "bulleted_list_item":
      // For an unordered list
      return (
        <ul>
          <li>{block["bulleted_list_item"].text[0].plain_text} </li>
        </ul>
      );
    default:
      // For an extra type
      return <p></p>;
  }
};

const EventPage: NextPage<Props> = ({ id, post, blocks, imageGallerySet }) => {
  React.useEffect(() => {
    // Initialise Hotjar only client side
    hotjar.initialize(3287549, 6);
    hotjar.stateChange(post.properties.Title.rich_text[0].plain_text);
  }, []);

  return (
    <Layout>
      <section className={styles.banner} id="home">
        <HeroBanner
          resultConfig={{
            imageUrl: post.properties.Gallery.rich_text[0].plain_text,
            title: post.properties.Title.rich_text[0].plain_text,
            subtitle: "",
          }}
          showButton="false"
          facebookLink=""
          igLink=""
          handleClick={console.log("")}
        />
      </section>
      <div className={styles.blogPageHolder}>
        <Head>
          <title>{post.properties.Name.title[0].plain_text}</title>
        </Head>
        <div>
          <br />

          {blocks.map((block, index) => {
            return <div key={index}>{renderBlock(block)}</div>;
          })}
          <br />
          <br />
          <br />
          <br />
          <div className="gcccardhk4x">
            {imageGallerySet.map((imangeLink: string, index) => {
              return (
                <div key={index} className="gcccardcanvas">
                  <a href={imangeLink}>
                    <img
                      src={imangeLink}
                      alt="Landscape picture"
                      className="imgClass"
                    />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
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
                if (typeof window === "undefined") return null;

                Router.push({
                  pathname: "/",
                  query: { action: "contact" },
                });
              } else if (action.key == "home") {
                if (typeof window === "undefined") return null;

                Router.back();
              } else if (action.key == "share") {
                // Check for Web Share api support
                if (navigator.share) {
                  // Browser supports native share api
                  navigator
                    .share({
                      text: "草根文化館致力促進教育、保護環境、救助貧困",
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

export default EventPage;
