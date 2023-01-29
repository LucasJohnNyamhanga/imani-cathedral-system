import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from "next";
import axios from "axios";
import styles from "../../../styles/kitabu.module.scss";
import { NavContext } from "../../../components/context/StateContext";
import { useContext, useEffect } from "react";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";

export const getStaticProps: GetStaticProps = async (context) => {
  const sectionId = context.params?.id;
  // ...

  const API_KEY = `91d3ca0c7cb525ce89e72a18f27ab032`;
  const url = `https://api.scripture.api.bible/v1/bibles/611f8eb23aec8f13-01/sections/${sectionId}?content-type=html&include-notes=true&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=true`;
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

  const andiko = await JSON.parse(JSON.stringify(data.data));

  const urlPath = `https://api.scripture.api.bible/v1/bibles/611f8eb23aec8f13-01/books/${andiko.bookId}`;

  const book = await axios
    .get(urlPath, config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      // handle error
      return [];
    });

  const kitabuDetails = JSON.parse(JSON.stringify(book.data));

  const urlSection = `https://api.scripture.api.bible/v1/bibles/611f8eb23aec8f13-01/books/${andiko.bookId}/sections`;

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
      andiko,
      kitabuDetails,
      sections,
      sectionId,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // ...
  const API_KEY = `91d3ca0c7cb525ce89e72a18f27ab032`;
  const config = {
    headers: {
      "api-key": API_KEY,
    },
  };

  const urlpath =
    "https://api.scripture.api.bible/v1/bibles/611f8eb23aec8f13-01/books";

  type dataList = {
    id: string;
    chapters: {
      id: string;
    }[];
  };

  const dataListChapters = await axios
    .get(urlpath, config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      // handle error
      return [];
    });

  const chaptersList = await JSON.parse(JSON.stringify(dataListChapters.data));

  let listPaths: any = [];

  const findSections = async (bookId: string) => {
    const sectionsPath = `https://api.scripture.api.bible/v1/bibles/611f8eb23aec8f13-01/books/${bookId}/sections`;
    //api.scripture.api.bible/v1/bibles/611f8eb23aec8f13-01/books/bookId/sections
    const dataListSection = await axios
      .get(sectionsPath, config)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        // handle error
        return [];
      });

    return await JSON.parse(JSON.stringify(dataListSection.data));
  };

  type dataSection = {
    id: string;
    bibleId: string;
    bookId: string;
    title: string;
    firstVerseId: string;
    lastVerseId: string;
    firstVerseOrgId: string;
    lastVerseOrgId: string;
  };

  chaptersList.map((book: dataList) => {
    findSections(book.id).then((data) => {
      data.map((section: dataSection) => {
        let id = section.id;
        listPaths.push({
          params: {
            id: `${id}`,
          },
        });
      });
    });
  });

  console.log(listPaths);

  return {
    paths: [...listPaths],
    fallback: "blocking",
  };
};

const Index = ({
  andiko,
  kitabuDetails,
  sections,
  sectionId,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  //!mambo yanaanza

  const { navActive, setNavActive } = useContext(NavContext);

  useEffect(() => {
    setNavActive("Biblia");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navActive]);

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

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.headerDirection}>
          <Link href={"/SomaBiblia"} className={styles.linker}>
            Biblia
          </Link>{" "}
          <FaAngleRight size={17} />{" "}
          <Link
            href={`/SomaBiblia/Kitabu/${andiko.bookId}`}
            className={styles.linker}
          >
            {kitabuDetails.nameLong}
          </Link>
        </div>
        <div>
          <h2 className={styles.header}>{`${andiko.title}`}</h2>
        </div>
        <div
          className={styles.andiko}
          dangerouslySetInnerHTML={{ __html: andiko.content }}
        />
        <>
          {sections.length > 0 && (
            <>
              <div>
                <h2
                  className={styles.headerSection}
                >{`Sehemu za ${kitabuDetails.nameLong}`}</h2>
              </div>
              <div>
                {sections.map((section: sectionData) => (
                  <Link
                    href={`/SomaBiblia/Sehemu/${encodeURIComponent(
                      section.id
                    )}`}
                    key={section.id}
                  >
                    <div
                      className={
                        sectionId == section.id
                          ? styles.activeSection
                          : styles.section
                      }
                    >
                      <span>
                        {section.firstVerseOrgId.replace(
                          section.bookId,
                          kitabuDetails.name
                        )}
                      </span>
                      {`${section.title}`}
                    </div>
                  </Link>
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
          <FaAngleRight size={17} />{" "}
          <Link
            href={`/SomaBiblia/Kitabu/${encodeURIComponent(andiko.bookId)}`}
            className={styles.linker}
          >
            {kitabuDetails.nameLong}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
