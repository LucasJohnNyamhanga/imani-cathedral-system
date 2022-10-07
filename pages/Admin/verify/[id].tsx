import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from "next";
import { NavContext } from "../../../components/context/StateContext";
import { prisma } from "../../../db/prisma";
import { useContext, useEffect } from "react";
import Styles from "../../../styles/userVerify.module.scss";
import { user } from "@prisma/client";

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  let Id = parseInt(String(id));
  // ...
  const referenceServer = await prisma.user.findUnique({
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
      sadaka: {
        orderBy: {
          id: "desc",
        },
        take: 1,
        select: {
          tarehe: true,
          amount: true,
        },
      },
    },
  });

  const reference = JSON.parse(JSON.stringify(referenceServer));

  return {
    props: {
      reference,
    },
    revalidate: 15,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // ...
  const userServer = await prisma.user.findMany({
    where: {
      verified: false,
      missing: false,
    },
    select: {
      id: true,
    },
  });
  const users = JSON.parse(JSON.stringify(userServer));

  const paths = users.map((ref: user) => {
    let id = String(ref.id);
    return {
      params: {
        id: `${id}`,
      },
    };
  });
  return {
    paths,
    fallback: "blocking",
  };
};

const Index = ({
  reference,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { navActive, setNavActive } = useContext(NavContext);

  useEffect(() => {
    setNavActive("References");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navActive]);

  //!mambo yanaanza

  return <div className={Styles.container}>HELLOOOOOO</div>;
};

export default Index;
