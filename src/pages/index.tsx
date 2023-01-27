import Head from "next/head";

export default function Home() {
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
      </main>
    </>
  );
}
