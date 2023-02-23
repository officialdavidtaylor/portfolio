import z from 'zod';

const projectFieldSchema = z.object({
  Name: z.object({
    type: z.literal('title'),
    title: z
      .array(z.object({ type: z.literal('text'), plain_text: z.string() }))
      .length(1),
  }),
  Description: z.optional(
    z.object({
      type: z.literal('rich_text'),
      rich_text: z.array(
        z.optional(
          z.object({ type: z.literal('text'), plain_text: z.string() })
        )
      ),
    })
  ),
  Author: z.object({
    type: z.literal('people'),
    people: z.array(
      z.object({
        type: z.literal('person'),
        name: z.string(),
      })
    ),
  }),
  slug: z.object({ type: z.literal('url'), url: z.string() }),
  Tags: z.object({}),
  'Publish Date': z.object({
    type: z.literal('date'),
    date: z
      .object({
        start: z.string().datetime({ offset: true }),
      })
      .or(z.null()),
  }),
  'Last edited time': z.object({
    type: z.literal('last_edited_time'),
    last_edited_time: z.string().datetime(),
  }),
  Published: z.object({
    type: z.literal('checkbox'),
    checkbox: z.literal(true),
  }),
});

const projectFields = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  author: z.string().nullable(),
  slug: z.string(),
  coverUrl: z.string().nullable(),
  publishedDate: z.string().datetime().nullable(),
  editedDate: z.string().datetime().nullable(),
});

export const projectPageSchema = z.object({
  object: z.literal('page'),
  id: z.string().uuid(),
  created_time: z.string().datetime(),
  last_edited_time: z.string().datetime(),
  created_by: z.object({
    id: z.string(),
  }),
  last_edited_by: z.object({
    id: z.string(),
  }),
  cover: z.discriminatedUnion('type', [
    z.object({
      type: z.literal('external'),
      external: z.object({
        url: z.string().url(),
      }),
    }),
    z.object({
      type: z.literal('file'),
      file: z.object({ url: z.string().url() }),
    }),
    z.object({ type: z.literal('url'), url: z.string() }),
  ]),
  icon: z
    .object({
      emoji: z.string(),
      type: z.literal('emoji'),
    })
    .or(z.null()),

  archived: z.boolean(),
  properties: projectFieldSchema,
  url: z.string().url(),
});

export const projectQuerySchema = z.object({
  object: z.literal('list'),
  results: z.array(projectPageSchema),
  has_more: z.boolean(),
  type: z.literal('page'),
  page: z.object({}),
});

export type ProjectFields = z.infer<typeof projectFields>;
export type ProjectPageSchema = z.infer<typeof projectPageSchema>;
export type ProjectQueryResults = z.infer<typeof projectQuerySchema>;
