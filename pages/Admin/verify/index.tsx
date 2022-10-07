import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from "next";
import { NavContext } from "../../../components/context/StateContext";
import { prisma } from "../../../db/prisma";
import { useContext, useEffect } from "react";
import Styles from "../../../styles/userVerify.module.scss";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { user } from "@prisma/client";
import Card from "../../../components/tools/CardUserDisplay";
import { type } from "os";
import { getSession } from "next-auth/react";

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
    },
  });

  const user = JSON.parse(JSON.stringify(userServer));

  return {
    props: {
      user,
    },
  };
};

const Index = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { navActive, setNavActive } = useContext(NavContext);

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

  //!mambo yanaanza

  return (
    <div className={Styles.container}>
      <div className={Styles.containerInner}>
        <Card
          jina={user.name}
          picha={user.image}
          jumuia={user.jumuiya.name}
          simu={user.nambaYaSimu}
          bahasha={user.bahasha}
          tareheYaUsajiri={user.dateJoined}
          missing={user.missing}
        />
        <div className={Styles.header}>Taarifa za Msharika</div>
        <div className={Styles.kiasiContainer}>
          <div className={Styles.kiasiText}>jinsia</div>
          <div className={Styles.kiasiValue}>{user.jinsia}</div>
        </div>
        <div className={Styles.kiasiContainer}>
          <div className={Styles.kiasiText}>tareheYaKuzaliwa</div>
          <div className={Styles.kiasiValue}>
            {formatDate(user.tareheYaKuzaliwa)}
          </div>
        </div>
        <div className={Styles.kiasiContainer}>
          <div className={Styles.kiasiText}>haliYaNdoa</div>
          <div className={Styles.kiasiValue}>{user.haliYaNdoa}</div>
        </div>
        <div className={Styles.kiasiContainer}>
          <div className={Styles.kiasiText}>ainaYaNdoa</div>
          <div className={Styles.kiasiValue}>{user.ainaYaNdoa}</div>
        </div>
        <div className={Styles.kiasiContainer}>
          <div className={Styles.kiasiText}>tareheYaNdoa</div>
          <div className={Styles.kiasiValue}>
            {user.tareheYaNdoa ? formatDate(user.tareheYaNdoa) : ""}
          </div>
        </div>
        <div className={Styles.kiasiContainer}>
          <div className={Styles.kiasiText}>jinaLaMwenza</div>
          <div className={`${Styles.kiasiValue} ${Styles.capitalize}`}>
            {user.jinaLaMwenza}
          </div>
        </div>
        <div className={Styles.kiasiContainer}>
          <div className={Styles.kiasiText}>nambaYaSimu</div>
          <div className={Styles.kiasiValue}>{user.nambaYaSimu}</div>
        </div>
        <div className={Styles.kiasiContainer}>
          <div className={Styles.kiasiText}>nambaYaSimuMwenza</div>
          <div className={Styles.kiasiValue}>{user.nambaYaSimuMwenza}</div>
        </div>
        <div className={Styles.kiasiContainer}>
          <div className={Styles.kiasiText}>jumuiya</div>
          <div className={Styles.kiasiValue}>{user.jumuiya.name}</div>
        </div>
        <div className={Styles.kiasiContainer}>
          <div className={Styles.kiasiText}>wilaya</div>
          <div className={Styles.kiasiValue}>{user.wilaya}</div>
        </div>
        <div className={Styles.kiasiContainer}>
          <div className={Styles.kiasiText}>kata</div>
          <div className={Styles.kiasiValue}>{user.kata}</div>
        </div>
        <div className={Styles.kiasiContainer}>
          <div className={Styles.kiasiText}>mtaa</div>
          <div className={Styles.kiasiValue}>{user.mtaa}</div>
        </div>
        <div className={Styles.kiasiContainer}>
          <div className={Styles.kiasiText}>elimu</div>
          <div className={Styles.kiasiValue}>{user.elimu}</div>
        </div>
        <div className={Styles.kiasiContainer}>
          <div className={Styles.kiasiText}>kazi</div>
          <div className={Styles.kiasiValue}>{user.kazi}</div>
        </div>
        <div className={Styles.kiasiContainer}>
          <div className={Styles.kiasiText}>fani</div>
          <div className={Styles.kiasiValue}>{user.fani}</div>
        </div>
        <div className={Styles.kiasiContainer}>
          <div className={Styles.kiasiText}>ubatizo</div>
          <div className={Styles.kiasiValue}>
            {user.ubatizo ? "Nimeshapokea Ubatizo" : "Bado Sijabatizwa"}
          </div>
        </div>
        <div className={Styles.kiasiContainer}>
          <div className={Styles.kiasiText}>kipaimara</div>
          <div className={Styles.kiasiValue}>
            {user.kipaimara ? "Nimeshapokea Kipaimara" : "Sijapokea Kipaimara"}
          </div>
        </div>
        <div className={Styles.kiasiContainer}>
          <div className={Styles.kiasiText}>mezaYaBwana</div>
          <div className={Styles.kiasiValue}>
            {user.mezaYaBwana ? "Ninashiriki" : "Sishiriki Meza ya Bwana"}
          </div>
        </div>
        <div className={Styles.kiasiContainer}>
          <div className={Styles.kiasiText}>bahasha</div>
          <div className={Styles.kiasiValue}>{user.bahasha}</div>
        </div>
        <div className={Styles.kiasiContainer}>
          <div className={Styles.kiasiText}>ahadi</div>
          <div className={Styles.kiasiValue}>{user.ahadi.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};

export default Index;
