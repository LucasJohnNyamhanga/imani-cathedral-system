import React, { useContext, useEffect } from "react";
import { NavContext } from "../../components/context/StateContext";
import axios from "axios";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import styles from "../../styles/bible.module.scss";

export const getStaticProps: GetStaticProps = async () => {
  const API_KEY = `4b99ad55013a8f3be63090fb85f7050e`;
  const url =
    "https://api.scripture.api.bible/v1/bibles/611f8eb23aec8f13-01/books?include-chapters=true&include-chapters-and-sections=true";
  const config = {
    headers: {
      "api-key": API_KEY,
    },
  };

  const data = await axios
    .get(url, config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });

  const bible = JSON.parse(JSON.stringify(data.data));

  return {
    props: { bible },
  };
};

type bibliaType = {
  abbreviation: string;
  bibleId: string;
  chapters: {
    bibleId: string;
    bookId: string;
    id: string;
    number: string;
    position: number;
  }[];
  id: string;
  name: string;
  nameLong: string;
};

const SomaBiblia = ({
  bible,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { navActive, setNavActive } = useContext(NavContext);

  useEffect(() => {
    setNavActive("Biblia");
    console.log(bible);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navActive]);

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        {bible.map((kitabu: bibliaType) => (
          <div key={kitabu.id} className={styles.kitabu}>
            {kitabu.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SomaBiblia;
