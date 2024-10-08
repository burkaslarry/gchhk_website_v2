import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import {ParsedUrlQuery} from "querystring";
import {blocks} from "../../lib/notion";
import styles from "../../styles/Home.module.css";
import Layout from "../../components/Layout";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import HeroBanner from "../../components/HeroBanner";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import TermsSection from "../../components/TermsSection";
import Router from "next/router";
import React from "react";
import {hotjar} from "react-hotjar";
import Box from "@mui/material/Box";
import Link from "next/link";
import {Analytics} from "@vercel/analytics/react";
import {actionSize50, CONTACT_US, SHARE_NOT_SUPPORTED} from "../../lib/constant";

require("dotenv");

interface IParams extends ParsedUrlQuery {
  id: string;
}

interface Props {
  id: string;
  termsTitle: string;
  termsContent: string;
  fileLink: string;
}

const actions = [
  {
    icon: <HomeOutlinedIcon sx={{ color: "#ffffff" }} />,
    name: "回到主頁",
    key: "home",
  },
  {
    icon: <ContactMailOutlinedIcon sx={{ color: "#ffffff" }} />,
    name: CONTACT_US,
    key: "contact",
  },
];


export const getStaticProps: GetStaticProps = async (ctx) => {
  let { id } = ctx.params as IParams;
  // Get the dynamic id
  let { results } = (await blocks(id)) as any;
  let pageResult = JSON.parse(JSON.stringify(results));

  if (pageResult === undefined) {
    console.log("go 1");
    return {
      props: {
        id,
        termsTitle: "",
        termsContent: "",
        fileLink: "",
      },
    };
  }

  var paragraphTitle = "";
  var paragraphBlockString = "";
  var targetFilePDFLink = "";
  for (const variable of results) {
    console.log("block: " + JSON.stringify(variable))
    if (variable.type == "paragraph") {
      if (variable["paragraph"]?.rich_text?.[0]?.text?.content) {
        paragraphBlockString = variable["paragraph"].rich_text[0].text.content;
      }
    } else if (variable.type == "file") {
      targetFilePDFLink = variable["file"].external.url;
    } else if (variable.type == "heading_1") {
      paragraphTitle = variable["heading_1"].rich_text[0].plain_text;
    } else if (variable.type == "heading_2") {
      paragraphTitle = variable["heading_2"].rich_text[0].plain_text;
    } else if (variable.type == "heading_3") {
      paragraphTitle = variable["heading_3"].rich_text[0].plain_text;
    }
  }


  return {
    props: {
      id,
      termsTitle: paragraphTitle,
      termsContent: paragraphBlockString,
      fileLink: targetFilePDFLink,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  let { results } = (await blocks(`${process.env.ABOUT_PAGE_ID}`)) as any;

  // Get the children
  var termsBlockList: string[] = [];
  for (const variable of results) {
    // code block to be executed
    if (variable.type == "link_to_page") {
      let text = variable["link_to_page"].page_id;
      termsBlockList.push(text);
    }
  }

  return {
    paths: termsBlockList.map((post) => {
      // Go through every post
      return {
        params: {
          // set a params object with an id in it
          id: post,
        },
      };
    }),
    fallback: false,
  };
};
const AboutDetailPage: NextPage<Props> = ({
  id,
  termsTitle,
  termsContent,
  fileLink,
}) => {
  React.useEffect(() => {
    // Initialise Hotjar only client side
    hotjar.initialize(3287549, 6);
    hotjar.stateChange(termsTitle);
  }, []);

  return (
    <Layout>
      <section className={styles.banner} id="home">
        <HeroBanner
          resultConfig={{
            imageUrl: "https://i.imgur.com/p9E5i02.png",
            title: termsTitle,
            subtitle: "",
          }}
          showButton="false"
          handleClick={console.log("")}
        />
      </section>

      <section id="terms">
        <Box
          sx={{
            width: "100vw",
            height: "auto",
            minHeight: "600px",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TermsSection padding={4} title={""} content={termsContent} />


          {fileLink && fileLink.includes('http') && (
              <Link href={fileLink}>按此下載</Link>
          )}
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

export default AboutDetailPage;
