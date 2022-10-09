/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/react-in-jsx-scope */
import { ChangeEvent, useRef } from "react";
import Styles from "../styles/account.module.scss";
import Avatar from "@mui/material/Avatar";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import Loader from "../components/tools/loader";
import Image from "next/image";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { prisma } from "../db/prisma";
import CardBox from "../components/tools/cardBoxWithView";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { FaQuoteLeft } from "react-icons/fa";
import { FaQuoteRight } from "react-icons/fa";

import { getSession } from "next-auth/react";
import Link from "next/link";
import ProgressBar from "../components/tools/ProgressBar";

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
      ahadi: true,
      nenoLaSiri: true,
      sadaka: {
        orderBy: {
          tarehe: "desc",
        },
        select: {
          id: true,
          tarehe: true,
          amount: true,
        },
      },
    },
  });
  const userfound = await JSON.parse(JSON.stringify(userFromServer));

  const userSadaka = await prisma.sadaka.aggregate({
    where: {
      user: {
        bahasha: session.user!.email,
      },
    },
    _sum: {
      amount: true,
    },
  });
  const totalUserSadaka = await JSON.parse(JSON.stringify(userSadaka));

  return {
    props: { userfound, totalUserSadaka },
  };
};

const Notes = ({
  userfound,
  totalUserSadaka,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const password = useRef<HTMLInputElement>(null!);
  const password1 = useRef<HTMLInputElement>(null!);
  const password2 = useRef<HTMLInputElement>(null!);
  const [resetPassword, setResetPassword] = useState(false);
  const [loadingDisplay, setLoadingDisplay] = useState(false);
  const [onlyOnce, setONlyOnce] = useState(true);
  const [passChange, setPassChange] = useState({
    password: "",
    password1: "",
    password2: "",
    id: userfound.id,
  });
  const [sadakaAsilimia, setSadakaAsilimia] = useState(0);

  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);

  const handletextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setPassChange({ ...passChange, [name]: value });
    password.current.style.color = "black";
    password1.current.style.color = "black";
    password2.current.style.color = "black";
  };
  const togglePasswordSignUp = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      password1.current.type = "text";
      password2.current.type = "text";
      password.current.type = "text";
    } else {
      password1.current.type = "password";
      password2.current.type = "password";
      password.current.type = "password";
    }
  };
  const reset = () => {
    setResetPassword(!resetPassword);
  };
  const sendToDatabase = (hash: string) => {
    const database = {
      nenoLaSiri: hash,
      id: userfound.id,
    };
    axios({
      method: "post",
      url: "http://localhost:3000/api/badiliNenoSiri",
      data: database,
    })
      .then(function (response) {
        // handle success
        setPassChange({
          password: "",
          password1: "",
          password2: "",
          id: userfound.id,
        });
        setLoadingDisplay(false);
        if (response.data.type == "success") {
          notifySuccess(response.data.message);
          setResetPassword(!resetPassword);
        } else {
          notifyError(response.data.message);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };
  const resetPasswordNow = async () => {
    if (
      passChange.password1 != "" &&
      passChange.password2 != "" &&
      passChange.password != ""
    ) {
      //
      console.log("sasa : " + userfound.nenoLaSiri);
      console.log("jipya : " + passChange.password);

      const comaparison = passChange.password === userfound.nenoLaSiri;
      if (comaparison) {
        if (passChange.password1 == passChange.password2) {
          setLoadingDisplay(true);
          sendToDatabase(passChange.password1);
        } else {
          password1.current.focus();
          password1.current.style.color = "red";
          password2.current.style.color = "red";
          notifyError("Neno la siri halifanani.");
        }
      } else {
        notifyError("Ingiza Neno la Siri Sahihi");
        password.current.focus();
        password.current.style.color = "red";
      }
    } else {
      notifyError("Jaza nafasi zote zilizo wazi.");
    }
  };

  function customTruncate(str: string, size: number) {
    return str.length > size ? str.slice(0, size) + "..." : str;
  }

  const handleUpdateOrder = () => {};

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
      return "Leo";
    } else if (diffYears === 0 && diffDays === 1) {
      return "Jana";
    } else if (diffYears === 0 && diffDays === -1) {
      return "Kesho";
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

  useEffect(() => {
    let value = (totalUserSadaka._sum.amount / userfound.ahadi) * 100;
    setSadakaAsilimia(Math.round(value));
  }, []);

  return (
    <div className={Styles.container}>
      <Toaster position="top-center" reverseOrder={false} />
      <div className={Styles.innerContainer}>
        {!resetPassword && (
          <>
            <div className={Styles.header}>
              <Avatar className={Styles.avatar}>
                <Image
                  alt=""
                  src={userfound.image}
                  objectFit={"cover"}
                  placeholder="blur"
                  blurDataURL={userfound.image}
                  width={215}
                  height={250}
                  objectPosition={"center"}
                />
              </Avatar>
              <div className={Styles.list}>
                <ul>
                  <li className={Styles.userName}>{userfound.username}</li>
                  <li>{userfound.name}</li>
                  <li>Ahadi: {userfound.ahadi.toLocaleString()}</li>
                  <li>
                    <Link href="/Admin">
                      <a>Msimamizi</a>
                    </Link>
                  </li>
                  {userfound?.password != "googleHasIt" && (
                    <li className={Styles.edit} onClick={reset}>
                      Badili Neno la Siri
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className={Styles.quote}>
              <div className={Styles.kwanza}>
                <FaQuoteLeft size={32} className={Styles.quotation} />
              </div>
              <div className={Styles.words}>
                Mheshimu Mwenyezi Mungu kwa mali yako na kwa malimbuko ya mazao
                yako yote. Hapo ghala zako zitajaa nafaka na mapipa yako
                yatafurika divai mpya.
              </div>
              <div className={Styles.mwisho}>
                <FaQuoteRight size={32} className={Styles.quotation} />
              </div>
            </div>
            <div className={Styles.methali}> Methali 3:9-10 </div>
            <div className={Styles.progress}>
              <ProgressBar value={sadakaAsilimia} />
            </div>
            <div className={Styles.progressText}>
              {`Umefikia asilimia ${sadakaAsilimia} ya ahadi yako.`}
            </div>
            <div className={Styles.account}>
              {sadakaAsilimia > 0 ? (
                <>
                  <div className={Styles.header}>Matoleo ya Ahadi</div>
                  <div className={Styles.list}>
                    <div className={Styles.table}>
                      <table>
                        <thead>
                          <tr>
                            <th>Siku ya Toleo</th>
                            <th>Kiasi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {userfound?.sadaka.map(
                            (furushi: {
                              id: number;
                              tarehe: string;
                              amount: number;
                            }) => (
                              <tr key={furushi.id}>
                                <td>{formatDate(furushi.tarehe)}</td>
                                <td>{furushi.amount.toLocaleString()}</td>
                              </tr>
                            )
                          )}
                          <tr className={Styles.jumla}>
                            <td>Jumla ya Sadaka</td>
                            <td>
                              {totalUserSadaka._sum.amount.toLocaleString()}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              ) : (
                <div className={Styles.headerAhadi}>
                  Ahadi yako bado haujaipa kipaumbele.
                </div>
              )}
            </div>
          </>
        )}
        <div className={Styles.resetPassword}>
          {resetPassword && (
            <form className={Styles.form}>
              <div className={Styles.logInHeader}>
                <div className={Styles.text}>Badili Neno La Siri</div>
              </div>
              <div className={Styles.credential}>
                <input
                  ref={password}
                  type="password"
                  value={passChange.password}
                  placeholder={"Neno la Siri la Sasa"}
                  name={"password"}
                  onChange={(event) => {
                    handletextChange(event);
                  }}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                />
                <input
                  ref={password1}
                  type="password"
                  value={passChange.password1}
                  placeholder={"Neno la Siri Jipya"}
                  name={"password1"}
                  onChange={(event) => {
                    handletextChange(event);
                  }}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                />
                <input
                  ref={password2}
                  type="password"
                  value={passChange.password2}
                  placeholder={"Rudia Neno la Siri Jipya"}
                  name={"password2"}
                  onChange={(event) => {
                    handletextChange(event);
                  }}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                />
                <div className={Styles.check}>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      togglePasswordSignUp(e);
                    }}
                  />
                  Onyesha Neno la Siri
                </div>
              </div>
              <div onClick={resetPasswordNow} className={Styles.button}>
                Badili Neno la Siri
              </div>
              <div className={Styles.separator}>
                <hr className={Styles.line} />
                <hr className={Styles.line} />
              </div>
              <div className={Styles.buttonSignUp} onClick={reset}>
                <div>Rudi kwenye Akaunti</div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;

//*Removing default search bar :)
Notes.getLayout = function PageLayout(page: ReactNode) {
  return <>{page}</>;
};
