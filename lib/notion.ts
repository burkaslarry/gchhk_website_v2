require("dotenv");
import { Client } from "@notionhq/client";

const client = new Client({
  auth: process.env.NOTION_API_KEY,
});

const contentFilter = {
  and: [
    {
      property: "Title",
      rich_text: {
        is_not_empty: true,
      },
    },
  ],
};
const contentSorts = [{ property: "PublishDate", direction: "descending" }];

async function getPosts() {
  const myPosts = await client.databases.query({
    database_id: `${process.env.NOTION_EVENT_TABLE_KEY}`,
    filter: {
      and: [
        {
          property: "Gallary",
          rich_text: {
            is_not_empty: true,
          },
        },
        {
          property: "Title",
          rich_text: {
            is_not_empty: true,
          },
        },
        {
          property: "PublishDate",
          date: {
            is_not_empty: true,
          },
        },
      ],
    },
    sorts: [{ property: "PublishDate", direction: "descending" }],
  });
  return myPosts.results;
}

async function getPost(id: string) {
  const myPost = await client.pages.retrieve({
    page_id: id,
  });
  return myPost;
}

async function getEvents() {
  const myPosts = await client.databases.query({
    database_id: `${process.env.NOTION_PROJECT_TABLE_KEY}`,
    filter: {
      and: [
        {
          property: "LongName",
          rich_text: {
            is_not_empty: true,
          },
        },
      ],
    },
  });
  return myPosts.results;
}

async function getEvent(id: string) {
  const myPost = await client.pages.retrieve({
    page_id: id,
  });
  return myPost;
}

async function getRecycle() {
  const myPosts = await client.databases.query({
    database_id: `${process.env.NOTION_RECYCLEKPI_TABLE_KEY}`,
  });
  return myPosts.results;
}

async function blocks(id: string) {
  const myBlocks = await client.blocks.children.list({
    block_id: id,
  });
  return myBlocks;
}

async function posts() {
  const myPosts = await client.databases.query({
    database_id: `${process.env.NOTION_DATABASE}`,
  });
  return myPosts;
}

async function post(id: string) {
  const myPost = await client.pages.retrieve({
    page_id: id,
  });
  return myPost;
}

export {
  getPost,
  getPosts,
  blocks,
  getRecycle,
  getEvent,
  getEvents,
  posts,
  post,
};
