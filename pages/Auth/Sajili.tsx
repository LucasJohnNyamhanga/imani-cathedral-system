import { ChangeEvent, ReactNode, useEffect, useRef, useState } from "react";
import Styles from "../../styles/sajili.module.scss";
import Loader from "../../components/tools/loader";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import Stepper from "../../components/tools/Stepper";
import ImageUpload from "../../components/tools/ImageUpload";
import SelectMiu from "../../components/tools/SelectMui";
//! insta @ johnsavanter

type formData = {
  label: string;
  value: string;
}[];

const SignIn = ({}) => {
  const [loadingDisplay, setLoadingDisplay] = useState(false);
  const [binafsi, setBinafsi] = useState(true);
  const [mawasiliano, setMawasiliano] = useState(false);
  const [kiroho, setKiroho] = useState(false);
  const [mwisho, setMwisho] = useState(false);
  const [step, setStep] = useState(0);
  const [taarifa, setTaarifa] = useState("Taarifa Binafsi");
  const [showUpload, setShowUpload] = useState(false);
  const [image, setImage] = useState<string | Blob>("");
  const imageUrl = process.env.IMAGE_URL;
  const [uploadData, setUploadData] = useState(0);
  const [haliNdoaList, setHaliNdoaList] = useState<formData>([]);
  const [kataList, setKataList] = useState<formData>([]);
  const [userDetails, setUserDetails] = useState({
    jinaKwanza: "",
    jinaKati: "",
    jinaMwisho: "",
    tareheYaKuzaliwa: "",
    jinsia: "",
    haliYaNdoa: "",
    ainaYaNdoa: "",
    tareheYaNdoa: "",
    jinaLaMwenza: "",
    nambaYaSimu: "",
    nambaYaSimuMwenza: "",
    jumuiya: "",
    wilaya: "",
    kata: "",
    mtaa: "",
    elimu: "",
    kazi: "",
    fani: "",
    ubatizo: "",
    kipaimara: "",
    mezaYaBwana: "",
    bahasha: "",
    ahadi: "",
    password1: "",
    password2: "",
  });

  const password1 = useRef<HTMLInputElement>(null!);
  const password2 = useRef<HTMLInputElement>(null!);
  const jinaKwanza = useRef<HTMLInputElement>(null!);
  const jinaKati = useRef<HTMLInputElement>(null!);
  const jinaMwisho = useRef<HTMLInputElement>(null!);
  const tareheYaKuzaliwa = useRef<HTMLInputElement>(null!);
  const jinsia = useRef<HTMLInputElement>(null!);
  const haliYaNdoa = useRef<HTMLInputElement>(null!);
  const ainaYaNdoa = useRef<HTMLInputElement>(null!);
  const tareheYaNdoa = useRef<HTMLInputElement>(null!);
  const jinaLaMwenza = useRef<HTMLInputElement>(null!);
  const nambaYaSimu = useRef<HTMLInputElement>(null!);
  const nambaYaSimuMwenza = useRef<HTMLInputElement>(null!);
  const jumuiya = useRef<HTMLInputElement>(null!);
  const wilaya = useRef<HTMLInputElement>(null!);
  const kata = useRef<HTMLInputElement>(null!);
  const mtaa = useRef<HTMLInputElement>(null!);
  const elimu = useRef<HTMLInputElement>(null!);
  const kazi = useRef<HTMLInputElement>(null!);
  const fani = useRef<HTMLInputElement>(null!);
  const ubatizo = useRef<HTMLInputElement>(null!);
  const kipaimara = useRef<HTMLInputElement>(null!);
  const mezaYaBwana = useRef<HTMLInputElement>(null!);
  const bahasha = useRef<HTMLInputElement>(null!);
  const ahadi = useRef<HTMLInputElement>(null!);

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
    push(`/Auth/SignIn`);
  };

  let checkUser = () => {
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
      .post("http://localhost:3000/api/getUser", data)
      .then(function (response) {
        //responce
        const userData = JSON.parse(JSON.stringify(response.data));
        console.log(userData);
        setLoadingDisplay(false);
        if (Object.keys(userData).length > 0) {
          notifyError("Tayari kuna akaunti yenye jina hili.");
          // username.current.focus();
          // username.current.style.color = "red";
        }
      })
      .catch(function (error) {
        // handle error
        uploadToServer();
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
      picha: location,
      jinsia: userDetails.jinsia,
      tareheYaKuzaliwa: userDetails.tareheYaKuzaliwa,
      haliYaNdoa: userDetails.haliYaNdoa,
      ainaYaNdoa: userDetails.ainaYaNdoa,
      tareheYaNdoa: userDetails.tareheYaNdoa,
      jinaLaMwenza: userDetails.jinaLaMwenza,
      nambaYaSimu: userDetails.nambaYaSimu,
      nambaYaSimuMwenza: userDetails.nambaYaSimuMwenza,
      jumuiya: userDetails.jumuiya,
      wilaya: userDetails.wilaya,
      kata: userDetails.kata,
      mtaa: userDetails.mtaa,
      elimu: userDetails.elimu,
      kazi: userDetails.kazi,
      fani: userDetails.fani,
      ubatizo: userDetails.ubatizo,
      kipaimara: userDetails.kipaimara,
      mezaYaBwana: userDetails.mezaYaBwana,
      bahasha: userDetails.bahasha,
      ahadi: userDetails.ahadi,
    };

    axios
      .post("http://localhost:3000/api/createUser", dataUser)
      .then(function (response) {
        //responce
        if (response.data.type == "success") {
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

  let headerTaarifa = [
    "Taarifa Binafsi",
    "Mawasiliano Na Makazi",
    "Huduma Za Kiroho",
    "Hitimisha",
  ];

  let handleNyuma = () => {
    if (step > 0) {
      changer(step - 1);
      setTaarifa(headerTaarifa[step - 1]);
      smoothScroll();
      setStep(step - 1);
    }
  };

  let handleMbele = () => {
    if (verify(step))
      if (step < 3) {
        setStep(step + 1);
        setTaarifa(headerTaarifa[step + 1]);
        smoothScroll();
        changer(step + 1);
      }
  };

  const verfyAndSubmit = () => {
    const { password1, password2 } = userDetails;
    if (password1 != "" && password2 != "" && image != "") {
      if (password1 == password2) {
        checkUser();
      } else {
        notifyError("Ingiza neno la siri linalofanana");
      }
    } else {
      notifyError("Hakikisha umepakia picha na kuandika neno la siri");
    }
  };

  const verify = (step: number) => {
    const {
      jinaKwanza,
      jinaKati,
      jinaMwisho,
      tareheYaKuzaliwa,
      jinsia,
      haliYaNdoa,
      ainaYaNdoa,
      tareheYaNdoa,
      jinaLaMwenza,
      nambaYaSimu,
      nambaYaSimuMwenza,
      jumuiya,
      wilaya,
      kata,
      mtaa,
      elimu,
      kazi,
      fani,
      ubatizo,
      kipaimara,
      mezaYaBwana,
      bahasha,
      ahadi,
    } = userDetails;
    switch (step) {
      case 0:
        if (
          jinaKwanza != "" &&
          jinaKati != "" &&
          jinaMwisho != "" &&
          tareheYaKuzaliwa != "" &&
          jinsia != "" &&
          haliYaNdoa != ""
        ) {
          if (haliYaNdoa == "Umeolewa" || haliYaNdoa == "Umeoa") {
            if (ainaYaNdoa != "") {
              if (ainaYaNdoa == "Ndoa ya kikristo") {
                if (tareheYaNdoa != "" && jinaLaMwenza != "") {
                  //notifySuccess("verified, yupo kwenye ndoa");
                  return true;
                } else {
                  notifyError(
                    "Tafadhali jaza tarehe ya ndoa na jina la mwenza."
                  );
                  return false;
                }
              } else {
                //notifySuccess("Ndoa si ya kikristo.");
                return true;
              }
            } else {
              notifyError("Tafadhali jaza aina ya ndoa.");
              return false;
            }
          } else {
            //notifySuccess("verified, hayupo kwenye ndoa" + ainaYaNdoa);
            return true;
          }
        } else {
          notifyError("Tafadhali jaza nafasi zote zilizo wazi.");
          return false;
        }

        break;
      case 1:
        if (
          nambaYaSimu != "" &&
          nambaYaSimuMwenza != "" &&
          jumuiya != "" &&
          wilaya != "" &&
          kata != "" &&
          mtaa != "" &&
          elimu != "" &&
          kazi != "" &&
          fani != ""
        ) {
          return true;
        } else {
          notifyError("Tafadhali jaza nafasi zote zilizo wazi.");
          return false;
        }
        break;
      case 2:
        if (
          ubatizo != "" &&
          kipaimara != "" &&
          mezaYaBwana != "" &&
          ahadi != ""
        ) {
          return true;
        } else {
          notifyError("Tafadhali jaza nafasi zote zilizo wazi.");
          return false;
        }
        return false;
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
        setKiroho(false);
        setMwisho(false);
        break;
      case 1:
        setBinafsi(false);
        setMawasiliano(true);
        setKiroho(false);
        setMwisho(false);
        break;
      case 2:
        setBinafsi(false);
        setMawasiliano(false);
        setKiroho(true);
        setMwisho(false);
        break;
      case 3:
        setBinafsi(false);
        setMawasiliano(false);
        setKiroho(false);
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
    setShowUpload(true);
    const body = new FormData();
    body.append("file", image);
    axios
      .post(imageUrl + "/api/upload", body, {
        onUploadProgress: (progressEvent) => {
          // console.log('Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + "%");
          setUploadData(
            Math.round((progressEvent.loaded / progressEvent.total) * 100)
          );
        },
      })
      .then(
        (res) => {
          let location = res.data;
          registration(location);
        },
        (err) => {
          //some error
        }
      );
  };

  let handleSelectAinaNdoa = (value: string) => {
    setUserDetails({ ...userDetails, ainaYaNdoa: value });
  };

  let handleSelectElimu = (value: string) => {
    setUserDetails({ ...userDetails, elimu: value });
  };

  let handleSelectJinsia = (value: string) => {
    setUserDetails({
      ...userDetails,
      jinsia: value,
      haliYaNdoa: "",
      ainaYaNdoa: "",
      tareheYaNdoa: "",
      jinaLaMwenza: "",
    });
    value == "Mwanamme"
      ? setHaliNdoaList(haliYaNdoaMumeList)
      : setHaliNdoaList(haliYaNdoaMkeList);
  };

  let handleSelectJumuia = (value: string) => {
    setUserDetails({ ...userDetails, jumuiya: value });
  };
  let handleSelectKata = (value: string) => {
    setUserDetails({ ...userDetails, kata: value });
  };

  let handleSelectKipaimara = (value: string) => {
    setUserDetails({ ...userDetails, kipaimara: value });
  };
  let handleSelectMeza = (value: string) => {
    setUserDetails({ ...userDetails, mezaYaBwana: value });
  };

  let handleSelectUbatizo = (value: string) => {
    setUserDetails({ ...userDetails, ubatizo: value });
  };

  let handleSelectWilaya = (value: string) => {
    setUserDetails({ ...userDetails, wilaya: value });
    value == "Ilemela" ? setKataList(ilemelaList) : setKataList(nyamaganaList);
  };

  let handleSelectNdoa = (value: string) => {
    setUserDetails({ ...userDetails, haliYaNdoa: value });
  };

  const jinsiaList: formData = [
    { label: "Mwanamme", value: "Mwanamme" },
    { label: "Mwanamke", value: "Mwanamke" },
  ];
  const haliYaNdoaMkeList: formData = [
    { label: "Umeolewa", value: "Umeolewa" },
    { label: "Hujaolewa", value: "Hujaolewa" },
    { label: "Mjane", value: "Mjane" },
    { label: "Talikiwa", value: "Talikiwa" },
    { label: "Tengana", value: "Tengana" },
  ];

  const haliYaNdoaMumeList: formData = [
    { label: "Umeoa", value: "Umeoa" },
    { label: "Hujaoa", value: "Hujaoa" },
    { label: "Mgane", value: "Mgane" },
    { label: "Talikiwa", value: "Talikiwa" },
    { label: "Tengana", value: "Tengana" },
  ];

  const ainaYaNdoaList: formData = [
    { label: "Ndoa Ya Kikristo", value: "Ndoa ya kikristo" },
    { label: "Ndoa Isiyo Ya Kikristo", value: "Ndoa isiyo ya kikristo" },
  ];
  const jumuiyaList: formData = [
    { label: "Sijapata Jumuiya", value: "Sijapata Jumuiya" },
    { label: "Ufunuo", value: "Ufunuo" },
    { label: "Agape", value: "Agape" },
    { label: "Neema Nyamanoro", value: "Neema Nyamanoro" },
    { label: "Israeli", value: "Israeli" },
    { label: "Sinai", value: "Sinai" },
    { label: "Jurusalem", value: "Jurusalem" },
    { label: "Bethilehem", value: "Bethilehem" },
    { label: "Warumi", value: "Warumi" },
  ];

  const wilayaList: formData = [
    { label: "Ilemela", value: "Ilemela" },
    { label: "Nyamagana", value: "Nyamagana" },
  ];

  const elimuList: formData = [
    { label: "Darasa la saba", value: "Darasa la saba" },
    { label: "Kidato cha nne", value: "Kidato cha nne" },
    { label: "Kidato cha sita", value: "Kidato cha sita" },
    { label: "Elimu ya chuo", value: "Elimu ya chuo" },
  ];

  const ndioHapanaList: formData = [
    { label: "Ndio", value: "True" },
    { label: "Hapana", value: "False" },
  ];

  const ilemelaList: formData = [
    { label: "Bugogwa", value: "Bugogwa" },
    { label: "Buswelu", value: "Buswelu" },
    { label: "Ilemela", value: "Ilemela" },
    { label: "Kirumba", value: "Kirumba" },
    { label: "Kitangiri", value: "Kitangiri" },
    { label: "Nyakato", value: "Nyakato" },
    { label: "Nyamanoro", value: "Nyamanoro" },
    { label: "Pasiansi", value: "Pasiansi" },
    { label: "Sangabuye", value: "Sangabuye" },
  ];

  const nyamaganaList: formData = [
    { label: "Buhongwa", value: "Buhongwa" },
    { label: "Butimba", value: "Butimba" },
    { label: "Igogo", value: "Igogo" },
    { label: "Igoma", value: "Igoma" },
    { label: "Isamilo", value: "Isamilo" },
    { label: "Kishili", value: "Kishili" },
    { label: "Luchelele", value: "Luchelele" },
    { label: "Lwanhima", value: "Lwanhima" },
    { label: "Mabatini", value: "Mabatini" },
    { label: "Mahina", value: "Mahina" },
    { label: "Mbugani", value: "Mbugani" },
    { label: "Mhandu", value: "Mhandu" },
    { label: "Mikuyuni", value: "Mikuyuni" },
    { label: "Mirongo", value: "Mirongo" },
    { label: "Mkolani", value: "Mkolani" },
    { label: "Nyamagana", value: "Nyamagana" },
    { label: "Nyegezi", value: "Nyegezi" },
    { label: "Pamba", value: "Pamba" },
  ];

  useEffect(() => {}, [step, userDetails]);

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
                  <div className={Styles.inputBox}>
                    <input
                      ref={tareheYaKuzaliwa}
                      required
                      type="date"
                      placeholder="dd-mm-yyyy"
                      min="1925-01-01"
                      max={currentDate}
                      value={userDetails.tareheYaKuzaliwa}
                      name={"tareheYaKuzaliwa"}
                      onChange={(event) => {
                        handletextChange(event);
                      }}
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck={false}
                    />
                    <span>Tarehe Ya Kuzaliwa</span>
                  </div>
                  <SelectMiu
                    show={true}
                    displayLabel="Jinsia"
                    forms={jinsiaList}
                    handlechange={handleSelectJinsia}
                    value={userDetails.jinsia}
                  />
                  <SelectMiu
                    show={true}
                    displayLabel="Hali Ya Ndoa"
                    forms={haliNdoaList}
                    handlechange={handleSelectNdoa}
                    value={userDetails.haliYaNdoa}
                  />
                  {(userDetails.haliYaNdoa == "Umeoa" ||
                    userDetails.haliYaNdoa == "Umeolewa") && (
                    <>
                      <SelectMiu
                        show={true}
                        displayLabel="Aina Ya Ndoa"
                        forms={ainaYaNdoaList}
                        handlechange={handleSelectAinaNdoa}
                        value={userDetails.ainaYaNdoa}
                      />
                      {userDetails.ainaYaNdoa == "Ndoa ya kikristo" && (
                        <>
                          <div className={Styles.inputBox}>
                            <input
                              ref={tareheYaNdoa}
                              required
                              type="date"
                              placeholder="dd-mm-yyyy"
                              min="1925-01-01"
                              max={currentDate}
                              value={userDetails.tareheYaNdoa}
                              name={"tareheYaNdoa"}
                              onChange={(event) => {
                                handletextChange(event);
                              }}
                              autoComplete="off"
                              autoCorrect="off"
                              spellCheck={false}
                            />
                            <span>Tarehe Ya Ndoa</span>
                          </div>
                          <div className={Styles.inputBox}>
                            <input
                              ref={jinaLaMwenza}
                              required
                              type="text"
                              value={userDetails.jinaLaMwenza}
                              placeholder={``}
                              name={"jinaLaMwenza"}
                              onChange={(event) => {
                                handletextChange(event);
                              }}
                              autoComplete="off"
                              autoCorrect="off"
                              spellCheck={false}
                            />
                            <span>Jina La Mwenza</span>
                          </div>
                        </>
                      )}
                    </>
                  )}
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
                  <div className={Styles.inputBox}>
                    <input
                      ref={nambaYaSimuMwenza}
                      required
                      type="number"
                      value={userDetails.nambaYaSimuMwenza}
                      placeholder={``}
                      name={"nambaYaSimuMwenza"}
                      onChange={(event) => {
                        handletextChange(event);
                      }}
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck={false}
                    />
                    <span>Namba Ya Simu Ya Mwenza</span>
                  </div>
                  <SelectMiu
                    show={true}
                    displayLabel="Jina La Jumuiya Yako"
                    forms={jumuiyaList}
                    handlechange={handleSelectJumuia}
                    value={userDetails.jumuiya}
                  />
                  <SelectMiu
                    show={true}
                    displayLabel="Wilaya Yako"
                    forms={wilayaList}
                    handlechange={handleSelectWilaya}
                    value={userDetails.wilaya}
                  />
                  <SelectMiu
                    show={true}
                    displayLabel="Kata Yako"
                    forms={kataList}
                    handlechange={handleSelectKata}
                    value={userDetails.kata}
                  />
                  <div className={Styles.inputBox}>
                    <input
                      ref={mtaa}
                      required
                      type="text"
                      value={userDetails.mtaa}
                      placeholder={``}
                      name={"mtaa"}
                      onChange={(event) => {
                        handletextChange(event);
                      }}
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck={false}
                    />
                    <span>Mtaa Wako</span>
                  </div>
                  <SelectMiu
                    show={true}
                    displayLabel="Elimu Yako"
                    forms={elimuList}
                    handlechange={handleSelectElimu}
                    value={userDetails.elimu}
                  />
                  <div className={Styles.inputBox}>
                    <input
                      ref={kazi}
                      required
                      type="text"
                      value={userDetails.kazi}
                      placeholder={``}
                      name={"kazi"}
                      onChange={(event) => {
                        handletextChange(event);
                      }}
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck={false}
                    />
                    <span>Kazi Unayofanya</span>
                  </div>

                  <div className={Styles.inputBox}>
                    <input
                      ref={fani}
                      required
                      type="text"
                      value={userDetails.fani}
                      placeholder={``}
                      name={"fani"}
                      onChange={(event) => {
                        handletextChange(event);
                      }}
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck={false}
                    />
                    <span>Fani Yako</span>
                  </div>
                </>
              )}
              {kiroho && (
                <>
                  <SelectMiu
                    show={true}
                    displayLabel="Je umebatizwa?"
                    forms={ndioHapanaList}
                    handlechange={handleSelectUbatizo}
                    value={userDetails.ubatizo}
                  />
                  <SelectMiu
                    show={true}
                    displayLabel="Je umeshapata kipaimara?"
                    forms={ndioHapanaList}
                    handlechange={handleSelectKipaimara}
                    value={userDetails.kipaimara}
                  />
                  <SelectMiu
                    show={true}
                    displayLabel="Je unashiriki meza ya bwana?"
                    forms={ndioHapanaList}
                    handlechange={handleSelectMeza}
                    value={userDetails.mezaYaBwana}
                  />
                  <div className={Styles.inputBox}>
                    <input
                      ref={bahasha}
                      required
                      type="number"
                      value={userDetails.bahasha}
                      placeholder={``}
                      name={"bahasha"}
                      onChange={(event) => {
                        handletextChange(event);
                      }}
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck={false}
                    />
                    <span>
                      {" "}
                      <div className={Styles.notImpotantPointer}>*</div>Namba
                      Yako Ya Bahasha
                      <div className={Styles.notImpotantPointer}>*</div>
                    </span>
                  </div>
                  <div className={Styles.inputBox}>
                    <input
                      ref={ahadi}
                      required
                      type="number"
                      value={userDetails.ahadi}
                      placeholder={``}
                      name={"ahadi"}
                      onChange={(event) => {
                        handletextChange(event);
                      }}
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck={false}
                    />
                    <span>Ahadi Yako Ya Mwaka</span>
                  </div>
                </>
              )}
            </div>
            {kiroho && (
              <div className={Styles.notImpotant}>
                <div className={Styles.notImpotantPointer}>*</div>Acha wazi kama
                hujapata namba ya bahasha.
                <div className={Styles.notImpotantPointer}>*</div>
              </div>
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
                <div className={Styles.buttonHolderCreate}>
                  <div onClick={verfyAndSubmit} className={Styles.button}>
                    Tengeneza Akaunti
                  </div>
                </div>
              </>
            )}
          </form>
        </div>
        <div className={Styles.buttonHolder}>
          <div>
            {step > 0 && (
              <div className={Styles.button} onClick={handleNyuma}>
                Nyuma
              </div>
            )}
          </div>
          <div>
            {step < 3 && (
              <div className={Styles.button} onClick={handleMbele}>
                Mbele
              </div>
            )}
          </div>
        </div>
        <div>
          <div className={Styles.separator}>
            <hr className={Styles.line} />
            <div className={Styles.or}>Tayari Mtumiaji?</div>
            <hr className={Styles.line} />
          </div>
          <div className={Styles.buttonSignUp} onClick={signTo}>
            <div>Ingia Kwenye Akaunti Yako</div>
          </div>
        </div>
        <div className={Styles.loader}>{loadingDisplay && <Loader />}</div>
      </div>
    </div>
  );
};

export default SignIn;

//*Removing default search bar :)
SignIn.getLayout = function PageLayout(page: ReactNode) {
  return <>{page}</>;
};
