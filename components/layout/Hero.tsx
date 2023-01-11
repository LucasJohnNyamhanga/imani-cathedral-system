import styles from "../../styles/hero.module.scss";
import Image from "next/image";
import { useEffect, useRef } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

type dataHero = {
  header: string;
  image: string;
};

function hero({ header, image }: dataHero) {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.hero}>
          <div className={styles.info}>
            <div className={styles.details}>
              <p>{header}</p>
            </div>
          </div>
          <div className={styles.image}>
            <Image
              alt=""
              src={image}
              placeholder="blur"
              blurDataURL={image}
              fill
              sizes={"100vw"}
              style={{
                objectFit: "cover",
                objectPosition: "top",
              }}
              quality={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default hero;
