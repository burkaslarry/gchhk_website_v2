import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import {ParsedUrlQuery} from "querystring";
import {blocks, getProject, posts} from "../../lib/notion";
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
import {hotjar} from "react-hotjar";
import {Analytics} from "@vercel/analytics/react";
import {actionSize50, BACK_HOME, CONTACT_US, SHARE_NOT_SUPPORTED} from "../../lib/constant";

interface IParams extends ParsedUrlQuery {
    id: string;
}

interface Props {
    id: string;
    post: any;
    blocks: [any];
    imageGallerySet: string[];
    coverImageSet: string[];
}

const actions = [
    {
        icon: <HomeOutlinedIcon sx={{color: "#ffffff"}}/>,
        name: BACK_HOME,
        key: "home",
    },
    {
        icon: <ContactMailOutlinedIcon sx={{color: "#ffffff"}}/>,
        name: CONTACT_US,
        key: "contact",
    },
    {
        icon: <ShareOutlinedIcon sx={{color: "#ffffff"}}/>,
        name: "分享主頁",
        key: "share",
    },
];


export const getStaticProps: GetStaticProps = async (ctx) => {
    let {id} = ctx.params as IParams;
    // Get the dynamic id

    let page_result = await getProject(id);
    let pageResult = JSON.parse(JSON.stringify(page_result));
    let bloggerId = pageResult.properties.BlogId.rich_text[0].plain_text;

    let {results} = (await blocks(bloggerId)) as any;

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

    const plainText = pageResult.properties.Gallery.rich_text[0].text.content
    console.log("plainText: " + plainText);

    // Split the plain text by whitespace into an array of individual links
    const linksArray = plainText.split(" ");

    // Extract the first three links
    console.log(linksArray);
    // if (title.includes("(MSW")) {
    //   imageSet = []
    //   console.log("The title contains '(MSW'");
    // } else {
    // }
    for (const variable of linksArray) {
        imageSet.push(variable);
    }

    const uniqueArray: string[] = [];
    for (const item of imageSet) {
        if (!uniqueArray.includes(item)) {
            uniqueArray.push(item);
        }
    }

    console.log("The imageSet:" + uniqueArray);
  //imageGallerySet;
    return {
        props: {
            id,
            post: pageResult,
            blocks: results,
            imageGallerySet: uniqueArray,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    let {results} = await posts();
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
  console.log("block : " + JSON.stringify(block))

  switch (block.type) {
        case "heading_1":
            // For a heading
            return <h1>{block["heading_1"].rich_text[0].plain_text} </h1>;
        case "heading_2":
            // For a heading
            return <h2>{block["heading_2"].rich_text[0].plain_text} </h2>;
        case "heading_3":
            // For a heading
            return <h3>{block["heading_3"].rich_text[0].plain_text} </h3>;
        case "paragraph":
            // For a paragraph
            let content = block["paragraph"].rich_text[0]?.text?.content || '';

            let isBold = block["paragraph"].rich_text[0]?.annotations.bold
            if (isBold) {
                return (
                    <p>
                      <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                        {content}
                      </Typography>
                    </p>
                );
            } else {
                return (
                    <Typography variant="h6">
                        {content}
                    </Typography>
                );
            }

        case "bulleted_list_item":
            // For an unordered list
            const listItemTextBlockArray = block["bulleted_list_item"].text
            const listItemRichTextArray = block["bulleted_list_item"].rich_text;
            var displayText = ""
            if (Array.isArray(listItemTextBlockArray) && listItemTextBlockArray.length === 0) {
                // The listItemTextBlockArray is empty
                displayText = ""
            } else if (listItemTextBlockArray === undefined) {
                // The listItemTextBlockArray is undefined
                displayText = ""
            } else {
                displayText = listItemTextBlockArray[0].plain_text
                // The listItemTextBlockArray is neither empty nor undefined
            }

            if (Array.isArray(listItemRichTextArray) && listItemRichTextArray.length === 0) {
                // The listItemRichTextArray is empty
                //displayText = ""
            } else if (listItemRichTextArray === undefined) {
                // The listItemRichTextArray is undefined
            } else {
                displayText = listItemRichTextArray[0].plain_text
                // The listItemRichTextArray is neither empty nor undefined
            }

            return (
                <ul>
                    <li>{displayText}</li>
                </ul>
            );
        default:
          // For an extra type
            return <p></p>;
    }
};

const EventPage: NextPage<Props> = ({id, post, blocks, imageGallerySet}) => {
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
                    <br/>

                    {blocks.map((block, index) => {
                        return <div key={index}>{renderBlock(block)}</div>;
                    })}
                    <br/>
                    <br/>
                    <br/>
                    <br/>
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
                        "& .MuiSpeedDialIcon-icon": {fontSize: 32},
                        "&:hover": {backgroundColor: "#9926B8"},
                    },
                }}
                openIcon={<ClearOutlinedIcon/>}
                icon={<MenuOutlinedIcon/>}
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
                                    query: {action: "contact"},
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
                                        });
                                } else {
                                    // Fallback
                                    alert(SHARE_NOT_SUPPORTED);
                                }
                            }
                        }}
                    />
                ))}
            </SpeedDial>
            <Analytics/>
        </Layout>
    );
};

export default EventPage;
