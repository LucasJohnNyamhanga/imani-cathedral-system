import React from "react";
import Styles from "../../styles/articleLayout.module.scss";
import BlogCard from "../tools/BlogCard";
import Card from "../tools/Card";
import Matangazo from "../tools/Matangazo";

type dataType = {
  posts: {
    id: number;
    title: string;
    subTitle: string;
    body: string;
    image: string;
    tag: string;
    writter: string;
    writterImage: string;
    bio: string;
    date: Date;
  }[];
};

const ArticleLayout = ({ posts }: dataType) => {
  let habari = posts.filter((post) => {
    return post.tag == "Habari Na Matukio";
  });

  let mahubiri = posts.filter((post) => {
    return post.tag == "Mahubiri Na Mafundisho";
  });

  return (
    <div className={Styles.container}>
      <div className={Styles.innerContainer}>
        <div className={Styles.containerLeft}>
          <div>
            <div className={Styles.headerText}>
              Karibu KKKT Ushirika wa Imani
            </div>
            <Card />
          </div>
          <div>
            {habari.length > 0 && (
              <>
                <div className={Styles.headerText}>Habari Na Matukio</div>
                <BlogCard data={habari} />
                <div className={Styles.headerTextEndelea}>
                  <div>Endelea Habari Na Matukio</div>
                </div>
              </>
            )}

            {mahubiri.length > 0 && (
              <>
                <div className={Styles.headerText}>Mahubiri Na Mafundisho</div>
                <BlogCard data={mahubiri} />
                <div className={Styles.headerTextEndelea}>
                  <div>Endelea Mahubiri Na Mafundisho</div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className={Styles.containerRight}>
          <div className={Styles.headerText}>Matangazo</div>
          <Matangazo
            title={"Nafasi Ya Kazi"}
            message={
              "Muhudumu wa kanisa ambaye atafanya kazi za ndani na nje ya kanisa"
            }
            date={"22 Sep 2022"}
          />
          <Matangazo
            title={"Matayarisho Siku ya Mikaeli na Watoto"}
            message={
              "Matayarisho ya Siku ya Mikaeli na Watoto yataendela kila jumapili jioni kuanzia saa tisa alasili."
            }
            date={"17 Sep 2022"}
          />
        </div>
      </div>
    </div>
  );
};

export default ArticleLayout;
