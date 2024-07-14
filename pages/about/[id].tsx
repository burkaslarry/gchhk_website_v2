import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { blocks } from "../../lib/notion";
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
import { hotjar } from "react-hotjar";
import Box from "@mui/material/Box";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import {
    actionSize50,
    COLOR_WHITE,
    ACTION_HOME,
    SHARE_NOT_SUPPORTED,
    TOOLTIP_CONTACT,
    PARAGRAPH,
    HEADING_1,
    HEADING_2,
    HEADING_3,
    LINK_TO_PAGE,
    HOTJAR_ID,
    HOTJAR_VERSION,
    DOWNLOAD_TEXT,
    MENU_LABEL,
    COLOR_PRIMARY, BANNER_IMAGE_URL
} from "../../lib/constant";
import {FILE} from "node:dns";
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
    icon: <HomeOutlinedIcon sx={{ color: COLOR_WHITE }} />,
    name: ACTION_HOME,
    key: "home",
  },
  {
    icon: <ContactMailOutlinedIcon sx={{ color: COLOR_WHITE }} />,
    name: TOOLTIP_CONTACT,
    key: "contact",
  },
];

export const getStaticProps: GetStaticProps = async (ctx) => {
  let { id } = ctx.params as IParams;
  let { results } = (await blocks(id)) as any;
  let pageResult = JSON.parse(JSON.stringify(results));

  if (pageResult === undefined) {
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
    switch (variable.type) {
      case PARAGRAPH:
        if (variable[PARAGRAPH]?.rich_text?.[0]?.text?.content) {
          paragraphBlockString = variable[PARAGRAPH].rich_text[0].text.content;
        }
        break;
      case FILE:
        targetFilePDFLink = variable[FILE].external.url;
        break;
      case HEADING_1:
      case HEADING_2:
      case HEADING_3:
        paragraphTitle = variable[variable.type].rich_text[0].plain_text;
        break;
      default:
        break;
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
  var termsBlockList: string[] = [];

  for (const variable of results) {
    if (variable.type === LINK_TO_PAGE) {
      let text = variable[LINK_TO_PAGE].page_id;
      termsBlockList.push(text);
    }
  }

  return {
    paths: termsBlockList.map((post) => {
      return {
        params: { id: post },
      };
    }),
    fallback: false,
  };
};

const AboutDetailPage: NextPage<Props> = ({ id, termsTitle, termsContent, fileLink }) => {
  React.useEffect(() => {
    hotjar.initialize(HOTJAR_ID, HOTJAR_VERSION);
    hotjar.stateChange(termsTitle);
  }, [termsTitle]);

  return (
      <Layout>
        <section className={styles.banner} id="home">
          <HeroBanner
              resultConfig={{
                imageUrl: BANNER_IMAGE_URL,
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
                <Link href={fileLink}>{DOWNLOAD_TEXT}</Link>
            )}
          </Box>
        </section>
        <SpeedDial
            ariaLabel={MENU_LABEL}
            sx={{
              position: "fixed",
              bottom: 24,
              right: 24,
              "& .MuiFab-primary": {
                backgroundColor: COLOR_PRIMARY,
                color: "white",
                width: 64,
                height: 64,
                "& .MuiSpeedDialIcon-icon": { fontSize: 32 },
                "&:hover": { backgroundColor: COLOR_PRIMARY },
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
                  onClick={() => {
                    if (action.key === "contact") {
                      if (typeof window === "undefined") return null;
                      Router.push({
                        pathname: "/",
                        query: { action: "contact" },
                      });
                    } else if (action.key === "home") {
                      if (typeof window === "undefined") return null;
                      Router.back();
                    } else if (action.key === "share") {
                      if (navigator.share) {
                        navigator
                            .share({
                              text: "草根文化館致力促進教育、保護環境、救助貧困",
                              url: Router.pathname,
                            })
                            .then(() => {
                              console.log("Thanks for sharing!");
                            })
                            .catch((err) => {
                              console.error(err);
                              alert(SHARE_NOT_SUPPORTED);
                            });
                      } else {
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
