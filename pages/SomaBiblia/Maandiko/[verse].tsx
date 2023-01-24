import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from "next";
import axios from "axios";
import styles from "../../../styles/kitabu.module.scss";
import { NavContext } from "../../../components/context/StateContext";
import { useContext, useEffect } from "react";

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

  const API_KEY = `4b99ad55013a8f3be63090fb85f7050e`;
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

  return {
    props: {
      andiko,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // ...
  const API_KEY = `4b99ad55013a8f3be63090fb85f7050e`;
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

const Index = ({ andiko }: InferGetStaticPropsType<typeof getStaticProps>) => {
  //!mambo yanaanza

  const { navActive, setNavActive } = useContext(NavContext);

  useEffect(() => {
    setNavActive("Biblia");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navActive]);

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div>
          <h2 className={styles.header}>{`${andiko?.reference}`}</h2>
        </div>
        <div
          className={styles.andiko}
          dangerouslySetInnerHTML={{ __html: andiko.content }}
        />
      </div>
    </div>
  );
};

export default Index;
