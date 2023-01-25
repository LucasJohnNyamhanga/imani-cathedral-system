import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from "next";
import axios from "axios";
import styles from "../../../styles/kitabu.module.scss";
import { NavContext } from "../../../components/context/StateContext";
import { useContext, useEffect } from "react";
import Link from "next/link";

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  // ...
  const API_KEY = process.env.BIBLE_API_KEY;
  const url = `https://api.scripture.api.bible/v1/bibles/611f8eb23aec8f13-01/books/${id}/chapters`;
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

  const vitabu = JSON.parse(JSON.stringify(data.data));

  const urlPath = `https://api.scripture.api.bible/v1/bibles/611f8eb23aec8f13-01/books/${id}`;

  const book = await axios
    .get(urlPath, config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      // handle error
      return [];
    });

  const kitabu = JSON.parse(JSON.stringify(book.data));

  const urlSection = `https://api.scripture.api.bible/v1/bibles/611f8eb23aec8f13-01/books/${id}/sections`;

  let checkSectionStatus = false;

  const section = await axios
    .get(urlSection, config)
    .then(function (response) {
      checkSectionStatus = true;
      return response.data;
    })
    .catch(function (error) {
      // handle error
      return [];
    });

  let sections = [];
  if (checkSectionStatus) {
    sections = JSON.parse(JSON.stringify(section.data));
  }

  return {
    props: {
      vitabu,
      kitabu,
      sections,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // ...
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
      return [];
    });

  const bible = await JSON.parse(JSON.stringify(data.data));

  type dataNote = {
    id: string;
  };
  const paths = await bible.map((kitabu: dataNote) => {
    let id = String(kitabu.id);
    return {
      params: {
        id: `${id}`,
      },
    };
  });
  return {
    paths,
    fallback: "blocking",
  };
};

type kitabuData = {
  id: string;
  bibleId: string;
  bookId: string;
  number: string;
  reference: string;
};

type sectionData = {
  id: string;
  bibleId: string;
  bookId: string;
  title: string;
  firstVerseId: string;
  lastVerseId: string;
  firstVerseOrgId: string;
  lastVerseOrgId: string;
};

const Index = ({
  vitabu,
  kitabu,
  sections,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  //!mambo yanaanza

  const { navActive, setNavActive } = useContext(NavContext);

  useEffect(() => {
    setNavActive("Biblia");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navActive]);

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.headerDirection}>
          <Link href={"/SomaBiblia"} className={styles.linker}>
            Biblia
          </Link>{" "}
        </div>
        <div>
          <h2 className={styles.header}>{`${kitabu.nameLong}`}</h2>
        </div>
        <div className={styles.kitabu}>
          {vitabu.map(
            (kitabu: kitabuData, index: number) =>
              index > 0 && (
                <Link
                  href={`/SomaBiblia/Maandiko/${kitabu.id}`}
                  className={styles.box}
                  key={kitabu.number}
                >
                  {kitabu.number}
                </Link>
              )
          )}
        </div>
        <>
          {sections.length > 0 && (
            <>
              <div>
                <h2
                  className={styles.headerSection}
                >{`Sehemu za ${kitabu.nameLong}`}</h2>
              </div>
              <div>
                {sections.map((section: sectionData) => (
                  <div key={section.id} className={styles.section}>
                    <Link href={`/SomaBiblia/Sehemu/${section.id}`}>
                      <span>
                        {section.firstVerseOrgId.replace(
                          section.bookId,
                          kitabu.name
                        )}
                      </span>
                      {`${section.title}`}
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
        <div className={styles.spacer}></div>
        <div className={styles.headerDirection}>
          <Link href={"/SomaBiblia"} className={styles.linker}>
            Biblia
          </Link>{" "}
        </div>
      </div>
    </div>
  );
};

export default Index;
