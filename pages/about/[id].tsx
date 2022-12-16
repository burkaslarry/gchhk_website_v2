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
import TermsSection from "../../components/TermsSection";
import Router from "next/router";
import Typography from "@mui/material/Typography";

interface IParams extends ParsedUrlQuery {
  id: string;
}

interface Props {
  id: string;
  termsTitle: string;
  termsContent: string;
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
];

const actionSize = {
  width: 50,
  height: 50,
  backgroundColor: "#9926B8",
};

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
      },
    };
  }
  var paragraphBlockList = [];
  for (const variable of results) {
    if (variable.type == "paragraph") {
      let text = variable["paragraph"].rich_text[0]?.text?.content;
      paragraphBlockList.push(text);
    }
  }

  return {
    props: {
      id,
      termsTitle: paragraphBlockList[0],
      termsContent: paragraphBlockList[1],
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  let { results } = (await blocks("7c64e3eb9d894ec789eeacbc3492cf02")) as any;

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

const renderBlock = (block: any) => {
  console.log("block : " + JSON.stringify(block));
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
    default:
      // For an extra type
      return <p></p>;
  }
};

const AboutDetailPage: NextPage<Props> = ({ id, termsTitle, termsContent }) => {
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
            title={termsContent}
            content={termsContent}
          />
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

export default AboutDetailPage;
