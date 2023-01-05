import { useState, useRef, useEffect } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Styles from "../../styles/admin.module.scss";
import { ReactNode } from "react";
import { FaRegIdCard } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../components/tools/loader";
import { FaUserAlt } from "react-icons/fa";
import { FaFileSignature } from "react-icons/fa";
import Link from "next/link";
import { prisma } from "../../db/prisma";
import { getSession } from "next-auth/react";
import axios from "axios";
import CardBox from "../../components/tools/cardBoxStyle";

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
      userName: session.user!.email ?? "",
    },
    select: {
      id: true,
      name: true,
      image: true,
    },
  });
  const userfound = await JSON.parse(JSON.stringify(userFromServer));

  return {
    props: {
      userfound,
    },
  };
};

const Index = ({}: // userfound,
// userVerificationPending,
// userMissingCredentials,
InferGetServerSidePropsType<typeof getServerSideProps>) => {
  type dataTypeSelect = {
    value: string;
    label: string;
  }[];

  const [navValue, setNavValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState("");

  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);
  const notify = (message: string) => toast(message);

  const machapisho = useRef<HTMLDivElement>(null!);
  const matangazo = useRef<HTMLDivElement>(null!);
  const watumiaji = useRef<HTMLDivElement>(null!);
  const [userList, setUserList] = useState([]);

  let handleNav = (value: string) => {
    setNavValue(value);
    createActive(value);
  };

  let createActive = (key: string) => {
    removeActive();
    switch (key) {
      case "machapisho":
        machapisho.current.classList.add(Styles.Active);
        setActive("machapisho");
        break;
      case "matangazo":
        matangazo.current.classList.add(Styles.Active);
        setActive("matangazo");
        break;
      case "watumiaji":
        watumiaji.current.classList.add(Styles.Active);
        retriaveWatumiaji();
        setActive("watumiaji");
        break;

      default:
        break;
    }
    smoothScroll();
  };

  let removeActive = () => {
    machapisho.current.classList.remove(Styles.Active);
    matangazo.current.classList.remove(Styles.Active);
    watumiaji.current.classList.remove(Styles.Active);
  };

  let retriaveWatumiaji = () => {
    setLoading(true);
    axios
      .get("/api/getWatumiaji")
      .then(function (response) {
        const watumiajiFromServer = JSON.parse(JSON.stringify(response.data));
        // handle success
        setUserList(watumiajiFromServer);
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

  let handleUpdateWatumiaji = (published: boolean, id: number) => {
    setLoading(true);
    axios
      .post("/api/updateDraftOrPublishedExam", {
        id,
        published: !published,
      })
      .then(function (response) {
        retriaveWatumiaji();
        let jibu: string = response.data.message;
        notifySuccess(jibu);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        notifyError("Error has occured, try later.");
        setLoading(false);
      })
      .then(function () {
        // always executed
      });
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

  function customTruncate(str: string, size: number) {
    return str.length > size ? str.slice(0, size) + "..." : str;
  }

  useEffect(() => {}, []);

  return (
    <div className={Styles.container}>
      <div className={Styles.innerContainer}>
        <Toaster position="top-center" />
        <div className={Styles.containerBody}>
          <div className={Styles.leftInnercontainerBody}>
            <div className={Styles.leftInner}>
              <div className={Styles.containerHeader}>
                <div className={Styles.TopicHeader}>Kituo Cha Usimamizi</div>
              </div>
              <div className={Styles.scroller}>
                <div className={Styles.containerBody}>
                  <div className={Styles.TopicHeaderNotes}>Uboreshaji</div>
                  <div
                    ref={machapisho}
                    id="machapisho"
                    onClick={(e) => handleNav(e.currentTarget.id)}
                    className={Styles.topicTittle}
                  >
                    {/* <Badge badgeContent={5} color="primary"></Badge> */}
                    <FaFileSignature size={25} />
                    <div className={Styles.text}>Machapisho</div>
                  </div>
                  <div
                    ref={matangazo}
                    id="matangazo"
                    onClick={(e) => handleNav(e.currentTarget.id)}
                    className={Styles.topicTittle}
                  >
                    <FaRegIdCard size={25} />
                    <div className={Styles.text}>Matangazo</div>
                  </div>
                  <div className={Styles.TopicHeaderNotes}>Usimamizi</div>
                  <div
                    ref={watumiaji}
                    id="watumiaji"
                    onClick={(e) => handleNav(e.currentTarget.id)}
                    className={Styles.topicTittle}
                  >
                    <FaUserAlt size={25} />
                    <div className={Styles.text}>Watumiaji</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* //!start of default desplay */}
          <div className={Styles.rightInnercontainerBody}>
            <div className={Styles.mobile}>
              {/* <Drawer
                textHeader={"Parish Worker"}
                active={active}
                handleClick={handleNav}
                userData={userfound}
              /> */}
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
                          Karibu Kwenye Akaunti Ya Usimamizi
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {navValue == "machapisho" && (
                  <div className={Styles.rightInnercontainerBody}>
                    <div className={Styles.subject}>
                      <div className={Styles.subjectHeader}>
                        <div className={Styles.subjectHeaderText}>
                          Machapisho Management
                        </div>
                        <Link
                          passHref
                          href="/Admin/Machapisho/Tengeneza"
                          legacyBehavior
                        >
                          <div className={Styles.subjectHeaderButton}>
                            Tengeneza
                          </div>
                        </Link>
                      </div>
                      <div className={Styles.selectDivTopic}>list</div>
                    </div>
                  </div>
                )}
                {navValue == "matangazo" && (
                  <div className={Styles.rightInnercontainerBody}>
                    <div className={Styles.subject}>
                      <div className={Styles.subjectHeader}>
                        <div className={Styles.subjectHeaderText}>
                          Matangazo Management
                        </div>
                        <Link
                          passHref
                          href="/Admin/Notes/Create/Notes"
                          legacyBehavior
                        >
                          <div className={Styles.subjectHeaderButton}>
                            Tengeneza
                          </div>
                        </Link>
                      </div>

                      <div className={Styles.subjectBody}>list</div>
                    </div>
                  </div>
                )}
                {navValue == "watumiaji" && (
                  <div className={Styles.rightInnercontainerBody}>
                    <div className={Styles.subject}>
                      <div className={Styles.subjectHeader}>
                        <div className={Styles.subjectHeaderText}>
                          Usimamizi Watumiaji
                        </div>
                        <Link
                          passHref
                          href="/Admin/Watumiaji/Tengeneza"
                          legacyBehavior
                        >
                          <div className={Styles.subjectHeaderButton}>
                            Tengeneza
                          </div>
                        </Link>
                      </div>
                      <div className={Styles.subjectBody}>
                        {userList.map(
                          (user: {
                            id: number;
                            userName: string;
                            name: string;
                          }) => (
                            <CardBox
                              link={"/Admin/User/" + user.id}
                              label={customTruncate(`${user.name}`, 24)}
                              id={user.id}
                              key={user.id}
                              published={""}
                            />
                          )
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
