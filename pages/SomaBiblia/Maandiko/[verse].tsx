import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from "next";
import axios from "axios";
import styles from "../../../styles/kitabu.module.scss";
import { NavContext } from "../../../components/context/StateContext";
import { useContext, useEffect } from "react";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";

export const getStaticProps: GetStaticProps = async (context) => {
  const chapterId = context.params?.verse;
  // ...
  //! chapter id is key to find everything,
  //! get chapter particulars, such as book id
  //! get verses
  //* list of books and its chapters
  //* https://api.scripture.api.bible/v1/bibles/611f8eb23aec8f13-01/books?include-chapters=true
  //* getting passage using chapter id
  //* `https://api.scripture.api.bible/v1/bibles/611f8eb23aec8f13-01/passages/GEN.36?content-type=html&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=true&use-org-id=false`

  const API_KEY = `869904e0e97adf37df23e4cee5e3c5d2`;
  const url = `https://api.scripture.api.bible/v1/bibles/611f8eb23aec8f13-01/passages/${chapterId}?content-type=html&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=true&use-org-id=false`;
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

  const urlpath = `https://api.scripture.api.bible/v1/bibles/611f8eb23aec8f13-01/books/${andiko.bookId}/chapters`;

  const dataKitabu = await axios
    .get(urlpath, config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      // handle error
      return [];
    });

  const kitabu = JSON.parse(JSON.stringify(dataKitabu.data));

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

  return {
    props: {
      andiko,
      kitabu,
      kitabuDetails,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // ...
  const API_KEY = `869904e0e97adf37df23e4cee5e3c5d2`;
  const config = {
    headers: {
      "api-key": API_KEY,
    },
  };

  const urlpath =
    "https://api.scripture.api.bible/v1/bibles/611f8eb23aec8f13-01/books?include-chapters=true";

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

  chaptersList.map((list: dataList) => {
    list.chapters.map((chapter, index) => {
      let id = String(chapter.id);
      index > 0 &&
        listPaths.push({
          params: {
            verse: `${id}`,
          },
        });
    });
  });

  return {
    paths: [...listPaths],
    fallback: "blocking",
  };
};

const Index = ({
  andiko,
  kitabu,
  kitabuDetails,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  //!mambo yanaanza

  const { navActive, setNavActive } = useContext(NavContext);

  useEffect(() => {
    setNavActive("Biblia");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navActive]);

  type kitabuData = {
    id: string;
    bibleId: string;
    bookId: string;
    number: string;
    reference: string;
  };

  const data = kitabu.filter((chapter: kitabuData) => {
    return chapter.id === andiko.chapterIds[0];
  });
  const child = data[0];
  const { id, reference } = child;

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.headerDirection}>
          <Link href={"/SomaBiblia"} className={styles.linker}>
            Biblia
          </Link>{" "}
          <FaAngleRight size={17} />{" "}
          <Link
            href={`/SomaBiblia/Kitabu/${encodeURIComponent(kitabuDetails.id)}`}
            className={styles.linker}
          >
            {kitabuDetails.name}
          </Link>
        </div>
        <div>
          <h2 className={styles.header}>{`${reference}`}</h2>
        </div>
        <div
          className={styles.andiko}
          dangerouslySetInnerHTML={{ __html: andiko.content }}
        />
        <div>
          <h2 className={styles.header}>{`${kitabuDetails.nameLong}`}</h2>
        </div>
        <div className={styles.kitabu}>
          {kitabu.map(
            (kitabu: kitabuData, index: number) =>
              index > 0 && (
                <Link
                  href={`/SomaBiblia/Maandiko/${encodeURIComponent(kitabu.id)}`}
                  className={
                    id == kitabu.id ? `${styles.boxActive}` : styles.box
                  }
                  key={kitabu.number}
                >
                  {kitabu.number}
                </Link>
              )
          )}
        </div>
        <div className={styles.spacer}></div>
        <div className={styles.headerDirection}>
          <Link href={"/SomaBiblia"} className={styles.linker}>
            Biblia
          </Link>{" "}
          <FaAngleRight size={17} />{" "}
          <Link
            href={`/SomaBiblia/Kitabu/${encodeURIComponent(kitabuDetails.id)}`}
            className={styles.linker}
          >
            {kitabuDetails.name}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
