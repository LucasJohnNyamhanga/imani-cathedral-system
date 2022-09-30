import { ChangeEvent, ReactNode, useEffect, useRef, useState } from "react";
import Styles from "../../styles/sajili.module.scss";
import Loader from "../../components/tools/loader";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import Stepper from "../../components/tools/Stepper";
//! insta @ johnsavanter
const SignIn = ({}) => {
  const [register, setRegister] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    password2: "",
  });

  const [loadingDisplay, setLoadingDisplay] = useState(false);
  const [binafsi, setBinafsi] = useState(true);
  const [mawasiliano, setMawasiliano] = useState(false);
  const [kiroho, setKiroho] = useState(false);
  const [mwisho, setMwisho] = useState(false);
  const [step, setStep] = useState(0);
  const [taarifa, setTaarifa] = useState("Taarifa Binafsi");

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

  let createAccount = () => {
    if (
      register.firstName != "" &&
      register.lastName != "" &&
      register.password != "" &&
      register.password2 != "" &&
      register.username != ""
    ) {
      if (register.password === register.password2) {
        if (register.password.length > 6 && register.password2.length > 6) {
          checkUser({ username: register.username });
        } else {
          notifyError("Password should exceed 6 characters.");
          password1.current.focus();
          password1.current.style.color = "red";
          password2.current.style.color = "red";
        }
      } else {
        notifyError("Password does not match");
        password1.current.focus();
        password1.current.style.color = "red";
        password2.current.style.color = "red";
      }
    } else {
      notifyError(`Fill In All Fields`);
    }
  };

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
        registration(register.password);
      });
  };

  let registration = (password: string) => {
    let dataUser = {
      name: `${
        register.firstName.charAt(0).toUpperCase() +
        register.firstName.toLowerCase().slice(1)
      } ${
        register.lastName.charAt(0).toUpperCase() +
        register.lastName.toLowerCase().slice(1)
      }`,
      image: null,
      username: register.username,
      password,
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
      setStep(step-1)
    }
  };

  let handleMbele = () => {
    if(step < 3) {
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
        setMwisho(false)
        break;
      case 1:
        setBinafsi(false);
        setMawasiliano(true);
        setKiroho(false);
        setMwisho(false)
        break;
      case 2:
        setBinafsi(false);
        setMawasiliano(false);
        setKiroho(true);
        setMwisho(false)
        break;
      case 3:
        setBinafsi(false);
        setMawasiliano(false);
        setKiroho(false);
        setMwisho(true)
        break;

      default:
        break;
    }
  };

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
                      value={register.firstName}
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
                      value={register.firstName}
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
                      value={register.lastName}
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
                      value={register.username}
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
                  <div className={Styles.inputBox}>
                    <input
                      ref={username}
                      required
                      type="number"
                      value={register.username}
                      placeholder={``}
                      name={"username"}
                      onChange={(event) => {
                        handletextChange(event);
                      }}
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck={false}
                    />
                    <span>Hali Ya Ndoa</span>
                  </div>
                  <div className={Styles.inputBox}>
                    <input
                      ref={username}
                      required
                      type="number"
                      value={register.username}
                      placeholder={``}
                      name={"username"}
                      onChange={(event) => {
                        handletextChange(event);
                      }}
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck={false}
                    />
                    <span>Aina Ya Ndoa</span>
                  </div>
                  <div className={Styles.inputBox}>
                    <input
                      ref={username}
                      required
                      type="number"
                      value={register.username}
                      placeholder={``}
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
                      type="number"
                      value={register.username}
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
                      value={register.username}
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
                      value={register.username}
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
                  <div className={Styles.inputBox}>
                    <input
                      ref={username}
                      required
                      type="number"
                      value={register.username}
                      placeholder={``}
                      name={"username"}
                      onChange={(event) => {
                        handletextChange(event);
                      }}
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck={false}
                    />
                    <span>Jina La Jumuiya Yako</span>
                  </div>
                  <div className={Styles.inputBox}>
                    <input
                      ref={username}
                      required
                      type="number"
                      value={register.username}
                      placeholder={``}
                      name={"username"}
                      onChange={(event) => {
                        handletextChange(event);
                      }}
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck={false}
                    />
                    <span>Mtaa Unapoishi</span>
                  </div>
                  <div className={Styles.inputBox}>
                    <input
                      ref={username}
                      required
                      type="number"
                      value={register.username}
                      placeholder={``}
                      name={"username"}
                      onChange={(event) => {
                        handletextChange(event);
                      }}
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck={false}
                    />
                    <span>Kata</span>
                  </div>
                  <div className={Styles.inputBox}>
                    <input
                      ref={username}
                      required
                      type="number"
                      value={register.username}
                      placeholder={``}
                      name={"username"}
                      onChange={(event) => {
                        handletextChange(event);
                      }}
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck={false}
                    />
                    <span>Wilaya</span>
                  </div>
                  <div className={Styles.inputBox}>
                    <input
                      ref={username}
                      required
                      type="number"
                      value={register.username}
                      placeholder={``}
                      name={"username"}
                      onChange={(event) => {
                        handletextChange(event);
                      }}
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck={false}
                    />
                    <span>Mkoa</span>
                  </div>
                  <div className={Styles.inputBox}>
                    <input
                      ref={username}
                      required
                      type="number"
                      value={register.username}
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
                      type="number"
                      value={register.username}
                      placeholder={``}
                      name={"username"}
                      onChange={(event) => {
                        handletextChange(event);
                      }}
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck={false}
                    />
                    <span>Elimu Yako</span>
                  </div>
                  <div className={Styles.inputBox}>
                    <input
                      ref={username}
                      required
                      type="number"
                      value={register.username}
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
                  <div className={Styles.inputBox}>
                    <input
                      ref={username}
                      required
                      type="number"
                      value={register.username}
                      placeholder={``}
                      name={"username"}
                      onChange={(event) => {
                        handletextChange(event);
                      }}
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck={false}
                    />
                    <span>Jina La Mzee Wa Kanisa</span>
                  </div>
                  <div className={Styles.inputBox}>
                    <input
                      ref={username}
                      required
                      type="number"
                      value={register.username}
                      placeholder={``}
                      name={"username"}
                      onChange={(event) => {
                        handletextChange(event);
                      }}
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck={false}
                    />
                    <span>Je umebatizwa?</span>
                  </div>
                  <div className={Styles.inputBox}>
                    <input
                      ref={username}
                      required
                      type="number"
                      value={register.username}
                      placeholder={``}
                      name={"username"}
                      onChange={(event) => {
                        handletextChange(event);
                      }}
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck={false}
                    />
                    <span>Je umeshapata kipaimara?</span>
                  </div>
                  <div className={Styles.inputBox}>
                    <input
                      ref={username}
                      required
                      type="number"
                      value={register.username}
                      placeholder={``}
                      name={"username"}
                      onChange={(event) => {
                        handletextChange(event);
                      }}
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck={false}
                    />
                    <span>Je unashiriki meza ya bwana?</span>
                  </div>
                  <div className={Styles.inputBox}>
                    <input
                      ref={username}
                      required
                      type="number"
                      value={register.username}
                      placeholder={``}
                      name={"username"}
                      onChange={(event) => {
                        handletextChange(event);
                      }}
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck={false}
                    />
                    <span>Namba Yako Ya Bahasha</span>
                  </div>
                  <div className={Styles.inputBox}>
                    <input
                      ref={username}
                      required
                      type="number"
                      value={register.username}
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
            {mwisho && (
              <>
              <div className={Styles.credential}>
 <div className={Styles.inputBox}>
                    <input
                      ref={password1}
                      type="password"
                      value={register.password}
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
                      value={register.password2}
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
            {step < 3 && 
            <div className={Styles.button} onClick={handleMbele}>
            Mbele
          </div>}
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
