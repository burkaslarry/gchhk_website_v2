import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import { getProject, blocks, posts } from "../../lib/notion";
import styles from "../../styles/Home.module.css";
import Layout from "../../components/Layout";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import HeroBanner from "../../components/HeroBanner";

interface IParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  let { id } = ctx.params as IParams;
  // Get the dynamic id

  let page_result = await getProject(id);
  let pageResult = JSON.parse(JSON.stringify(page_result));
  // Fetch the post
  //console.log("selected pageResult: " + JSON.stringify(pageResult));

  let bloggerId = pageResult.properties.BlogId.rich_text[0].plain_text;

  let { results } = await blocks(bloggerId);

  // Get the children
  return {
    props: {
      id,
      post: pageResult,
      blocks: results,
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

interface Props {
  id: string;
  post: any;
  blocks: [any];
}

const renderBlock = (block: any) => {
  switch (block.type) {
    case "heading_1":
      // For a heading
      return <h1>{block["heading_1"].rich_text[0].plain_text} </h1>;
    case "image":
      // For an image
      let result = block["image"].external.url;
      return <Image src={result} width={650} height={400} alt="" />;
    case "bulleted_list_item":
      // For an unordered list
      return (
        <ul>
          <li>{block["bulleted_list_item"].text[0].plain_text} </li>
        </ul>
      );
    case "paragraph":
      // For a paragraph
      return <p>{block["paragraph"].rich_text[0]?.text?.content} </p>;
    default:
      // For an extra type
      return <p>Undefined type </p>;
  }
};

const EventPage: NextPage<Props> = ({ id, post, blocks }) => {
  return (
    <Layout>
      <section className={styles.banner} id="home">
        <HeroBanner
          resultConfig={{
            imageUrl: post.properties.Gallery.rich_text[0].plain_text,
            title: post.properties.Title.rich_text[0].plain_text,
            subtitle: "本會致力 \n 促進教育、保護環境、救助貧困",
          }}
          showButton="false"
          handleClick={console.log("")}
        />
      </section>

      {/* <div className={styles.blogPageHolder}>
        <Head>
          <title>{post.properties.Name.title[0].plain_text}</title>
        </Head>
        {blocks.map((block, index) => {
          console.log("selected block: " + JSON.stringify(block));

          return (
            <div key={index} className={styles.blogPageContent}>
              {renderBlock(block)}
            </div>
          );
        })}
      </div> */}
    </Layout>
  );
};

export default EventPage;
