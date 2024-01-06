require("dotenv");
import {Client, LogLevel} from "@notionhq/client";

const client = new Client({
  auth: process.env.NOTION_API_KEY,
  logLevel: LogLevel.DEBUG,
});

// Retrieve events from the Notion database
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

// Retrieve events by project code from the Notion database
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

  return myPosts.results;
}

// Retrieve a project by project code from the Notion database
async function getProjectByProjectCode(projCode: string) {
  const myPosts = await client.databases.query({
    database_id: `${process.env.NOTION_PROJECT_TABLE_KEY}`,
    filter: {
      and: [
        {
          property: "ProjectCode",
          title: {
            contains: projCode,
          },
        },
      ],
    },
  });

  return myPosts;
}

// Retrieve an event by ID from the Notion database
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

// Retrieve projects from the Notion database
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

// Retrieve a project by page ID from the Notion database
async function getProject(pageIId: string) {
  return await client.pages.retrieve({
    page_id: pageIId,
  });
}

// Retrieve recycle items from the Notion database
async function getRecycle() {
  const myPosts = await client.databases.query({
    database_id: `${process.env.NOTION_RECYCLEKPI_TABLE_KEY}`,
  });
  return myPosts.results;
}

// Retrieve blocks of a given block ID from the Notion database
async function blocks(blockId: string) {
  try {
    const myBlocks = await client.blocks.children.list({
      block_id: blockId,
    });

    return myBlocks;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Retrieve posts from the Notion database
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

// Retrieve projects from the Notion database
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
  getProjectByProjectCode,
  getProject,
  getProjects,
  blocks,
  posts,
  projects,
};
