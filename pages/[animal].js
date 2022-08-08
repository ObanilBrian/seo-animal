import Head from "next/head";
import Image from "next/image";

import Papa from "papaparse";
import request from "request";
import Sidebar from "../components/Sidebar";

import styles from "../styles/Animal.module.css";

const ANIMAL_GS_LINK =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQt1K2h_Jf5Os6z8uz9RqE2lR8OF5om3WVj7uqVWP7PxxLhpGnBlLfCaa9Nst7cvCqwzjiW0xy7wL5O/pub?gid=0&single=true&output=csv";

const PAPAPARSE_OPTIONS = {
  download: true,
  header: true,
  delimiter: ",",
};

function Animal({ animals, currentAnimal }) {

  return (
    <>
      <Head>
        <title>Animals - {currentAnimal.name}</title>
        <meta name="description" content={`This is a page for ${currentAnimal.name}`}></meta>
      </Head>
      <Sidebar animals={animals} />
      <div className={styles.container}>
        <Image
          src={currentAnimal.picture}
          alt={`Image of ${currentAnimal.name}`}
          width={currentAnimal.width}
          height={currentAnimal.height}
        />
        <h1>{currentAnimal.name}</h1>
        <div className={styles.description}>Type: {currentAnimal.type}</div>
        <div className={styles.description}>Diet: {currentAnimal.diet}</div>
        <div className={styles.description}>
          Scientific Name: {currentAnimal["scientific name"]}
        </div>
        <div className={styles.description} dangerouslySetInnerHTML={{ __html: currentAnimal.description }} />
      </div>
    </>
  );
}

export default Animal;

export async function getServerSideProps(context) {
  const animals = await new Promise((resolve, reject) => {
    const parseStream = Papa.parse(Papa.NODE_STREAM_INPUT, PAPAPARSE_OPTIONS);
    const dataStream = request.get(ANIMAL_GS_LINK).pipe(parseStream);

    let csvData = [];
    parseStream.on("data", (chunk) => {
      csvData.push(chunk);
    });

    dataStream.on("finish", () => {
      resolve(csvData);
    });

    dataStream.on("error", function (err) {
      reject(err);
    });
  });

  return {
    props: {
      animals: animals.map((animal) => ({
        name: animal.name,
        slug: animal.slug,
      })),
      currentAnimal: animals.find(
        (animal) => animal.slug === context.query.animal
      ),
    },
  };
}
