import { notionClient } from '@/clients/notion';
import {
  ProjectFields,
  ProjectPageSchema,
  projectQuerySchema,
} from '@/schemas/projects';

function getToday(datestring: string | number | Date) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  let date = new Date();

  if (datestring) {
    date = new Date(datestring);
  }

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  let today = `${month} ${day}, ${year}`;

  return today;
}

const getPageMetaData = (post: ProjectPageSchema): ProjectFields => {
  const coverType = post.cover.type;
  let coverUrl: string;
  switch (coverType) {
    case 'external':
      coverUrl = post.cover.external.url;
      break;
    case 'file':
      coverUrl = post.cover.file.url;
      break;
    case 'url':
      coverUrl = '';
      break; // this case is to make TS happy; it will never be returned by the Notion API :)
  }
  return {
    id: post.id,
    title: post.properties.Name.title[0].plain_text,
    description: post.properties.Description?.rich_text[0]?.plain_text ?? null,
    author: post.properties.Author.people[0].name ?? null,
    slug: post.properties.slug.url,
    coverUrl,
    publishedDate: post.properties['Publish Date'].date?.start ?? null,
    editedDate: post.properties['Last edited time'].last_edited_time,
  };
};

export const getAllPublishedProjects = async (): Promise<ProjectFields[]> => {
  const posts = await notionClient.databases
    .query({
      database_id: process.env.NOTION_PROJECTS_DATABASE_ID,
      filter: {
        and: [
          {
            property: 'Published',
            checkbox: {
              equals: true,
            },
          },
          {
            property: 'Name',
            title: {
              is_not_empty: true,
            },
          },
        ],
      },
    })
    .then(published => projectQuerySchema.parse(published));

  return posts.results.map(post => getPageMetaData(post));
};

export const addHyphensToUUID = (input: string): string | boolean => {
  // Notion returns the url form of the id of various assets as a string without hyphens; use Regex to fix it
  if (input.length === 32) {
    return input.replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5');
  }

  return false;
};
