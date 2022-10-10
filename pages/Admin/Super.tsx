import { useState, useRef, useContext, useEffect } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Styles from "../../styles/admin.module.scss";
import { ReactNode } from "react";
import { BsInboxesFill } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
import { NavContext } from "../../components/context/StateContext";
import Loader from "../../components/tools/loader";
import Drawer from "../../components/tools/DrawerMobileAdmin";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import { FaUserTie as UserKamili } from "react-icons/fa";
import { FaUserTimes as UserKasoro } from "react-icons/fa";
import axios from "axios";
import { prisma } from "../../db/prisma";
import Badge from "@mui/material/Badge";
import CardBox from "../../components/tools/cardBoxWithView";
import { cheo, user } from "@prisma/client";
import Card from "../../components/tools/CardUserDisplayUongozi";

type userData = {
  id: number;
  image: string;
  name: string;
  tareheYaKuzaliwa: Date;
  bahasha: string | null;
  jinsia: string;
  haliYaNdoa: string;
  ainaYaNdoa: string | null;
  tareheYaNdoa: Date | null;
  jinaLaMwenza: string | null;
  nambaYaSimu: string;
  nambaYaSimuMwenza: string | null;
  jumuiyaId: number;
  mtaa: string;
  kata: string;
  wilaya: string;
  kazi: string;
  elimu: string;
  sadaka: {}[];
  verified: boolean;
  ahadi: string;
  jumuiya: { name: string };
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: `/Auth/SignIn?callbackUr=/`,
        permanent: false,
      },
    };
  }

  const userFromServer = await prisma.user.findFirst({
    where: {
      bahasha: session.user!.email,
    },
    select: {
      id: true,
      name: true,
      image: true,
    },
  });
  const userfound = await JSON.parse(JSON.stringify(userFromServer));

  const userVerificationPendingServer = await prisma.user.count({
    where: { missing: false, verified: false },
  });
  const userVerificationPending = await JSON.parse(
    JSON.stringify(userVerificationPendingServer)
  );

  const userMissingCredentialsServer = await prisma.user.count({
    where: { missing: true, verified: false },
  });
  const userMissingCredentials = await JSON.parse(
    JSON.stringify(userMissingCredentialsServer)
  );

  return {
    props: { userfound, userVerificationPending, userMissingCredentials },
  };
};

type formData = {
  label: string;
  value: string;
}[];

const Index = ({
  userfound,
  userVerificationPending,
  userMissingCredentials,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const matches300 = useMediaQuery("(min-width:325px)");

  const [navValue, setNavValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState("");

  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);
  const notify = (message: string) => toast(message);

  const wekaCheo = useRef<HTMLDivElement>(null!);

  const [sadaka, setSadaka] = useState({
    bahasha: "",
  });
  const [confirmSadaka, setConfirmSadaka] = useState(true);
  const [userReturned, setUserReturned] = useState<userData>();
  const [vyeo, setVyeo] = useState<formData>([]);
  const [uongozi, setUongozi] = useState("");

  let handleNav = (value: string) => {
    setNavValue(value);
    createActive(value);
  };

  let createActive = (key: string) => {
    removeActive();
    switch (key) {
      case "wekaCheo":
        wekaCheo.current.classList.add(Styles.Active);
        setActive("wekaCheo");
        break;

      default:
        break;
    }
    smoothScroll();
  };

  let removeActive = () => {
    wekaCheo.current.classList.remove(Styles.Active);
  };

  let smoothScroll = () => {
    scroll({
      top: 0,
      behavior: "smooth",
    });
  };

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

  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;

  //Change it so that it is 7 days in the past.
  const date7daysAgo = new Date();
  date7daysAgo.setDate(date7daysAgo.getDate() - 7);
  let day7 = date7daysAgo.getDate();
  let month7 = date7daysAgo.getMonth() + 1;
  let year7 = date7daysAgo.getFullYear();
  let dateLimt = `${year7}-${month7 < 10 ? "0" + month7 : month7}-${
    day7 < 10 ? "0" + day7 : day7
  }`;

  const tafutaBahasha = () => {};
  const handleSadaka = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    let name = e.target.name;
    setSadaka({ bahasha: value });
  };

  const sajiliSadaka = () => {
    if (sadaka.bahasha != "") {
      setLoading(true);
      axios
        .post("/api/findUserBahasha", sadaka)
        .then(function (response) {
          const users = JSON.parse(JSON.stringify(response.data));
          // handle success
          if (users) {
            setUserReturned(users);
            retriveVyeo();
            setConfirmSadaka(false);
          } else {
            setConfirmSadaka(true);
            setLoading(false);
            notifyError(
              `Hakuna Msharika mwenye bahasha nambari ${sadaka.bahasha} aliyepatikana.`
            );
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          notifyError("Kuna kitu hakiko sawa, jaribu tena baadae.");
          setLoading(false);
        })
        .then(function () {
          // always executed
        });
    } else {
      notifyError("Jaza nafasi zote zilizo wazi.");
    }
  };

  const wekaVyeo = (vyeo: []) => {
    let dataJumuiya: formData = [];
    vyeo.map((cheo: cheo) => {
      let data = {
        label: cheo.jinaLaCheo,
        value: cheo.id.toString(),
      };
      dataJumuiya.push(data);
    });
    setVyeo(dataJumuiya);
    setLoading(false);
  };

  let retriveVyeo = () => {
    setLoading(true);
    axios
      .get("/api/getVyeo")
      .then(function (response) {
        const users = JSON.parse(JSON.stringify(response.data));
        // handle success
        if (users.length > 0) {
          wekaVyeo(users);
        } else {
          notifyError("Hakuna vyeo kwenye database.");
          setLoading(false);
        }
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        notifyError("Something went wrong.");
        setLoading(false);
      })
      .then(function () {
        // always executed
      });
  };

  const handleSitisha = () => {
    setConfirmSadaka(true);
    setSadaka({ bahasha: "" });
    smoothScroll();
  };

  const handleThibitisha = () => {
    console.log(uongozi);
    let cheo = [{ id: parseInt(uongozi) }];
    let data = {
      id: userReturned!.id,
      cheo,
    };
    setLoading(true);
    axios
      .post("/api/updateUserCheo", data)
      .then(function (response) {
        const ujumbe = JSON.parse(JSON.stringify(response.data));
        // handle success
        if (ujumbe.type == "success") {
          notifySuccess(ujumbe.message);
        } else {
          notifyError(ujumbe.message);
        }

        setSadaka({ bahasha: "" });
        setConfirmSadaka(true);
        smoothScroll();
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        notifyError("Kuna kitu hakiko sawa, jaribu tena baadae.");
        setLoading(false);
      })
      .then(function () {
        // always executed
      });
  };

  const wekaUongozi = (value: string) => {
    setUongozi(value);
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.innerContainer}>
        <Toaster position="top-center" />
        <div className={Styles.containerBody}>
          <div className={Styles.leftInnercontainerBody}>
            <div className={Styles.leftInner}>
              <div className={Styles.containerHeader}>
                <div className={Styles.TopicHeader}>Imani Admin</div>
              </div>
              <div className={Styles.scroller}>
                <div className={Styles.containerBody}>
                  <div className={Styles.TopicHeaderNotes}>
                    Uongozi Usharika
                  </div>
                  <div
                    ref={wekaCheo}
                    id="wekaCheo"
                    onClick={(e) => handleNav(e.currentTarget.id)}
                    className={Styles.topicTittle}
                  >
                    <Badge badgeContent={0} color="primary">
                      <UserKamili size={18} />
                    </Badge>
                    <div className={Styles.text}>Usajili Vyeo</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* //!start of default desplay */}
          <div className={Styles.rightInnercontainerBody}>
            <div className={Styles.mobile}>
              <Drawer
                textHeader={"Admin"}
                active={active}
                handleClick={handleNav}
                userData={userfound}
              />
            </div>

            {loading && (
              <div className={Styles.loading}>
                <Loader />
              </div>
            )}
            {!loading && (
              <>
                {navValue == "" && (
                  <div className={Styles.rightInnercontainerBody}>
                    <div className={Styles.subject}>
                      <div className={Styles.subjectHeader}>
                        <div className={Styles.subjectHeaderText}>
                          Karibu Kwenye Akaunti Kuu
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {navValue == "wekaCheo" && (
                  <div className={Styles.rightInnercontainerBody}>
                    <div className={Styles.subject}>
                      <div className={Styles.subjectHeader}>
                        <div className={Styles.subjectHeaderText}>
                          Sajiri Uongozi wa Mfumo
                        </div>
                      </div>
                      <div className={Styles.subjectBody}>
                        {confirmSadaka ? (
                          <>
                            <div className={Styles.controls}>
                              <div className={Styles.inputBox}>
                                <input
                                  required
                                  type="number"
                                  value={sadaka.bahasha}
                                  placeholder={``}
                                  name={"bahasha"}
                                  onChange={(event) => {
                                    handleSadaka(event);
                                  }}
                                  autoComplete="off"
                                  autoCorrect="off"
                                  spellCheck={false}
                                />
                                <span>Namba Ya Bahasha</span>
                              </div>
                            </div>
                            <div
                              onClick={sajiliSadaka}
                              className={Styles.subjectBodyButton}
                            >
                              Tafuta Msharika
                            </div>
                          </>
                        ) : (
                          <>
                            <div>
                              <Card
                                jina={userReturned!.name}
                                picha={userReturned!.image}
                                bahasha={userReturned!.bahasha!}
                                thibitisha={handleThibitisha}
                                sitisha={handleSitisha}
                                vyeo={vyeo}
                                wekaUongozi={wekaUongozi}
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

//*Removing default search bar :)
Index.getLayout = function PageLayout(page: ReactNode) {
  return <>{page}</>;
};
