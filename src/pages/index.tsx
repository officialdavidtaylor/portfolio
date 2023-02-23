import { getAllPublishedProjects } from "@/lib/utils";
import { ProjectFields } from "@/schemas/projects";
import Head from "next/head";
import Link from "next/link";

export default function Home({ projects }: { projects: ProjectFields[] }) {
  return (
    <>
      <Head>
        <title>Home • My Portfolio Site</title>
        <meta
          name="description"
          content="This is the personal portfolio of David Taylor."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Heading</h1>
        <p>This is my portfolio :D</p>
        {projects.map((project, index) => (
          <section key={index}>
            <div>
              <h2>
                <Link href={`projects/${project.slug}`}>{project.title}</Link>
              </h2>
              <p>Author: {project.author}</p>
            </div>
            {project.editedDate && (
              <div>
                <p>
                  Last edited on{" "}
                  {new Date(project.editedDate).toLocaleDateString()}
                </p>
              </div>
            )}
            {project?.description && <p>{project.description}</p>}
            <div className="m-6 overflow-hidden rounded-3xl">
              <img src={project.coverUrl ?? ""} alt="image alt text" />
            </div>
          </section>
        ))}
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  const projects = await getAllPublishedProjects();

  return {
    props: {
      projects,
    },
    revalidate: 60,
  };
};
