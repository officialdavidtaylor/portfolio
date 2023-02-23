import { Client } from '@notionhq/client';
/**
 * This client has read-only permissions to my Notion workspace
 */
export const notionClient = new Client({
  auth: process.env.NOTION_AUTH_TOKEN,
});
