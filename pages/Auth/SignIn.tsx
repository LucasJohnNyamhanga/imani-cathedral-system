import { ChangeEvent, ReactNode, useEffect, useRef, useState } from "react";
import Styles from "../../styles/auth.module.scss";
import { useSession, getSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { BsGoogle } from "react-icons/bs";
import Loader from "../../components/tools/loaderWait";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Image from "next/image";
//! insta @ johnsavanter
const SignIn = ({}) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loadingDisplay, setLoadingDisplay] = useState(false);

  const password = useRef<HTMLInputElement>(null!);

  const notify = (message: string) => toast(message);
  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);
  //! insta @ johnsavanter
  let handletext = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    let name = e.target.name;
    setFormData({ ...formData, [name]: value });
  };
  //! insta @ johnsavanter
  const { query, push, asPath } = useRouter();
  let callback = query.callbackUrl;

  let signInWithCredentials = async () => {
    if (formData.password != "" && formData.username != "") {
      setLoadingDisplay(true);
      //!use data to proceed
      const data = await signIn("credentials", {
        redirect: false,
        ...formData,
      }).then((responce) => {
        if (responce?.status === 401) {
          notifyError("Umekosea namba ya bahasha au neno la siri");
          setLoadingDisplay(false);
        } else if (responce?.status === 200) {
          // if (typeof callback != "undefined") {
          //   if (callback.includes("/Auth")) {
          //     push(`/`);
          //   } else {
          //     push(`${callback}`);
          //   }
          // } else {
          //   push("/");
          // }
          push("/Admin/");
        }
      });
    } else {
      notifyError("Jaza nafasi zote zilizo wazi.");
    }
  };

  let togglePassword = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.checked
      ? (password.current.type = "text")
      : (password.current.type = "password");
  };

  let signTo = () => {
    push(`/Auth/Sajili?callbackUrl=${asPath}`);
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
              signInWithCredentials();
            }}
          >
            <div className={Styles.logInHeader}>
              <div>
                <Image
                  alt=""
                  src={"/imani.png"}
                  objectFit={"contain"}
                  placeholder="blur"
                  blurDataURL={"/imani.png"}
                  width={150}
                  height={150}
                />
              </div>
              <div className={Styles.text}>Ingia Kwenye Akaunti</div>
            </div>
            <div className={Styles.credential}>
              <div className={Styles.inputBox}>
                <input
                  type="number"
                  required
                  value={formData.username}
                  placeholder={``}
                  name={"username"}
                  onChange={(event) => {
                    handletext(event);
                  }}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                />
                <span>Namba Ya Bahasha</span>
              </div>
              <div className={Styles.inputBox}>
                <input
                  ref={password}
                  required
                  type="password"
                  value={formData.password}
                  placeholder={``}
                  name={`password`}
                  onChange={(event) => {
                    handletext(event);
                  }}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                />
                <span>Neno La Siri</span>
              </div>
              <div className={Styles.check}>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    togglePassword(e);
                  }}
                />
                Onyesha Neno La Siri
              </div>
            </div>
            {loadingDisplay ? (
              <div className={Styles.buttonSajili}>
                <Loader sms={"Uhakiki"} />
              </div>
            ) : (
              <div
                onSubmit={(e) => {
                  e.preventDefault();
                  signInWithCredentials();
                }}
                onClick={signInWithCredentials}
                className={Styles.button}
              >
                Ingia
              </div>
            )}
            <div className={Styles.separator}>
              <hr className={Styles.line} />
              <div className={Styles.or}>Mtumiaji Mpya</div>
              <hr className={Styles.line} />
            </div>
            <div className={Styles.buttonSignUp} onClick={signTo}>
              <div>Sajili Akaunti Mpya</div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

//*Removing default search bar :)
SignIn.getLayout = function PageLayout(page: ReactNode) {
  return <>{page}</>;
};
