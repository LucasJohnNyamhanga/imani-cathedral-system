import { NavContext } from "../../../components/context/StateContext";
import { prisma } from "../../../db/prisma";
import { useContext, useEffect, useState } from "react";
import Styles from "../../../styles/userVerify.module.scss";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { jumuiya, user } from "@prisma/client";
import Card from "../../../components/tools/CardUserDisplay";
import { type } from "os";
import { getSession } from "next-auth/react";
import SelectMiu from "../../../components/tools/SelectMui";
import Loader from "../../../components/tools/loaderWait";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

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

  const id = context.query.id!.toString();
  let Id = parseInt(String(id));
  // ...
  const userServer = await prisma.user.findUnique({
    where: {
      id: Id,
    },
    select: {
      id: true,
      name: true,
      image: true,
      jinsia: true,
      tareheYaKuzaliwa: true,
      haliYaNdoa: true,
      ainaYaNdoa: true,
      tareheYaNdoa: true,
      jinaLaMwenza: true,
      nambaYaSimu: true,
      nambaYaSimuMwenza: true,
      jumuiyaId: true,
      jumuiya: true,
      wilaya: true,
      kata: true,
      mtaa: true,
      elimu: true,
      kazi: true,
      fani: true,
      ubatizo: true,
      kipaimara: true,
      mezaYaBwana: true,
      bahasha: true,
      ahadi: true,
      dateJoined: true,
      updatedAt: true,
      missing: true,
      verified: true,
    },
  });

  const user = JSON.parse(JSON.stringify(userServer));

  const jumuiyaFromServer = await prisma.jumuiya.findMany({
    where: {},
    select: {
      id: true,
      name: true,
    },
  });
  const jumuiyaListFull = await JSON.parse(JSON.stringify(jumuiyaFromServer));

  return {
    props: {
      user,
      jumuiyaListFull,
    },
  };
};

type formData = {
  label: string;
  value: string;
}[];

const Index = ({
  user,
  jumuiyaListFull,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { navActive, setNavActive } = useContext(NavContext);
  const [userDetails, setUserDetails] = useState({
    jumuiya: "",
    bahasha: "",
  });
  const [jumuiyaFromServer, setJumuiyaFromServer] = useState<formData>([]);
  const notify = (message: string) => toast(message);
  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);
  const [loadingDisplay, setLoadingDisplay] = useState(false);

  useEffect(() => {
    let dataJumuiya: formData = [];
    jumuiyaListFull.map((jumuia: jumuiya) => {
      let data = {
        label: jumuia.name,
        value: jumuia.id.toString(),
      };
      if (jumuia.id != 1) dataJumuiya.push(data);
    });
    setJumuiyaFromServer(dataJumuiya);
  }, []);

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

  let handletextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    let name = e.target.name;
    setUserDetails({ ...userDetails, bahasha: value });
    console.log(userDetails);
  };

  let handleSelectJumuiya = (value: string) => {
    setUserDetails({ ...userDetails, jumuiya: value });
  };

  const sitisha = () => {
    notifyError("Uboreshaji Umesitishwa.");
    delayRedirect();
  };

  const uthibitisho = () => {
    let dataUser = {
      id: user.id,
      name: user.name,
      image: user.image,
      jinsia: user.jinsia,
      tareheYaKuzaliwa: user.tareheYaKuzaliwa,
      haliYaNdoa: user.haliYaNdoa,
      ainaYaNdoa: user.ainaYaNdoa,
      tareheYaNdoa: user.tareheYaNdoa,
      jinaLaMwenza: user.jinaLaMwenza,
      nambaYaSimu: user.nambaYaSimu,
      nambaYaSimuMwenza: user.nambaYaSimuMwenza,
      jumuiyaId:
        user.jumuiyaId === 1 ? parseInt(userDetails.jumuiya) : user.jumuiyaId,
      wilaya: user.wilaya,
      kata: user.kata,
      mtaa: user.mtaa,
      elimu: user.elimu,
      kazi: user.kazi,
      fani: user.fani,
      ubatizo: user.ubatizo,
      kipaimara: user.kipaimara,
      mezaYaBwana: user.mezaYaBwana,
      bahasha: user.bahasha === "" ? userDetails.bahasha : user.bahasha,
      ahadi: parseInt(user.ahadi),
      nenoLaSiri: user.password1,
      missing: false,
      verified: true,
    };
    axios
      .post("http://localhost:3000/api/updateUser", dataUser)
      .then(function (response) {
        //responce
        if (response.data.type == "success") {
          notifySuccess(response.data.message);
          setLoadingDisplay(false);
          delayRedirect();
        } else {
          notifyError(response.data.message);
          setLoadingDisplay(false);
        }
      })
      .catch(function (error) {
        // handle error
      });
  };

  const thibitisha = () => {
    if (user.missing) {
      if (userDetails.bahasha != "" && userDetails.jumuiya != "") {
        uthibitisho();
      } else {
        notifyError("Boresha Taarifa kabla ya kuthibitisha.");
      }
    } else {
      uthibitisho();
    }
  };

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

  //!mambo yanaanza

  return (
    <div className={Styles.container}>
      <Toaster position="top-center" />
      <div className={Styles.containerInner}>
        <Card
          jina={user.name}
          picha={user.image}
          jumuia={user.jumuiya?.name}
          simu={user.nambaYaSimu}
          bahasha={user.bahasha}
          tareheYaUsajiri={user.dateJoined}
          missing={user.missing}
        />
        <div className={Styles.header}>Taarifa za Msharika</div>
        <div className={Styles.taarifaContainer}>
          <div className={Styles.taarifa}>Binafsi</div>
          <div className={Styles.kiasiContainer}>
            <div className={Styles.kiasiText}>Jinsia</div>
            <div className={`${Styles.kiasiValue} ${Styles.capitalize}`}>
              {user.jinsia}
            </div>
          </div>
          <div className={Styles.kiasiContainer}>
            <div className={Styles.kiasiText}>Tarehe Ya Kuzaliwa</div>
            <div className={`${Styles.kiasiValue} ${Styles.capitalize}`}>
              {formatDate(user.tareheYaKuzaliwa)}
            </div>
          </div>
          <div className={Styles.kiasiContainer}>
            <div className={Styles.kiasiText}>Hali Ya Ndoa</div>
            <div className={`${Styles.kiasiValue} ${Styles.capitalize}`}>
              {user.haliYaNdoa}
            </div>
          </div>
          {(user.haliYaNdoa == "Nimeoa" || user.haliYaNdoa == "Nimeolewa") && (
            <div className={Styles.kiasiContainer}>
              <div className={Styles.kiasiText}>Aina Ya Ndoa</div>
              <div className={`${Styles.kiasiValue} ${Styles.capitalize}`}>
                {user.ainaYaNdoa}
              </div>
            </div>
          )}
          {user.ainaYaNdoa == "Ndoa ya kikristo" && (
            <>
              <div className={Styles.kiasiContainer}>
                <div className={Styles.kiasiText}>Tarehe Ya Ndoa</div>
                <div className={`${Styles.kiasiValue} ${Styles.capitalize}`}>
                  {user.tareheYaNdoa ? formatDate(user.tareheYaNdoa) : ""}
                </div>
              </div>
              <div className={Styles.kiasiContainer}>
                <div className={Styles.kiasiText}>Jina La Mwenza</div>
                <div
                  className={`${`${Styles.kiasiValue} ${Styles.capitalize}`} ${
                    Styles.capitalize
                  }`}
                >
                  {user.jinaLaMwenza}
                </div>
              </div>
            </>
          )}
        </div>

        <div className={Styles.taarifaContainer}>
          <div className={Styles.taarifa}>Mawasiliano na Makazi</div>
          <div className={Styles.kiasiContainer}>
            <div className={Styles.kiasiText}>Namba Ya Simu</div>
            <div className={`${Styles.kiasiValue} ${Styles.capitalize}`}>
              {user.nambaYaSimu}
            </div>
          </div>
          {(user.haliYaNdoa == "Nimeoa" || user.haliYaNdoa == "Nimeolewa") && (
            <div className={Styles.kiasiContainer}>
              <div className={Styles.kiasiText}>Namba Ya Simu Ya Mwenza</div>
              <div className={`${Styles.kiasiValue} ${Styles.capitalize}`}>
                {user.nambaYaSimuMwenza}
              </div>
            </div>
          )}
          <div className={Styles.kiasiContainer}>
            <div className={Styles.kiasiText}>Jumuiya</div>
            <div className={`${Styles.kiasiValue} ${Styles.capitalize}`}>
              {user.jumuiya.name == "Sijapata Jumuiya" ? (
                <div style={{ color: "red" }}>SIJAPATA JUMUIYA</div>
              ) : (
                user.jumuiya.name
              )}
            </div>
          </div>
          <div className={Styles.kiasiContainer}>
            <div className={Styles.kiasiText}>Wilaya</div>
            <div className={`${Styles.kiasiValue} ${Styles.capitalize}`}>
              {user.wilaya}
            </div>
          </div>
          <div className={Styles.kiasiContainer}>
            <div className={Styles.kiasiText}>Kata</div>
            <div className={`${Styles.kiasiValue} ${Styles.capitalize}`}>
              {user.kata}
            </div>
          </div>
          <div className={Styles.kiasiContainer}>
            <div className={Styles.kiasiText}>Mtaa</div>
            <div className={`${Styles.kiasiValue} ${Styles.capitalize}`}>
              {user.mtaa}
            </div>
          </div>
          <div className={Styles.kiasiContainer}>
            <div className={Styles.kiasiText}>Elimu</div>
            <div className={`${Styles.kiasiValue} ${Styles.capitalize}`}>
              {user.elimu}
            </div>
          </div>
          <div className={Styles.kiasiContainer}>
            <div className={Styles.kiasiText}>Kazi</div>
            <div className={`${Styles.kiasiValue} ${Styles.capitalize}`}>
              {user.kazi}
            </div>
          </div>
          {user.fani != "" && (
            <div className={Styles.kiasiContainer}>
              <div className={Styles.kiasiText}>Fani</div>
              <div className={`${Styles.kiasiValue} ${Styles.capitalize}`}>
                {user.fani}
              </div>
            </div>
          )}
        </div>

        <div className={Styles.taarifaContainer}>
          <div className={Styles.taarifa}>Kiroho</div>
          <div className={Styles.kiasiContainer}>
            <div className={Styles.kiasiText}>Ubatizo</div>
            <div className={`${Styles.kiasiValue} ${Styles.capitalize}`}>
              {user.ubatizo ? "Nimeshapokea Ubatizo" : "Bado Sijabatizwa"}
            </div>
          </div>
          <div className={Styles.kiasiContainer}>
            <div className={Styles.kiasiText}>Kipaimara</div>
            <div className={`${Styles.kiasiValue} ${Styles.capitalize}`}>
              {user.kipaimara
                ? "Nimeshapokea Kipaimara"
                : "Sijapokea Kipaimara"}
            </div>
          </div>
          <div className={Styles.kiasiContainer}>
            <div className={Styles.kiasiText}>Meza Ya Bwana</div>
            <div className={`${Styles.kiasiValue} ${Styles.capitalize}`}>
              {user.mezaYaBwana ? "Ninashiriki" : "Sishiriki"}
            </div>
          </div>
          <div className={Styles.kiasiContainer}>
            <div className={Styles.kiasiText}>Bahasha</div>
            <div className={`${Styles.kiasiValue} ${Styles.capitalize}`}>
              {user.bahasha == "" ? (
                <div style={{ color: "red" }}>SIJAPATA BAHASHA</div>
              ) : (
                user.bahasha
              )}
            </div>
          </div>
          <div className={Styles.kiasiContainer}>
            <div className={Styles.kiasiText}>Ahadi</div>
            <div className={`${Styles.kiasiValue} ${Styles.capitalize}`}>
              {user.ahadi.toLocaleString()}
            </div>
          </div>
        </div>

        {user.missing && (
          <div className={Styles.taarifaContainer}>
            <div className={Styles.taarifa}>Boresha Taaraifa</div>
            <div className={Styles.credential}>
              {user.jumuiya.name == "Sijapata Jumuiya" && (
                <SelectMiu
                  show={true}
                  displayLabel="Weka Jumuiya"
                  forms={jumuiyaFromServer}
                  handlechange={handleSelectJumuiya}
                  value={userDetails.jumuiya}
                />
              )}
              {user.bahasha == "" && (
                <div className={Styles.inputBox}>
                  <input
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
                  <span>Weka Namba Ya Bahasha</span>
                </div>
              )}
            </div>
          </div>
        )}
        <div className={Styles.confirm}>
          <div onClick={sitisha} className={Styles.ButtonSitisha}>
            Sitisha
          </div>
          {loadingDisplay ? (
            <div className={Styles.Button}>
              <Loader sms={"Uboreshaji"} />
            </div>
          ) : (
            <div onClick={thibitisha} className={Styles.Button}>
              Thibitisha
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
