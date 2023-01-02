import React, {
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { prisma } from "../../../db/prisma";
import Styles from "../../../styles/notesMaker.module.scss";
import SelectMiu from "../../../components/tools/SelectMui";
import toast, { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";
import axios from "axios";
import { NavContext } from "../../../components/context/StateContext";
import { useRouter } from "next/router";

//load when browser kicks in, on page load
const CkEditor = dynamic(() => import("../../../components/tools/Ck"), {
  ssr: false,
});

import { getSession } from "next-auth/react";
import LoaderWait from "../../../components/tools/loaderWait";
import InputTextMui from "../../../components/tools/InputTextMui";
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const url = process.env.MAIN_URL;

  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: `/Auth/SignIn?callbackUr=/`,
  //       permanent: false,
  //     },
  //   };
  // }
  // const userFromServer = await prisma.users.findFirst({
  //   where: {
  //     username: session.user.email,
  //   },
  //   select: {
  //     isAdmin: true,
  //     id: true,
  //   },
  // });
  // const userfound = await JSON.parse(JSON.stringify(userFromServer));

  // if (!userfound.isAdmin) {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  // }
  // const formsFromServer: userData = await prisma.form.findMany({
  //   select: {
  //     id: true,
  //     formName: true,
  //   },
  // });
  // const forms = JSON.parse(JSON.stringify(formsFromServer));

  // const subjectsFromServer = await prisma.subject.findMany({
  //   select: {
  //     id: true,
  //     subjectName: true,
  //   },
  // });
  // const subjects = JSON.parse(JSON.stringify(subjectsFromServer));

  await prisma.$disconnect();
  return {
    props: {
      // forms,
      // subjects,
      // userfound,
      url,
    },
  };
};

type userData = {
  id: number;
  formName: string;
}[];

type formData = {
  label: string;
  value: string;
}[];

const Notes = ({
  forms,
  subjects,
  userfound,
  url,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { navActive, setNavActive } = useContext(NavContext);

  useEffect(() => {
    setNavActive("Admin");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navActive]);

  const [change, setChange] = useState(0);
  const [kundiHabari, setKundiHabari] = useState<formData>([]);

  const [andikoDetails, setAndikoDetails] = useState({
    title: "",
    subTitle: "",
    body: "",
    tag: "",
  });
  const [loading, setLoad] = useState(false);

  const notify = (message: string) => toast(message);
  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);

  //!delay redirect
  const router = useRouter();
  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  let delayRedirect = async () => {
    await new Promise((f) =>
      setTimeout(() => {
        router.back();
      }, 1000)
    );
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [change]);

  let handleContent = (data: string) => {
    let convertedData = data.replaceAll(
      `img`,
      `Image layout="fill" objectFit="cover"`
    );
    setAndikoDetails({ ...andikoDetails, body: convertedData });
  };

  let handleSelectKundiHabari = (value: string) => {
    setAndikoDetails({ ...andikoDetails, tag: value });
  };

  let handleTengenezaAndiko = () => {
    if (
      andikoDetails.title != "" &&
      andikoDetails.subTitle != "" &&
      andikoDetails.tag != "" &&
      andikoDetails.body.length > 200
    ) {
      setLoad(true);
      sendToDatabase();
    } else {
      notifyError("Fill in all fields including selections.");
    }
  };

  let sendToDatabase = () => {
    axios({
      method: "post",
      url: url + "/api/addNotes",
      data: andikoDetails,
    })
      .then(function (response) {
        // handle success

        let jibu: string = response.data.message;
        let type: string = response.data.type;

        if (type == "success") {
          notifySuccess(jibu);
          setLoad(false);
          delayRedirect();
        } else {
          notifyError(jibu);
          setLoad(false);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        notifyError("Error has occured, try later.");
        setLoad(false);
      })
      .then(function () {
        // always executed
      });
  };

  let handleOnReady = () => {
    console.log("Editor is ready");
  };

  let handletextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    let name = e.target.name;
    setAndikoDetails({ ...andikoDetails, [name]: value });
  };

  return (
    <div className={Styles.container}>
      <Toaster position="top-center" />
      <div className={Styles.innerContainer}>
        <div className={Styles.content}>
          <div className={Styles.mainContent}>
            <div className={Styles.inputBox}>
              <input
                type="text"
                required
                value={andikoDetails.title}
                placeholder={""}
                name={"title"}
                onChange={(event) => {
                  handletextChange(event);
                }}
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
              />
              <span>Kichwa Cha Habari</span>
            </div>
            <div className={Styles.inputBox}>
              <input
                type="text"
                required
                value={andikoDetails.subTitle}
                placeholder={""}
                name={"subTitle"}
                onChange={(event) => {
                  handletextChange(event);
                }}
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
              />
              <span>Muktasari</span>
            </div>
            <CkEditor
              content={handleContent}
              dataCk={""}
              onReadyToStart={handleOnReady}
            />
          </div>
          <div className={Styles.controlContent}>
            <SelectMiu
              show={true}
              displayLabel="Kundi La Habari"
              forms={kundiHabari}
              handlechange={handleSelectKundiHabari}
              value={andikoDetails.tag}
            />
          </div>
        </div>
        <div>
          {loading ? (
            <div className={Styles.imageSelect}>
              <LoaderWait sms={"Wait.."} />
            </div>
          ) : (
            <div onClick={handleTengenezaAndiko} className={Styles.imageSelect}>
              Tengeneza Andiko
            </div>
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
