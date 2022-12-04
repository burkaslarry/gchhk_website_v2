import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import { getProject, blocks, posts } from "../../lib/notion";
import styles from "../../styles/Home.module.css";

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
  let { results } = await blocks(id);
  // Get the children
  return {
    props: {
      id,
      post: page_result,
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
      return <h1>{block["heading_1"].text[0].plain_text} </h1>;
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
      return <p>{block["paragraph"].text[0]?.text?.content} </p>;
    default:
      // For an extra type
      return <p>Undefined type </p>;
  }
};

const EventPage: NextPage<Props> = ({ id, post, blocks }) => {
  console.log("selected block: " + JSON.stringify(blocks));

  return (
    <div className={styles.blogPageHolder}>
      <Head>
        <title>{post.properties.Name.title[0].plain_text}</title>
      </Head>
      <div className={styles.blogPageNav}>
        <nav>
          <Link href="/">Home</Link>
        </nav>
      </div>
      {blocks.map((block, index) => {
        return (
          <div key={index} className={styles.blogPageContent}>
            {renderBlock(block)}
          </div>
        );
      })}
    </div>
  );
};

export default EventPage;
