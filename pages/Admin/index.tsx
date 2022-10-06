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
import { user } from "@prisma/client";

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

const Index = ({
  userfound,
  userVerificationPending,
  userMissingCredentials,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const matches300 = useMediaQuery("(min-width:325px)");
  const { status } = useSession();
  const { navActive, setNavActive } = useContext(NavContext);

  type dataTypeSelect = {
    value: string;
    label: string;
  }[];

  const [navValue, setNavValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState("");
  const [maombiKamili, setMaombiKamili] = useState(0);
  const [kasoro, setKasoro] = useState(0);
  const [userUsajiliSuccess, setUserUsajiliSuccess] = useState([]);
  const [userUsajiliError, setUserUsajiliError] = useState([]);

  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);
  const notify = (message: string) => toast(message);

  const maombiYaliokamilika = useRef<HTMLDivElement>(null!);
  const maombiKasoro = useRef<HTMLDivElement>(null!);
  const sadakaAhadi = useRef<HTMLDivElement>(null!);

  let handleNav = (value: string) => {
    setNavValue(value);
    createActive(value);
  };

  let createActive = (key: string) => {
    removeActive();
    switch (key) {
      case "maombiYaliokamilika":
        maombiYaliokamilika.current.classList.add(Styles.Active);
        setActive("maombiYaliokamilika");
        unverifiedUsers();
        setMaombiKamili(0);
        break;
      case "maombiKasoro":
        maombiKasoro.current.classList.add(Styles.Active);
        setActive("maombiKasoro");
        usersWithError();
        setKasoro(0);
        break;
      case "sadakaAhadi":
        sadakaAhadi.current.classList.add(Styles.Active);
        setActive("sadakaAhadi");
        break;

      default:
        break;
    }
    smoothScroll();
  };

  let removeActive = () => {
    maombiYaliokamilika.current.classList.remove(Styles.Active);
    maombiKasoro.current.classList.remove(Styles.Active);
    sadakaAhadi.current.classList.remove(Styles.Active);
  };

  let smoothScroll = () => {
    scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  let unverifiedUsers = () => {
    setLoading(true);
    axios
      .get("/api/getUserListUnverified")
      .then(function (response) {
        const users = JSON.parse(JSON.stringify(response.data));
        // handle success
        setUserUsajiliSuccess(users);
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

  let usersWithError = () => {
    setLoading(true);
    axios
      .get("/api/getUserListWithError")
      .then(function (response) {
        const users = JSON.parse(JSON.stringify(response.data));
        // handle success
        setUserUsajiliError(users);
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
      [60, "seconds", 1], // 60
      [120, "1 minute ago", "1 minute from now"], // 60*2
      [3600, "minutes", 60], // 60*60, 60
      [7200, "1 hour ago", "1 hour from now"], // 60*60*2
      [86400, "hours", 3600], // 60*60*24, 60*60
      [172800, "Yesterday", "Tomorrow"], // 60*60*24*2
      [604800, "days", 86400], // 60*60*24*7, 60*60*24
      [1209600, "Last week", "Next week"], // 60*60*24*7*4*2
      [2419200, "weeks", 604800], // 60*60*24*7*4, 60*60*24*7
      [4838400, "Last month", "Next month"], // 60*60*24*7*4*2
      [29030400, "months", 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
      [58060800, "Last year", "Next year"], // 60*60*24*7*4*12*2
      [2903040000, "years", 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
      [5806080000, "Last century", "Next century"], // 60*60*24*7*4*12*100*2
      [58060800000, "centuries", 2903040000], // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
    ];
    var seconds = (+new Date() - time) / 1000,
      token = "ago",
      list_choice = 1;

    if (seconds == 0) {
      return "Just now";
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

  useEffect(() => {
    setMaombiKamili(userVerificationPending);
    setKasoro(userMissingCredentials);
  }, []);

  return (
    <div className={Styles.container}>
      <div className={Styles.innerContainer}>
        <Toaster position="top-center" />
        <div className={Styles.containerBody}>
          <div className={Styles.leftInnercontainerBody}>
            <div className={Styles.leftInner}>
              <div className={Styles.containerHeader}>
                <div className={Styles.TopicHeader}>Imani Cathedral</div>
              </div>
              <div className={Styles.scroller}>
                <div className={Styles.containerBody}>
                  <div className={Styles.TopicHeaderNotes}>
                    Usajili Washarika
                  </div>
                  <div
                    ref={maombiYaliokamilika}
                    id="maombiYaliokamilika"
                    onClick={(e) => handleNav(e.currentTarget.id)}
                    className={Styles.topicTittle}
                  >
                    <Badge badgeContent={maombiKamili} color="primary">
                      <UserKamili size={18} />
                    </Badge>
                    <div className={Styles.text}>Usajiri kamili</div>
                  </div>
                  <div
                    ref={maombiKasoro}
                    id="maombiKasoro"
                    onClick={(e) => handleNav(e.currentTarget.id)}
                    className={Styles.topicTittle}
                  >
                    <Badge badgeContent={kasoro} color="primary">
                      <UserKasoro size={18} />
                    </Badge>
                    <div className={Styles.text}>Usajiri Kasoro</div>
                  </div>
                  <div className={Styles.TopicHeaderNotes}>Matoleo</div>
                  <div
                    ref={sadakaAhadi}
                    id="sadakaAhadi"
                    onClick={(e) => handleNav(e.currentTarget.id)}
                    className={Styles.topicTittle}
                  >
                    <BsInboxesFill size={25} />
                    <div className={Styles.text}>Sadaka ya Ahadi</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* //!start of default desplay */}
          <div className={Styles.rightInnercontainerBody}>
            <div className={Styles.mobile}>
              <Drawer
                textHeader={"Imani Admin"}
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
                          Karibu Kwenye Akaunti Ya Usimamizi
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {navValue == "maombiYaliokamilika" && (
                  <div className={Styles.rightInnercontainerBody}>
                    <div className={Styles.subject}>
                      <div className={Styles.subjectHeader}>
                        <div className={Styles.subjectHeaderText}>
                          Maombi Washarika Yaliyokamilishwa Vigezo
                        </div>
                      </div>
                    </div>
                    <div className={Styles.subjectBody}>
                      {userUsajiliSuccess.map((user: user) => (
                        <CardBox
                          key={user.id}
                          label={user.name}
                          id={user.id}
                          published={""}
                          link={""}
                          time={timeAgo(user.dateJoined)}
                        />
                      ))}
                    </div>
                  </div>
                )}
                {navValue == "maombiKasoro" && (
                  <div className={Styles.rightInnercontainerBody}>
                    <div className={Styles.subject}>
                      <div className={Styles.subjectHeader}>
                        <div className={Styles.subjectHeaderText}>
                          Maombi Washarika Yasiyo Na Vigezo
                        </div>
                      </div>
                      <div className={Styles.subjectBody}>
                        {userUsajiliError.map((user: user) => (
                          <CardBox
                            key={user.id}
                            label={user.name}
                            id={user.id}
                            published={""}
                            link={""}
                            time={timeAgo(user.dateJoined)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {navValue == "sadakaAhadi" && (
                  <div className={Styles.rightInnercontainerBody}>
                    <div className={Styles.subject}>
                      <div className={Styles.subjectHeader}>
                        <div className={Styles.subjectHeaderText}>
                          Karibu Kwenye Akaunti Ya Sadaka Ya Ahadi
                        </div>
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
