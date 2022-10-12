import { type } from "os";
import React from "react";
import Styles from "../../styles/blogCard.module.scss";

type dataType = {
  data: {
    title: string;
    subTitle: string;
    image: string;
    content: string;
    mwandishi: string;
    tarehe: string;
    tag: string;
  }[];
};

const BlogCard = ({ data }: dataType) => {
  return (
    <div>
      {data.map((item, index) => (
        <div
          className={
            index % 2 == 0
              ? `${Styles.blogcard}`
              : `${Styles.blogcard} ${Styles.alt}`
          }
          key={index}
        >
          <div className={Styles.meta}>
            <div
              className={Styles.photo}
              style={{
                backgroundImage: `url(${item.image})`,
              }}
            ></div>
            <ul className={Styles.details}>
              <li className={Styles.author}>
                <a href="#">Posteb by: {item.mwandishi}</a>
              </li>
              <li className={Styles.date}>{item.tarehe}</li>
              <li className={Styles.tags}>
                <ul>
                  <li>
                    <a href="#">{item.tag}</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className={Styles.description}>
            <h1>{item.title}</h1>
            <h2>{item.subTitle}</h2>
            <p>{item.content}</p>
            <p className={Styles.readmore}>
              <a href="#">Soma zaidi</a>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogCard;
