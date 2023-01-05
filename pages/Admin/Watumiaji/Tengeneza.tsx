import { ChangeEvent, ReactNode, useEffect, useRef, useState } from "react";
import Styles from "../../../styles/sajili.module.scss";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/router";
import Stepper from "../../../components/tools/Stepper";
import ImageUpload from "../../../components/tools/ImageUpload";
import SelectMiu from "../../../components/tools/SelectMui";
import Loader from "../../../components/tools/loaderWait";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { prisma } from "../../../db/prisma";
import InputTextMui from "../../../components/tools/InputTextMui";
import { getSession } from "next-auth/react";
//! insta @ johnsavanter

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
  // const jumuiyaFromServer = await prisma.jumuiya.findMany({
  //   where: {},
  //   select: {
  //     id: true,
  //     name: true,
  //   },
  // });
  // const jumuiyaListFull = await JSON.parse(JSON.stringify(jumuiyaFromServer));

  return {
    props: {},
  };
};

type formData = {
  label: string;
  value: string;
}[];

const SignIn = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [loadingDisplay, setLoadingDisplay] = useState(false);
  const [binafsi, setBinafsi] = useState(true);
  const [mawasiliano, setMawasiliano] = useState(false);
  const [mwisho, setMwisho] = useState(false);
  const [step, setStep] = useState(0);
  const [taarifa, setTaarifa] = useState("");
  const [image, setImage] = useState<string | Blob>("");
  const [uploadData, setUploadData] = useState(0);
  const [submit, setSubmit] = useState(true);

  const [userDetails, setUserDetails] = useState({
    jinaKwanza: "",
    jinaKati: "",
    jinaMwisho: "",
    jinsia: "",
    nambaYaSimu: "",
    userName: "",
    password1: "",
    password2: "",
    image: "",
    bio: "",
  });

  const password1 = useRef<HTMLInputElement>(null!);
  const password2 = useRef<HTMLInputElement>(null!);
  const jinaKwanza = useRef<HTMLInputElement>(null!);
  const jinaKati = useRef<HTMLInputElement>(null!);
  const jinaMwisho = useRef<HTMLInputElement>(null!);
  const nambaYaSimu = useRef<HTMLInputElement>(null!);

  const { push } = useRouter();

  const notify = (message: string) => toast(message);
  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);
  //! insta @ johnsavanter

  let handletextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    let name = e.target.name;
    setUserDetails({ ...userDetails, [name]: value });
    // username.current.style.color = "black";
    // password1.current.style.color = "black";
    // password2.current.style.color = "black";
  };
  //! insta @ johnsavanter

  let togglePasswordSignUp = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      password1.current.type = "text";
      password2.current.type = "text";
    } else {
      password1.current.type = "password";
      password2.current.type = "password";
    }
  };

  let signTo = () => {
    push(`/Admin`);
  };

  let checkUser = () => {
    setSubmit(false);
    const data = {
      name: `${
        userDetails.jinaKwanza.charAt(0).toUpperCase() +
        userDetails.jinaKwanza.toLowerCase().slice(1)
      } ${
        userDetails.jinaKati.charAt(0).toUpperCase() +
        userDetails.jinaKati.toLowerCase().slice(1)
      } ${
        userDetails.jinaMwisho.charAt(0).toUpperCase() +
        userDetails.jinaMwisho.toLowerCase().slice(1)
      }`,
    };
    setLoadingDisplay(true);
    axios
      .post("/api/getUser", data)
      .then(function (response) {
        //responce
        const userData = JSON.parse(JSON.stringify(response.data));

        if (userData) {
          notifyError("Tayari kuna akaunti yenye jina hili.");
          setLoadingDisplay(false);
          setSubmit(true);
          // username.current.focus();
          // username.current.style.color = "red";
        } else {
          uploadToServer();
        }
      })
      .catch(function (error) {
        // handle error
        setLoadingDisplay(false);
      });
  };

  let registration = (location: string) => {
    let dataUser = {
      name: `${
        userDetails.jinaKwanza.charAt(0).toUpperCase() +
        userDetails.jinaKwanza.toLowerCase().slice(1)
      } ${
        userDetails.jinaKati.charAt(0).toUpperCase() +
        userDetails.jinaKati.toLowerCase().slice(1)
      } ${
        userDetails.jinaMwisho.charAt(0).toUpperCase() +
        userDetails.jinaMwisho.toLowerCase().slice(1)
      }`,
      jinsia: userDetails.jinsia,
      nambaYaSimu: userDetails.nambaYaSimu,
      nenoLaSiri: userDetails.password1,
      image: location.length > 0 ? location : userDetails.image,
      bio: userDetails.bio,
      userName: userDetails.userName,
    };

    axios
      .post("/api/createUser", dataUser)
      .then(function (response) {
        //responce
        const user = JSON.parse(JSON.stringify(response.data));
        if (user) {
          notifySuccess(response.data.message);
          setLoadingDisplay(false);

          signTo();
        } else {
          notifyError(response.data.message);
          setLoadingDisplay(false);
        }
      })
      .catch(function (error) {
        // handle error
      });
  };

  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;

  let headerTaarifa = ["Taarifa Binafsi", "Mawasiliano", "Hitimisha"];

  let handleNyuma = () => {
    if (step > 0) {
      changer(step - 1);
      setTaarifa(headerTaarifa[step - 1]);
      smoothScroll();
      setStep(step - 1);
    }
  };

  let handleMbele = () => {
    if (verify(step)) {
      if (step < 2) {
        setStep(step + 1);
        setTaarifa(headerTaarifa[step + 1]);
        smoothScroll();
        changer(step + 1);
      }
    } else {
      notifyError("Jaza nafasi zote zilizo wazi");
    }
  };

  const verfyAndSubmit = () => {
    const { password1, password2, userName } = userDetails;
    if (password1 != "" && password2 != "" && userName != "") {
      if (password1 == password2) {
        checkUser();
      } else {
        notifyError("Ingiza neno la siri linalofanana");
        setLoadingDisplay(false);
      }
    } else {
      notifyError("Hakikisha umejaza nafasi zote.");
      setLoadingDisplay(false);
    }
  };

  const verify = (step: number) => {
    console.log(userDetails);
    const {
      jinaKwanza,
      jinaKati,
      jinaMwisho,
      jinsia,
      bio,
      nambaYaSimu,
      password1,
      password2,
      userName,
    } = userDetails;
    switch (step) {
      case 0:
        if (
          jinaKwanza != "" &&
          jinaKati != "" &&
          jinaMwisho != "" &&
          jinsia != ""
        ) {
          return true;
        } else {
          return false;
        }
        break;
      case 1:
        if (nambaYaSimu != "" && bio != "") {
          return true;
        } else {
          return false;
        }
        break;
      case 2:
        if (userName != "" && password1 != "" && password2 != "") {
          return true;
        } else {
          return false;
        }
        break;

      default:
        return false;
        break;
    }
  };

  let smoothScroll = () => {
    scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  let changer = (value: number) => {
    switch (value) {
      case 0:
        setBinafsi(true);
        setMawasiliano(false);
        setMwisho(false);
        break;
      case 1:
        setBinafsi(false);
        setMawasiliano(true);
        setMwisho(false);
        break;
      case 2:
        setBinafsi(false);
        setMawasiliano(false);
        setMwisho(true);
        break;
      case 3:
        setBinafsi(false);
        setMawasiliano(false);
        setMwisho(true);
        break;

      default:
        break;
    }
  };

  let uploadForServer = (image: string | Blob) => {
    setImage(image);
    //!TO BE CALLED FOR UPLOAD
    // uploadToServer();
  };

  //! for uploading
  const uploadToServer = async () => {
    //setShowUpload(true);
    if (typeof image === "string") {
      registration("");
    } else {
      const body = new FormData();
      body.append("file", image);
      axios
        .post("https://database.co.tz/api/uploadImani", body, {
          onUploadProgress: (progressEvent) => {
            console.log(
              "Upload Progress: " +
                Math.round(
                  (progressEvent.loaded / progressEvent.total!) * 100
                ) +
                "%"
            );
            setUploadData(
              Math.round((progressEvent.loaded / progressEvent.total!) * 100)
            );
          },
        })
        .then(
          (res) => {
            console.log(res);
            let location = res.data;
            registration(location);
          },
          (err) => {
            //some error
            notifyError(
              "Kuna kitu hakijaenda sawa, mjulishe msimamizi wa mfumo"
            );
            setLoadingDisplay(false);
          }
        );
    }
  };

  let handleSelectJinsia = (value: string) => {
    setUserDetails({
      ...userDetails,
      jinsia: value,
    });
  };

  let handleTextInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string
  ) => {
    let value = event.currentTarget.value;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const jinsiaList: formData = [
    { label: "Mwanaume", value: "Mwanaume" },
    { label: "Mwanamke", value: "Mwanamke" },
  ];

  useEffect(() => {}, [step, userDetails, uploadData]);

  return (
    <div className={Styles.container}>
      <Toaster position="top-center" />
      <div className={Styles.innerContainer}>
        <div>
          <form
            className={Styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              verfyAndSubmit();
            }}
          >
            <div className={Styles.logInHeader}>
              <div className={Styles.text}>Sajili Akaunti Mpya</div>
            </div>
            <Stepper value={step} />
            <div className={Styles.taarifaText}>{taarifa}</div>

            <div className={Styles.credential}>
              {binafsi && (
                <>
                  <div className={Styles.inputBox}>
                    <input
                      ref={jinaKwanza}
                      type="text"
                      required
                      value={userDetails.jinaKwanza}
                      placeholder={``}
                      name={"jinaKwanza"}
                      onChange={(event) => {
                        handletextChange(event);
                      }}
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck={false}
                    />
                    <span>Jina La Kwanza</span>
                  </div>
                  <div className={Styles.inputBox}>
                    <input
                      ref={jinaKati}
                      type="text"
                      required
                      value={userDetails.jinaKati}
                      placeholder={``}
                      name={"jinaKati"}
                      onChange={(event) => {
                        handletextChange(event);
                      }}
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck={false}
                    />
                    <span>Jina La Kati</span>
                  </div>
                  <div className={Styles.inputBox}>
                    <input
                      ref={jinaMwisho}
                      type="text"
                      required
                      value={userDetails.jinaMwisho}
                      placeholder={``}
                      name={"jinaMwisho"}
                      onChange={(event) => {
                        handletextChange(event);
                      }}
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck={false}
                    />
                    <span>Jina La Mwisho</span>
                  </div>

                  <SelectMiu
                    show={true}
                    displayLabel="Jinsia"
                    forms={jinsiaList}
                    handlechange={handleSelectJinsia}
                    value={userDetails.jinsia}
                  />
                </>
              )}
              {mawasiliano && (
                <>
                  <div className={Styles.inputBox}>
                    <input
                      ref={nambaYaSimu}
                      required
                      type="number"
                      value={userDetails.nambaYaSimu}
                      placeholder={``}
                      name={"nambaYaSimu"}
                      onChange={(event) => {
                        handletextChange(event);
                      }}
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck={false}
                    />
                    <span>Namba Yako Ya Simu</span>
                  </div>
                  <InputTextMui
                    label="Maelezo Mafupi Kuhusu Mtumiaji"
                    content={userDetails.bio}
                    name="bio"
                    handleChange={handleTextInput}
                  />
                </>
              )}
              {mwisho && (
                <>
                  <ImageUpload
                    uploadToServer={uploadForServer}
                    imageReady={image}
                  />
                  <div className={Styles.credential}>
                    <div className={Styles.inputBox}>
                      <input
                        type="name"
                        value={userDetails.userName}
                        placeholder={``}
                        name={`userName`}
                        onChange={(event) => {
                          handletextChange(event);
                        }}
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck={false}
                        required
                      />
                      <span>Jina La Mtumiaji</span>
                    </div>
                    <div className={Styles.inputBox}>
                      <input
                        ref={password1}
                        type="password"
                        value={userDetails.password1}
                        placeholder={``}
                        name={`password1`}
                        onChange={(event) => {
                          handletextChange(event);
                        }}
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck={false}
                        required
                      />
                      <span>Neno La Siri</span>
                    </div>
                    <div className={Styles.inputBox}>
                      <input
                        required
                        ref={password2}
                        type="password"
                        value={userDetails.password2}
                        placeholder={``}
                        name={`password2`}
                        onChange={(event) => {
                          handletextChange(event);
                        }}
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck={false}
                      />
                      <span>Ingiza Tena Neno La Siri</span>
                    </div>
                    <div className={Styles.checkToggle}>
                      <input
                        required
                        type="checkbox"
                        onChange={(e) => {
                          togglePasswordSignUp(e);
                        }}
                      />
                      Onyesha Neno La Siri
                    </div>
                  </div>
                </>
              )}
            </div>
          </form>
        </div>
        <div className={Styles.buttonHolder}>
          <div>
            {step > 0 && submit && (
              <div className={Styles.button} onClick={handleNyuma}>
                Nyuma
              </div>
            )}
          </div>
          <div>
            {step < 2 ? (
              <div className={Styles.button} onClick={handleMbele}>
                Mbele
              </div>
            ) : step > 1 ? (
              <div className={Styles.buttonHolderCreate}>
                {loadingDisplay ? (
                  uploadData < 100 ? (
                    <div className={Styles.buttonSajili}>
                      <Loader sms={`Akaunti Inatengenezwa - ${uploadData}%`} />
                    </div>
                  ) : (
                    <div className={Styles.buttonSajili}>
                      <Loader sms={"Malekebisho ya mwisho.."} />
                    </div>
                  )
                ) : (
                  <div onClick={verfyAndSubmit} className={Styles.button}>
                    Tengeneza Akaunti
                  </div>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        {/* <div>
          <div className={Styles.separator}>
            <hr className={Styles.line} />
            <div className={Styles.or}>Tayari Mtumiaji?</div>
            <hr className={Styles.line} />
          </div>
          <div className={Styles.buttonSignUp} onClick={signTo}>
            <div>Ingia Kwenye Akaunti Yako</div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default SignIn;

//*Removing default search bar :)
SignIn.getLayout = function PageLayout(page: ReactNode) {
  return <>{page}</>;
};
