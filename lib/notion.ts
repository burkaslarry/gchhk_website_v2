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

async function getEvents() {
  const myPosts = await client.databases.query({
    database_id: `${process.env.NOTION_EVENT_TABLE_KEY}`,
    filter: {
      and: [
        {
          property: "Gallery",
          rich_text: {
            is_not_empty: true,
          },
        },
        {
          property: "BlogId",
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

async function getEvent(id: string) {
  const myPosts = await client.databases.query({
    database_id: `${process.env.NOTION_EVENT_TABLE_KEY}`,
    filter: {
      and: [
        {
          property: "Gallery",
          rich_text: {
            is_not_empty: true,
          },
        },
        {
          property: "BlogId",
          rich_text: {
            equals: id,
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

async function getProjects() {
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

async function getProject(id: string) {
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

  console.log("selected myBlocks: " + JSON.stringify(myBlocks));

  return myBlocks;
}

async function posts() {
  const myPosts = await client.databases.query({
    database_id: `${process.env.NOTION_EVENT_TABLE_KEY}`,
  });
  return myPosts;
}
export {
  getRecycle,
  getEvent,
  getEvents,
  getProject,
  getProjects,
  blocks,
  posts,
};
