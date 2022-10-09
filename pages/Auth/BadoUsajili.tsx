import { prisma } from "../../db/prisma";
import { useState } from "react";
import Styles from "../../styles/badoUsajili.module.scss";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Card from "../../components/tools/CardUserDisplayBado";
import { getSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

export const getServerSideProps: GetServerSideProps = async (context) => {
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
      nambaYaSimu: true,
      jumuiya: true,
      bahasha: true,
      dateJoined: true,
      missing: true,
      nenoLaSiri: true,
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
  const notify = (message: string) => toast(message);
  const notifySuccess = (message: string) => toast.success(message);
  const notifyError = (message: string) => toast.error(message);
  const [loadingDisplay, setLoadingDisplay] = useState(false);

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
          nenoLaSiri={user.nenoLaSiri}
        />
        <div className={Styles.ujumbe}>
          Taarifa zako zinafanyiwa kazi, ili kukamilisha usajiri kwa haraka,
          tafadhari fika ofisi ya parish worker ili kupata usaidizi.
        </div>
        <div className={Styles.ujumbe}>
          Neno lako la siri ni muhimu, tunza vizuri utalihitaji wakati wa
          kuingia kwenye akaunti yako mara baada ya usajiri kukamilika.
        </div>
        <div className={Styles.msaada}>
          <div className={Styles.ujumbeMsaada}>KWA MSAADA</div>
          <div className={Styles.ujumbeMsaada}>Piga Namba: 0700000000</div>
        </div>
      </div>
    </div>
  );
};

export default Index;
