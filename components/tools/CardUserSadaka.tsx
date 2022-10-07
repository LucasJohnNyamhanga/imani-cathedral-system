import { sadaka } from "@prisma/client";
import Image from "next/image";
import Styles from "../../styles/card.module.scss";

type dataType = {
  jina: string;
  picha: string;
  ahadi: string;
  kiasi: string;
  bahasha: string;
  thibitisha: () => void;
  sitisha: () => void;
  sadaka: {}[];
};

const Card = ({
  jina,
  picha,
  ahadi,
  kiasi,
  bahasha,
  thibitisha,
  sitisha,
  sadaka,
}: dataType) => {
  var fulldays = [
    "Jumapili",
    "Jumatatu",
    "Jumanne",
    "Jumatano",
    "Alhamisi",
    "Ijumaa",
    "Jumamosi",
  ];
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  function formatDate(someDateTimeStamp: any) {
    var dt = new Date(someDateTimeStamp),
      date = dt.getDate(),
      month = months[dt.getMonth()],
      timeDiff = someDateTimeStamp - Date.now(),
      diffDays = new Date().getDate() - date,
      diffMonths = new Date().getMonth() - dt.getMonth(),
      diffYears = new Date().getFullYear() - dt.getFullYear();

    if (diffYears === 0 && diffDays === 0 && diffMonths === 0) {
      return "leo";
    } else if (diffYears === 0 && diffDays === 1) {
      return "jana";
    } else if (diffYears === 0 && diffDays === -1) {
      return "kesho";
    } else if (diffYears === 0 && diffDays < -1 && diffDays > -7) {
      return fulldays[dt.getDay()];
    } else if (diffYears >= 1) {
      return (
        month + " " + date + ", " + new Date(someDateTimeStamp).getFullYear()
      );
    } else {
      return month + " " + date;
    }
  }

  return (
    <div className={Styles.container} style={{ maxWidth: "1000px" }}>
      <div className={Styles.left}>
        <div className={Styles.image}>
          <Image
            alt=""
            src={picha}
            objectFit={"cover"}
            placeholder="blur"
            blurDataURL={picha}
            height={400}
            width={400}
            objectPosition={"center"}
          />
        </div>
      </div>
      <div className={Styles.right}>
        <div className={Styles.description}>
          <h1>{jina}</h1>
          <h2>Ahadi: {ahadi}.</h2>
          <span></span>
          <div className={Styles.kiasiContainer}>
            <div className={Styles.kiasiText}>Namba ya Bahasha</div>
            <div className={Styles.kiasiValue}>{bahasha}</div>
          </div>
          {sadaka.map((toleo: any, index: number) => (
            <div key={index}>
              <div className={Styles.kiasiContainer}>
                <div className={Styles.kiasiText}>Sadaka ya mwisho</div>
                <div className={Styles.kiasiValue}>
                  Tsh {toleo.amount} ya {formatDate(toleo.tarehe)}
                </div>
              </div>
            </div>
          ))}
          <div className={Styles.kiasiContainer}>
            <div className={Styles.kiasiText}>Kiasi Kinachowekwa</div>
            <div className={Styles.kiasiValue}>Tsh {kiasi}</div>
          </div>
        </div>
        <div className={Styles.confirm}>
          <div onClick={sitisha} className={Styles.ButtonSitisha}>
            Sitisha
          </div>
          <div onClick={thibitisha} className={Styles.Button}>
            Thibitisha
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
