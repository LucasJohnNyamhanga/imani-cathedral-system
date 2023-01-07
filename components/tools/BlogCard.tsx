import { type } from "os";
import React from "react";
import Styles from "../../styles/blogCard.module.scss";
import Link from "next/link";

type dataType = {
  data: {
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

const BlogCard = ({ data }: dataType) => {
  let imageDefault = "../../kkkt.jpg";

  function timeAgo(time: any) {
    switch (typeof time) {
      case "number":
        break;
      case "string":
        time = +new Date(time);
        break;
      case "object":
        if (time.constructor === Date) time = time.getTime();
        break;
      default:
        time = +new Date();
    }
    var time_formats = [
      [60, "sekunde", 1], // 60
      [120, "Dakika 1 imepita", "1 minute from now"], // 60*2
      [3600, "dakika", 60], // 60*60, 60
      [7200, "Saa 1 limepita", "1 hour from now"], // 60*60*2
      [86400, "masaa", 3600], // 60*60*24, 60*60
      [172800, "Jana", "Tomorrow"], // 60*60*24*2
      [604800, "siku", 86400], // 60*60*24*7, 60*60*24
      [1209600, "Wiki iliyopita", "Next week"], // 60*60*24*7*4*2
      [2419200, "wiki", 604800], // 60*60*24*7*4, 60*60*24*7
      [4838400, "Mwezi uliopita", "Next month"], // 60*60*24*7*4*2
      [29030400, "miezi", 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
      [58060800, "Mwaka jana", "Next year"], // 60*60*24*7*4*12*2
      [2903040000, "miaka", 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
      [5806080000, "Muongo uliopita", "Next century"], // 60*60*24*7*4*12*100*2
      [58060800000, "centuries", 2903040000], // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
    ];
    var seconds = (+new Date() - time) / 1000,
      token = "zimepita",
      list_choice = 1;

    if (seconds == 0) {
      return "Sasa hivi";
    }
    if (seconds < 0) {
      seconds = Math.abs(seconds);
      token = "from now";
      list_choice = 2;
    }
    var i = 0,
      format;
    while ((format = time_formats[i++]))
      if (seconds < format[0]) {
        if (typeof format[2] == "string") return format[list_choice];
        else
          return (
            Math.floor(seconds / format[2]) + " " + format[1] + " " + token
          );
      }
    return time;
  }

  function customTruncate(str: string, size: number) {
    return str.length > size ? str.slice(0, size) + "..." : str;
  }

  console.log(data);

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
                backgroundImage:
                  item.image.length > 0
                    ? `url(${item.image})`
                    : `url(${imageDefault})`,
              }}
            ></div>
            <ul className={Styles.details}>
              <li className={Styles.author}>
                <a href="#">Posteb by: {item.writter}</a>
              </li>
              <li className={Styles.date}>{timeAgo(item.date)}</li>
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
            <p className={Styles.textMain}>{customTruncate(item.body, 300)}</p>
            <p className={Styles.readmore}>
              <Link
                className={Styles.link}
                passHref
                href={`${item.id}`}
                legacyBehavior
              >
                Soma zaidi
              </Link>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogCard;
