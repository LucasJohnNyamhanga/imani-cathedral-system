import React, { useContext, useEffect } from "react";
import { NavContext } from "../../components/context/StateContext";
import axios from "axios";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import styles from "../../styles/bible.module.scss";
import Link from "next/link";

export const getStaticProps: GetStaticProps = async () => {
  const API_KEY = process.env.BIBLE_API_KEY;
  const url =
    "https://api.scripture.api.bible/v1/bibles/611f8eb23aec8f13-01/books";
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navActive]);

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        {bible.map((kitabu: bibliaType, index: number) => (
          <div key={index}>
            {index === 0 && (
              <div>
                <h2 className={styles.header}>Agano La Kale</h2>
              </div>
            )}
            {index === 39 && (
              <div>
                <h2 className={styles.header}>Agano Jipya</h2>
              </div>
            )}
            <div className={styles.kitabuHolder}>
              <Link
                href={`/SomaBiblia/Kitabu/${kitabu.id}`}
                className={styles.kitabu}
                key={kitabu.id}
              >
                {kitabu.nameLong}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SomaBiblia;
