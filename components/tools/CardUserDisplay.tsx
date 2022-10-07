import { sadaka } from "@prisma/client";
import Image from "next/image";
import Styles from "../../styles/cardUser.module.scss";

type dataType = {
  jina: string;
  picha: string;
  jumuia: string;
  simu: string;
  bahasha: string;
  tareheYaUsajiri: string;
  missing: boolean;
};

const Card = ({
  jina,
  picha,
  jumuia,
  simu,
  bahasha,
  tareheYaUsajiri,
  missing,
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

  return (
    <div className={Styles.container}>
      <div className={Styles.left}>
        <div className={Styles.image}>
          <Image
            alt=""
            src={picha}
            objectFit={"cover"}
            placeholder="blur"
            blurDataURL={picha}
            height={450}
            width={400}
            objectPosition={"center"}
          />
        </div>
      </div>
      <div className={Styles.right}>
        <div className={Styles.description}>
          <h1>{jina}</h1>
          <h2>Maombi ya usajiri ya msharika</h2>
          <span></span>
          <div className={Styles.kiasiContainer}>
            <div className={Styles.kiasiText}>Namba ya Bahasha</div>
            <div className={Styles.kiasiValue}>
              {bahasha == "" ? (
                <div style={{ color: "red" }}>HANA BAHASHA</div>
              ) : (
                bahasha
              )}
            </div>
          </div>

          <div className={Styles.kiasiContainer}>
            <div className={Styles.kiasiText}>Jina la Jumuiya</div>
            <div className={Styles.kiasiValue}>
              {jumuia == "Sijapata Jumuiya" ? (
                <div style={{ color: "red" }}>HANA JUMUIYA</div>
              ) : (
                jumuia
              )}
            </div>
          </div>
          <div className={Styles.kiasiContainer}>
            <div className={Styles.kiasiText}>Namba ya Simu</div>
            <div className={Styles.kiasiValue}>{simu}</div>
          </div>
          <div className={Styles.kiasiContainer}>
            <div className={Styles.kiasiText}>Siku ya usajiri</div>
            <div className={Styles.kiasiValue}>
              {`${formatDate(tareheYaUsajiri)} (${timeAgo(tareheYaUsajiri)})`}
            </div>
          </div>
          {missing ? (
            <div className={Styles.viambatanishiMissing}>
              Msharika hajakamilisha viambatanishi.
            </div>
          ) : (
            <div className={Styles.viambatanishi}>
              Msharika amekamilisha viambatanishi.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
