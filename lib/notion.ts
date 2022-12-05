require("dotenv");
import { Client, APIErrorCode } from "@notionhq/client";

const client = new Client({
  auth: process.env.NOTION_API_KEY,
});

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

async function getEventsByProjectCode(projCode: string) {
  const myPosts = await client.databases.query({
    database_id: `${process.env.NOTION_EVENT_TABLE_KEY}`,
    filter: {
      and: [
        {
          property: "ProjectCode",
          title: {
            contains: projCode,
          },
        },
        {
          property: "Gallery",
          rich_text: {
            is_not_empty: true,
          },
        },
      ],
    },
    sorts: [{ property: "PublishDate", direction: "descending" }],
  });

  return myPosts;
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

async function getProject(pageIId: string) {
  const myPost = await client.pages.retrieve({
    page_id: pageIId,
  });
  return myPost;
}

async function getRecycle() {
  const myPosts = await client.databases.query({
    database_id: `${process.env.NOTION_RECYCLEKPI_TABLE_KEY}`,
  });
  return myPosts.results;
}

async function blocks(blockId: string) {
  try {
    const myBlocks = await client.blocks.children.list({
      block_id: blockId,
    });

    return myBlocks;
  } catch (error) {
    console.error(error);
  }
}

async function posts() {
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
  return myPosts;
}

async function projects() {
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
  return myPosts;
}

export {
  getRecycle,
  getEvent,
  getEvents,
  getEventsByProjectCode,
  getProject,
  getProjects,
  blocks,
  posts,
  projects,
};
