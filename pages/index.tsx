import type { NextPage, InferGetStaticPropsType } from "next";
import Hero from "../components/layout/Hero";
import ArticleLayout from "../components/layout/ArticleLayout";
import { prisma } from "../db/prisma";
import type { GetStaticProps } from "next";
import { useContext, useEffect } from "react";
import { NavContext } from "../components/context/StateContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { unified } from "unified";
import rehypeStringify from "rehype-stringify";
import rehypeParse from "rehype-parse";
import { visit } from "unist-util-visit";
import parameterize from "parameterize-js";

import {
  Navigation,
  Pagination,
  EffectCreative,
  Keyboard,
  Autoplay,
} from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-creative";

export const getStaticProps: GetStaticProps = async () => {
  const postFromServer = await prisma.post.findMany({
    where: {
      published: true,
    },
    select: {
      id: true,
      title: true,
      subTitle: true,
      body: true,
      tag: true,
      user: true,
      createdAt: true,
    },
  });
  const postsList = JSON.parse(JSON.stringify(postFromServer));

  let htmlServer;
  let posts: {
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
  }[] = [];

  postsList.map(
    (post: {
      id: number;
      title: string;
      subTitle: string;
      body: string;
      createdAt: Date;
      published: boolean;
      userId: number;
      tagId: number;
      user: {
        name: string;
        image: string;
        bio: string;
      };
      tag: {
        name: string;
      };
      date: Date;
    }) => {
      //! irrigal stuffs
      let image = "";
      let text = "";
      let postTarget = `<body>${post.body}</body>`;

      let result = postTarget.replaceAll(
        `img`,
        `Image layout="fill" objectfit="cover"`
      );

      const content = unified()
        .use(rehypeParse, {
          fragment: true,
        })
        .use(() => {
          return (tree) => {
            visit(tree, "element", (node) => {
              if (node.tagName == "img") {
                image = node.properties!.src as string;
              }
              if (node.tagName == "p") {
                if (node.children[0].type == "text") {
                  //  const id = parameterize(node.children[0].value);
                  //  node.properties!.id = id;
                  if (text.length > 3) {
                    text = `${text} ${node.children[0].value}`;
                  } else {
                    text = `${node.children[0].value}`;
                  }
                }
              }
            });
          };
        })
        .use(rehypeStringify)
        .processSync(result)
        .toString();

      htmlServer = content;

      //! at last
      posts.push({
        id: post.id,
        title: post.title,
        subTitle: post.subTitle,
        body: text,
        image: image,
        tag: post.tag.name,
        writter: post.user.name,
        writterImage: post.user.image,
        bio: post.user.bio,
        date: post.createdAt,
      });
    }
  );

  return {
    props: {
      posts,
    },
    revalidate: 15,
  };
};

const Home: NextPage = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { navActive, setNavActive } = useContext(NavContext);

  useEffect(() => {
    setNavActive("Mwanzo");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navActive]);

  return (
    <>
      <Swiper
        navigation={true}
        pagination={{
          dynamicBullets: true,
        }}
        grabCursor={true}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        keyboard={{
          enabled: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        modules={[Navigation, Pagination, EffectCreative, Keyboard, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Hero
            image={"/worship.avif"}
            header={`Njoni, tumwimbie BWANA kwa furaha. - Zaburi 95:1`}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Hero
            image={"/worship2.avif"}
            header={`Kueni katika neema, na katika kumjua Bwana wetu na Mwokozi Yesu Kristo. - 2 Petro 3:18`}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Hero
            image={"/worship.jpg"}
            header={`Basi, jiwekeni chini ya Mungu; mpingeni Ibilisi naye atawakimbieni. Mkaribieni Mungu, naye atakuja karibu nanyi. - Yakobo 4:7`}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Hero
            image={"/test.jpg"}
            header={`Yesu akamwambia, Mimi ndimi njia, na kweli, na uzima; mtu haji kwa Baba, ila kwa njia ya mimi. - Yohana 14:6`}
          />
        </SwiperSlide>
      </Swiper>
      <ArticleLayout posts={posts} />
    </>
  );
};

export default Home;
