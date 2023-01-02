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

  const [formOptions, setFormOptions] = useState<formData>([]);
  const [subjectOptions, setSubjectOptions] = useState<formData>([]);
  const [topicOptions, setTopicOptions] = useState<formData>([]);
  const [change, setChange] = useState(0);
  const [hideShow, setHideShow] = useState(false);
  const [topicDetails, setTopicDetails] = useState({
    formId: "",
    subjectId: "",
  });

  const [topicSelectValue, setTopicSelectValue] = useState({
    formId: "",
    subjectId: "",
    topicId: "",
    content: "",
    userId: "",
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
    setTopicSelectValue({ ...topicSelectValue, content: convertedData });
  };

  let handleSelectSubject = (value: string) => {
    setTopicDetails({ ...topicDetails, subjectId: value });
    setTopicSelectValue({ ...topicSelectValue, subjectId: value });
    setChange(change + 1);
  };

  let handleSelectForm = (value: string) => {
    setTopicDetails({ ...topicDetails, formId: value });
    setTopicSelectValue({ ...topicSelectValue, formId: value });
    setChange(change + 1);
  };

  let handleSelectTopic = (value: string) => {
    setTopicSelectValue({
      ...topicSelectValue,
      topicId: value,
      userId: userfound.id,
    });
  };

  let handleCreateNotes = () => {
    if (
      topicSelectValue.formId != "" &&
      topicSelectValue.subjectId != "" &&
      topicSelectValue.topicId &&
      topicSelectValue.content.length > 200
    ) {
      checkNotes();
      setLoad(true);
    } else {
      if (topicSelectValue.content.length < 200) {
        notifyError("Notes content should exceed 200 characters..");
      } else {
        notifyError("Fill in all fields including selections.");
      }
    }
  };

  let sendToDatabase = () => {
    axios({
      method: "post",
      url: url + "/api/addNotes",
      data: topicSelectValue,
    })
      .then(function (response) {
        // handle success
        setTopicSelectValue({
          formId: "",
          subjectId: "",
          topicId: "",
          content: "",
          userId: "",
        });
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

  let checkNotes = () => {
    axios({
      method: "post",
      url: url + "/api/notes",
      data: topicSelectValue,
    })
      .then(function (response) {
        const notesFromServer = JSON.parse(JSON.stringify(response.data));
        // handle success
        if (notesFromServer.length > 0) {
          notifyError("Database contain another copy of this note.");
          setLoad(false);
        } else {
          sendToDatabase();
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        notifyError("Something went wrong.");
        setLoad(false);
      })
      .then(function () {
        // always executed
      });
  };

  let handleOnReady = () => {
    console.log("Editor is ready");
  };

  return (
    <div className={Styles.container}>
      <Toaster position="top-center" />
      <div className={Styles.innerContainer}>
        <div className={Styles.content}>
          <div className={Styles.mainContent}>
            <CkEditor
              content={handleContent}
              dataCk={""}
              onReadyToStart={handleOnReady}
            />
          </div>
          <div className={Styles.controlContent}>
            <SelectMiu
              show={true}
              displayLabel="Select Subject"
              forms={subjectOptions}
              handlechange={handleSelectSubject}
              value={topicSelectValue.subjectId}
            />
            <SelectMiu
              show={true}
              displayLabel="Select Form"
              forms={formOptions}
              handlechange={handleSelectForm}
              value={topicSelectValue.formId}
            />
            {hideShow && (
              <SelectMiu
                show={true}
                displayLabel="Select Topic"
                forms={topicOptions}
                handlechange={handleSelectTopic}
                value={""}
              />
            )}
          </div>
        </div>
        <div>
          {loading ? (
            <div className={Styles.imageSelect}>
              <LoaderWait sms={"Wait.."} />
            </div>
          ) : (
            <div onClick={handleCreateNotes} className={Styles.imageSelect}>
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
