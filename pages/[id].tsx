import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from "next";
import { prisma } from "../db/prisma";
import React, { useEffect } from "react";
import Styles from "../styles/postDisplay.module.scss";
import Head from "next/head";
import { post } from "@prisma/client";

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  let Id = parseInt(String(id));
  // ...
  const postData = await prisma.post.findUnique({
    where: {
      id: Id,
    },
    select: {
      id: true,
      title: true,
      subTitle: true,
      body: true,
      createdAt: true,
      tag: true,
    },
  });

  const postFound = JSON.parse(JSON.stringify(postData));

  return {
    props: {
      postFound,
    },
    revalidate: 15,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // ...
  const postsServer = await prisma.post.findMany({
    where: {
      published: true,
    },
    select: {
      id: true,
    },
  });

  type dataNote = {
    id: number;
  };
  const postsData = JSON.parse(JSON.stringify(postsServer));
  const paths = postsData.map((post: post) => {
    let id = String(post.id);
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

const Index = ({
  postFound,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  type dataTopic = {
    id: number;
    topicName: string;
    topicDefinition: string;
    subject: {
      subjectName: string;
    };
    form: {
      formName: string;
    };
  };

  let truncateLimit = 12;
  function truncate(str: string) {
    return str.length > truncateLimit
      ? str.slice(0, truncateLimit) + "..."
      : str;
  }

  //!mambo yanaanza
  console.log(postFound);

  return (
    <div className={Styles.container}>
      <Head>
        <title>{postFound.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={postFound.subTitle} />
        {/* //!add keywords */}
        <meta name="keywords" content={postFound.title} />
      </Head>
      <div className={Styles.innerContainer}>
        <div className={Styles.rightInnercontainerBody}>
          <div className={Styles.BodyHeader}>
            <div className={Styles.statusBar}>
              <div>KKKT DMZV IMANI KANISA KUU</div>
            </div>
          </div>
          <div className={Styles.BodyContent}>
            <div className="ckContent">
              <h1>{postFound.title}</h1>

              <h3>{postFound.subTitle}</h3>
              <div className={Styles.separator}></div>
              <div dangerouslySetInnerHTML={{ __html: postFound.body }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
