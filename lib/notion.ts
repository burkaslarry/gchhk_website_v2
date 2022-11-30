require("dotenv");
import { Client } from "@notionhq/client";

const client = new Client({
  auth: process.env.NOTION_API_KEY,
});

async function getPosts() {
  const myPosts = await client.databases.query({
    database_id: `${process.env.NOTION_EVENT_TABLE_KEY}`,
  });
  return myPosts;
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

export { getPost, getPosts, blocks, getRecycle, getEvent, getEvents };
