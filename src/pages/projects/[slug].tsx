import { getAllPublishedProjects } from '@/lib/utils';
import { GetStaticPropsContext } from 'next';
import { notionClient } from '@/clients/notion';
import { NotionToMarkdown } from 'notion-to-md';
import { ProjectFields } from '@/schemas/projects';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Post = ({
  project,
  markdown,
}: {
  project: ProjectFields;
  markdown: string;
}) => {
  const lastEdited = project.editedDate
    ? new Date(project.editedDate).toLocaleDateString()
    : null;
  return (
    <>
      <Header />
      <main className="flex justify-center px-4 pb-8">
        <div id="post-container" className="max-w-7xl ">
          <div id="post-heading">
            <hr className="mb-4" />
            <h1 className="mb-4 font-heading text-3xl font-semibold">
              {project.title}
            </h1>
            {project.description ? (
              <p className="text-teal">{project.description}</p>
            ) : null}
            {lastEdited ? (
              <p className="text-slate-500">edited: {lastEdited}</p>
            ) : null}
            <hr className="mt-4" />
          </div>
          {/* <div id="left-gutter" className="" /> */}
          <div className="prose max-w-none py-8 prose-headings:text-teal prose-p:text-gray prose-a:text-teal prose-code:text-[#cc9999] prose-ol:text-gray prose-ul:text-gray prose-td:text-gray prose-img:rounded-2xl">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {markdown}
            </ReactMarkdown>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Post;

/*
Similarly to the blog overview page, you will be pre-rendering each post page.

In /pages/posts/[slug].js, add the getStaticProps() function after the Post component and call the getSingleBlogPostBySlug function to fetch the blog post from Notion.
*/

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const projects = await getAllPublishedProjects();
  const project = projects.find(project => project.slug === params?.slug);

  const n2m = new NotionToMarkdown({ notionClient });

  const mdBlocks = await n2m.pageToMarkdown(project?.id ?? '');
  const markdown = n2m.toMarkdownString(mdBlocks);

  // pattern to match markdown-formatted urls
  const regexMdUrls = /\[([-\w\s\d]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#]+)\)/;

  return {
    props: {
      project,
      markdown,
    },
    revalidate: 60,
  };
};

/**
 * generate a route for every project in the CMS
 */
export const getStaticPaths = async () => {
  const posts = await getAllPublishedProjects();
  const paths = posts.map(({ slug }) => ({ params: { slug } }));

  return {
    paths,
    fallback: 'blocking',
  };
};
