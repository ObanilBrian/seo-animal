import Head from "next/head";
import Image from "next/image";

import Papa from "papaparse";
import { useEffect, useState } from "react";
import request from "request";
import Sidebar from "../components/Sidebar";

import styles from "../styles/Home.module.css";

const ANIMAL_GS_LINK =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQt1K2h_Jf5Os6z8uz9RqE2lR8OF5om3WVj7uqVWP7PxxLhpGnBlLfCaa9Nst7cvCqwzjiW0xy7wL5O/pub?gid=0&single=true&output=csv";

const PAPAPARSE_OPTIONS = {
  download: true,
  header: true,
  delimiter: ",",
};

function Home() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    Papa.parse("https://docs.google.com/spreadsheets/d/e/2PACX-1vQt1K2h_Jf5Os6z8uz9RqE2lR8OF5om3WVj7uqVWP7PxxLhpGnBlLfCaa9Nst7cvCqwzjiW0xy7wL5O/pub?gid=0&single=true&output=csv", {
      download: true,
      header: true,
      delimiter: ",",
      complete: (results) => {
        setAnimals(results.data)
      }
    })
  }, [])

  return (
    <>
      <Sidebar animals={animals} />
      <div className={styles.container}>
        <Head>
          <title>Animals</title>
          <meta name="description" content="Sample App only" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <a href="https://nextjs.org">Next.js!</a>
          </h1>

          <p className={styles.description}>
            Get started by editing{" "}
            <code className={styles.code}>pages/index.js</code>
          </p>

          <div className={styles.grid}>
            <a href="https://nextjs.org/docs" className={styles.card}>
              <h2>Documentation &rarr;</h2>
              <p>Find in-depth information about Next.js features and API.</p>
            </a>

            <a href="https://nextjs.org/learn" className={styles.card}>
              <h2>Learn &rarr;</h2>
              <p>Learn about Next.js in an interactive course with quizzes!</p>
            </a>

            <a
              href="https://github.com/vercel/next.js/tree/canary/examples"
              className={styles.card}
            >
              <h2>Examples &rarr;</h2>
              <p>Discover and deploy boilerplate example Next.js projects.</p>
            </a>

            <a
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className={styles.card}
            >
              <h2>Deploy &rarr;</h2>
              <p>
                Instantly deploy your Next.js site to a public URL with Vercel.
              </p>
            </a>
          </div>
        </main>

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <span className={styles.logo}>
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
              />
            </span>
          </a>
        </footer>
      </div>
    </>
  );
}

export default Home;