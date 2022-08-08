import Head from "next/head";
import Image from "next/image";

import Papa from "papaparse";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

import styles from "../styles/Animal.module.css";

function Animal() {
  const [animals, setAnimals] = useState([]);
  const [currentAnimal, setCurrentAnimal] = useState({});

  useEffect(() => {
    Papa.parse("https://docs.google.com/spreadsheets/d/e/2PACX-1vQt1K2h_Jf5Os6z8uz9RqE2lR8OF5om3WVj7uqVWP7PxxLhpGnBlLfCaa9Nst7cvCqwzjiW0xy7wL5O/pub?gid=0&single=true&output=csv", {
      download: true,
      header: true,
      delimiter: ",",
      complete: (results) => {
        setAnimals(results.data)
        setCurrentAnimal(results.data.find(animal => window.location.pathname.includes(animal.slug)))
      }
    })
  })

  const title = `Animals - ${currentAnimal.name}`;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={`This is a page for ${currentAnimal.name}`} />
      </Head>
      <Sidebar animals={animals} />
      <div className={styles.container}>
        {currentAnimal.picture && <Image
          src={currentAnimal.picture}
          alt={`Image of ${currentAnimal.name}`}
          width={currentAnimal.width}
          height={currentAnimal.height}
        />}
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

