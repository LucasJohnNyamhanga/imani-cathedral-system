import React, { useContext, useEffect } from "react";
import { NavContext } from "../../components/context/StateContext";
import axios from "axios";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import styles from "../../styles/bible.module.scss";
import Link from "next/link";

export const getStaticProps: GetStaticProps = async () => {
  const API_KEY = `869904e0e97adf37df23e4cee5e3c5d2`;
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
      return [];
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
            <div>
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
            </div>
            <div className={styles.kitabuHolder}>
              <Link
                href={`/SomaBiblia/Kitabu/${encodeURIComponent(kitabu.id)}`}
                key={kitabu.id}
              >
                <div className={styles.kitabu}>{kitabu.nameLong}</div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SomaBiblia;
