import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import Layout from "../components/Layout";
import HeroBanner from "../components/HeroBanner";
import TermsSection from "../components/TermsSection";
import styles from "../styles/Home.module.css";
import React from "react";
import { Box } from "@mui/system";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Router from "next/router";
import { blocks } from "../lib/notion";
import GCHHKGird from "../components/GCHHKGird";

const actionSize = {
  width: 50,
  height: 50,
  backgroundColor: "#9926B8",
};

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
];

class MyTerms {
  //field
  displayTitle: string;
  displayPageId: string;
  //constructor
  constructor(displayTitle: string, displayPageId: string) {
    this.displayTitle = displayTitle;
    this.displayPageId = displayPageId;
  }
}

export async function getServerSideProps() {
  let { results } = (await blocks("7c64e3eb9d894ec789eeacbc3492cf02")) as any;

  // Get the children
  var paragraphBlockList = [];
  var termsBlockList: string[] = [];
  var termsBlockDetailList: MyTerms[] = [];
  for (const variable of results) {
    // code block to be executed
    if (variable.type == "paragraph") {
      let text = variable["paragraph"].rich_text[0]?.text?.content;
      paragraphBlockList.push(text);
    } else if (variable.type == "link_to_page") {
      let text = variable["link_to_page"].page_id;
      termsBlockList.push(text);
    }
  }

  if (termsBlockList.length == 3) {
    var spadeJack = new MyTerms("機構理念", termsBlockList[0]);
    var spadeQueen = new MyTerms("年報", termsBlockList[1]);
    var spadeKing = new MyTerms("平等指引", termsBlockList[2]);
    termsBlockDetailList = [spadeJack, spadeQueen, spadeKing];
  }

  // Return the result
  return {
    props: {
      aboutTitle: paragraphBlockList[0],
      aboutContent: paragraphBlockList[1],
      aboutBlocks: JSON.parse(JSON.stringify(termsBlockDetailList)),
    },
  };
}

interface Props {
  aboutTitle: [any];
  aboutContent: [any];
  aboutBlocks: [any];
}

const AboutUs: NextPage<Props> = (props) => {
  return (
    <Layout>
      {/* Hero unit */}
      <section className={styles.banner} id="home">
        <HeroBanner
          resultConfig={{
            imageUrl: "https://i.imgur.com/p9E5i02.png",
            title: "關於我們",
          }}
          showButton="false"
          facebookLink=""
          igLink=""
          handleClick={console.log("")}
        />
      </section>
      <section id="terms">
        <Box
          sx={{
            width: "100vw",
            height: "auto",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TermsSection
            padding={4}
            title={""}
            content={props.aboutTitle + "\n\n" + props.aboutContent}
          />
        </Box>
      </section>

      <section id="termsBlock">
        <GCHHKGird
          resultList={props.aboutBlocks}
          type="terms"
          masterclass={"gcccardhk3x"}
        />
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
                  query: { position: "contact" },
                });
              } else if (action.key == "home") {
                Router.push({
                  pathname: "/",
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

export default AboutUs;
