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
  const username = useRef<HTMLInputElement>(null!);

  const { push } = useRouter();

  const notify = (message: string) => toast(message);
  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);
  //! insta @ johnsavanter

  let handletextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    let name = e.target.name;
    setRegister({ ...register, [name]: value });
    username.current.style.color = "black";
    password1.current.style.color = "black";
    password2.current.style.color = "black";
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

  let createAccount = () => {};

  let checkUser = (data: {}) => {
    setLoadingDisplay(true);
    axios
      .post("http://localhost:3000/api/getUser", data)
      .then(function (response) {
        //responce
        const userData = JSON.parse(JSON.stringify(response.data));
        console.log(userData);
        setLoadingDisplay(false);
        if (Object.keys(userData).length > 0) {
          notifyError("Username already taken");
          username.current.focus();
          username.current.style.color = "red";
        }
      })
      .catch(function (error) {
        // handle error
        registration();
      });
  };

  let registration = () => {
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
    if (step < 3) {
      setStep(step + 1);
      setTaarifa(headerTaarifa[step + 1]);
      smoothScroll();
      changer(step + 1);
    }
  };

  useEffect(() => {}, [step]);

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
          sendToDatabase(location);
        },
        (err) => {
          //some error
        }
      );
  };

  let sendToDatabase = (location: string) => {
    console.log(location);
  };

  let handleSelectForm = (value: string) => {
    console.log(value);
  };

  let handleSelectJinsia = (value: string) => {
    console.log(value);
  };

  const jinsia: formData = [
    { label: "Mwanamme", value: "Mwanamme" },
    { label: "Mwanamke", value: "Mwanamke" },
  ];
  const haliYaNdoaMke: formData = [
    { label: "Umeolewa", value: "Umeolewa" },
    { label: "Humeolewa", value: "Hujaolewa" },
    { label: "Mjane", value: "Mjane" },
    { label: "Talikiwa", value: "Talikiwa" },
    { label: "Tengana", value: "Tengana" },
  ];

  const haliYaNdoaMume: formData = [
    { label: "Umeoa", value: "Umeolewa" },
    { label: "Hujaoa", value: "Hujaolewa" },
    { label: "Mgane", value: "Mgane" },
    { label: "Talikiwa", value: "Talikiwa" },
    { label: "Tengana", value: "Tengana" },
  ];

  const haliYaNdoa: formData = [];

  const ainaYaNdoa: formData = [
    { label: "Ndoa Ya Kikristo", value: "Ndoa ya kikristo" },
    { label: "Ndoa Isiyo Ya Kikristo", value: "Ndoa Isiyo Ya Kikristo" },
  ];
  const jumuiya: formData = [
    { label: "Ufunuo", value: "Ufunuo" },
    { label: "Agape", value: "Agape" },
    { label: "Neema Nyamanoro", value: "Neema Nyamanoro" },
    { label: "Israeli", value: "Israeli" },
    { label: "Sinai", value: "Sinai" },
    { label: "Sina Jumuiya", value: "Sina Jumuiya" },
  ];

  const wilaya: formData = [
    { label: "Ilemela", value: "Ilemela" },
    { label: "Nyamagana", value: "Nyamagana" },
  ];
  const kata: formData = [
    { label: "Ndoa Ya Kikristo", value: "Ndoa ya kikristo" },
    { label: "Ndoa Isiyo Ya Kikristo", value: "Ndoa Isiyo Ya Kikristo" },
  ];
  const mtaa: formData = [
    { label: "Ndoa Ya Kikristo", value: "Ndoa ya kikristo" },
    { label: "Ndoa Isiyo Ya Kikristo", value: "Ndoa Isiyo Ya Kikristo" },
  ];
  const elimu: formData = [
    { label: "Darasa la saba", value: "Ndoa ya kikristo" },
    { label: "Kidato cha nne", value: "Ndoa ya kikristo" },
    { label: "Kidato cha sita", value: "Ndoa ya kikristo" },
    { label: "Elimu ya chuo", value: "Ndoa ya kikristo" },
  ];
  const ndioHapana: formData = [
    { label: "Ndio", value: "True" },
    { label: "Hapana", value: "False" },
  ];

  const ilemela: formData = [
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

  const nyamagana: formData = [
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

  return (
    <div className={Styles.container}>
      <Toaster position="top-center" />
      <div className={Styles.innerContainer}>
        <div>
          <form
            className={Styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              createAccount();
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
                      type="text"
                      required
                      value={userDetails.jinaKwanza}
                      placeholder={``}
                      name={"firstName"}
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
                      type="text"
                      required
                      value={userDetails.jinaKati}
                      placeholder={``}
                      name={"firstName"}
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
                      type="text"
                      required
                      value={userDetails.jinaMwisho}
                      placeholder={``}
                      name={"lastName"}
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
                      ref={username}
                      required
                      type="date"
                      placeholder="dd-mm-yyyy"
                      min="1925-01-01"
                      max={currentDate}
                      value={userDetails.tareheYaKuzaliwa}
                      name={"username"}
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
                    forms={jinsia}
                    handlechange={handleSelectForm}
                    value={userDetails.jinsia}
                  />
                  <SelectMiu
                    show={true}
                    displayLabel="Hali Ya Ndoa"
                    forms={haliYaNdoa}
                    handlechange={handleSelectForm}
                    value={userDetails.haliYaNdoa}
                  />
                  <SelectMiu
                    show={true}
                    displayLabel="Aina Ya Ndoa"
                    forms={ainaYaNdoa}
                    handlechange={handleSelectForm}
                    value={userDetails.ainaYaNdoa}
                  />
                  <div className={Styles.inputBox}>
                    <input
                      ref={username}
                      required
                      type="date"
                      placeholder="dd-mm-yyyy"
                      min="1925-01-01"
                      max={currentDate}
                      value={userDetails.tareheYaNdoa}
                      name={"username"}
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
                      ref={username}
                      required
                      type="text"
                      value={userDetails.jinaLaMwenza}
                      placeholder={``}
                      name={"username"}
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
              {mawasiliano && (
                <>
                  <div className={Styles.inputBox}>
                    <input
                      ref={username}
                      required
                      type="number"
                      value={userDetails.nambaYaSimu}
                      placeholder={``}
                      name={"username"}
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
                      ref={username}
                      required
                      type="number"
                      value={userDetails.nambaYaSimuMwenza}
                      placeholder={``}
                      name={"username"}
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
                    forms={jumuiya}
                    handlechange={handleSelectForm}
                    value={userDetails.jumuiya}
                  />
                  <SelectMiu
                    show={true}
                    displayLabel="Wilaya Yako"
                    forms={wilaya}
                    handlechange={handleSelectForm}
                    value={userDetails.wilaya}
                  />
                  <SelectMiu
                    show={true}
                    displayLabel="Kata Yako"
                    forms={kata}
                    handlechange={handleSelectForm}
                    value={userDetails.kata}
                  />
                  <div className={Styles.inputBox}>
                    <input
                      ref={username}
                      required
                      type="text"
                      value={userDetails.mtaa}
                      placeholder={``}
                      name={"username"}
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
                    forms={elimu}
                    handlechange={handleSelectForm}
                    value={userDetails.elimu}
                  />
                  <div className={Styles.inputBox}>
                    <input
                      ref={username}
                      required
                      type="text"
                      value={userDetails.kazi}
                      placeholder={``}
                      name={"username"}
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
                      ref={username}
                      required
                      type="text"
                      value={userDetails.fani}
                      placeholder={``}
                      name={"username"}
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
                    forms={ndioHapana}
                    handlechange={handleSelectForm}
                    value={userDetails.ubatizo}
                  />
                  <SelectMiu
                    show={true}
                    displayLabel="Je umeshapata kipaimara?"
                    forms={ndioHapana}
                    handlechange={handleSelectForm}
                    value={userDetails.kipaimara}
                  />
                  <SelectMiu
                    show={true}
                    displayLabel="Je unashiriki meza ya bwana?"
                    forms={ndioHapana}
                    handlechange={handleSelectForm}
                    value={userDetails.mezaYaBwana}
                  />
                  <div className={Styles.inputBox}>
                    <input
                      ref={username}
                      required
                      type="number"
                      value={userDetails.bahasha}
                      placeholder={``}
                      name={"username"}
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
                      ref={username}
                      required
                      type="number"
                      value={userDetails.ahadi}
                      placeholder={``}
                      name={"username"}
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
                      name={`password`}
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
                  <div onClick={createAccount} className={Styles.button}>
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
