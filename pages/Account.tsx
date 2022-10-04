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
    },
  });
  const userfound = await JSON.parse(JSON.stringify(userFromServer));

  return {
    props: { userfound },
  };
};

const Notes = ({
  userfound,
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
  const [sadakaAsilimia, setSadakaAsilimia] = useState(30);

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
      password: hash,
      id: userfound.id,
    };
    axios({
      method: "post",
      url: "http://localhost:3000/api/updatePassword",
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
      const comaparison = passChange.password === userfound.password;
      if (comaparison) {
        if (passChange.password1 == passChange.password2) {
          setLoadingDisplay(true);
          sendToDatabase(passChange.password1);
        } else {
          password1.current.focus();
          password1.current.style.color = "red";
          password2.current.style.color = "red";
          notifyError("Password does not match.");
        }
      } else {
        notifyError("Enter Correct Password");
        password.current.focus();
        password.current.style.color = "red";
      }
    } else {
      notifyError("Enter all details.");
    }
  };

  function customTruncate(str: string, size: number) {
    return str.length > size ? str.slice(0, size) + "..." : str;
  }

  const handleUpdateOrder = () => {};

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
                  <li>
                    <Link href="/Admin">
                      <a>Msimamizi</a>
                    </Link>
                  </li>
                  {userfound?.password != "googleHasIt" && (
                    <li className={Styles.edit} onClick={reset}>
                      Edit Password
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
            <div className={Styles.methali}>Methali 3:9-10</div>
            <div className={Styles.progress}>
              <ProgressBar value={sadakaAsilimia} />
            </div>
            <div className={Styles.progressText}>
              {`Umefikia asilimia ${sadakaAsilimia} ya ahadi yako.`}
            </div>
            <div className={Styles.account}>
              <div className={Styles.header}>Matoleo ya Ahadi</div>
              <div className={Styles.list}>
                <div className={Styles.table}>
                  <table>
                    <thead>
                      <tr>
                        <th>Tarehe</th>
                        <th>Kiasi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {userfound?.vifurushi.map(
                        (furushi: { name: string; value: number }) => (
                          <tr key={furushi.name}>
                            <td>
                              {furushi.name
                                .replace(/([A-Z])/g, " $1")
                                // uppercase the first character
                                .replace(/^./, function (str) {
                                  return str.toUpperCase();
                                })}
                            </td>
                            <td>{furushi.value}</td>
                          </tr>
                        )
                      )} */}
                      <tr>
                        <td>21 Juni 2022</td>
                        <td>5000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
        <div className={Styles.resetPassword}>
          {resetPassword && (
            <form className={Styles.form}>
              <div className={Styles.logInHeader}>
                <div>
                  <AutoStoriesIcon className={Styles.icon} />
                </div>
                <div className={Styles.text}>Reset Password</div>
              </div>
              <div className={Styles.credential}>
                <input
                  ref={password}
                  type="password"
                  value={passChange.password}
                  placeholder={"Current Password"}
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
                  placeholder={"New Password"}
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
                  placeholder={"Retype New Password"}
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
                  Show Password
                </div>
              </div>
              <div onClick={resetPasswordNow} className={Styles.button}>
                Reset Password
              </div>
              <div className={Styles.separator}>
                <hr className={Styles.line} />
                <hr className={Styles.line} />
              </div>
              <div className={Styles.buttonSignUp} onClick={reset}>
                <div>Back to Account</div>
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
