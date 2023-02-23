/* eslint-disable @next/next/no-img-element */
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getAllPublishedProjects } from '@/lib/utils';
import { ProjectFields } from '@/schemas/projects';
import Head from 'next/head';
import Link from 'next/link';

export default function Home({ projects }: { projects: ProjectFields[] }) {
  return (
    <>
      <Head>
        <title>Home • My Portfolio Site</title>
        <meta
          name="description"
          content="This is the personal portfolio of David Taylor."
        />
        <meta name="theme-color" content="#101010" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className="flex w-screen flex-col items-center justify-center overscroll-none">
        <section
          id="landing-screen"
          className="flex h-screen w-full max-w-7xl flex-col px-4"
        >
          <h1 className="mt-auto mb-8 font-heading text-8xl font-bold text-teal">
            David Taylor
          </h1>
          <p className="pb-32 text-gray lg:pb-10">
            {"Join me in an exploration of various projects I've worked on!"}
          </p>
        </section>
        <section id="project-container" className="mb-10 w-full max-w-7xl">
          <h2 className="px-4 pb-10 font-heading text-3xl font-semibold text-teal">
            Posts
          </h2>
          <div
            id="project-cards"
            className="flex snap-x snap-mandatory gap-4 overflow-auto px-4"
          >
            {projects.map((project, index) => (
              <div
                key={index}
                id={project.title}
                className="max-w-sm flex-1 flex-shrink-0 basis-72 snap-center"
              >
                <Link href={`projects/${project.slug}`}>
                  <div className="max-h-40 overflow-hidden rounded-t-xl">
                    <img src={project.coverUrl ?? ''} alt="image alt text" />
                  </div>
                  <div className="rounded-b-xl bg-[#4B4E6D] p-4">
                    <div>
                      <h2 className="mb-2 font-heading text-xl font-semibold text-white">
                        {project.title}
                      </h2>
                    </div>
                    {project?.description && (
                      <p className="text-gray">{project.description}</p>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
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
