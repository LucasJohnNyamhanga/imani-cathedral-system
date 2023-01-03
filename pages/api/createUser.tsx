// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    image,
    name,
    tareheYaKuzaliwa,
    bahasha,
    jinsia,
    haliYaNdoa,
    ainaYaNdoa,
    tareheYaNdoa,
    jinaLaMwenza,
    nambaYaSimu,
    nambaYaSimuMwenza,
    jumuiyaId,
    mtaa,
    kata,
    wilaya,
    kazi,
    elimu,
    fani,
    ubatizo,
    kipaimara,
    mezaYaBwana,
    ahadi,
    nenoLaSiri,
    missing,
  } = req.body;
  try {
    // const newUser = await prisma.user.create({
    //   data: {
    //     image,
    //     name,
    //     tareheYaKuzaliwa,
    //     bahasha,
    //     jinsia,
    //     haliYaNdoa,
    //     ainaYaNdoa,
    //     tareheYaNdoa,
    //     jinaLaMwenza,
    //     nambaYaSimu,
    //     nambaYaSimuMwenza,
    //     jumuiyaId,
    //     mtaa,
    //     kata,
    //     wilaya,
    //     kazi,
    //     elimu,
    //     fani,
    //     ubatizo,
    //     kipaimara,
    //     mezaYaBwana,
    //     ahadi,
    //     nenoLaSiri,
    //     missing,
    //   },
    //   select: {
    //     id: true,
    //     missing: true,
    //     nenoLaSiri: true,
    //   },
    // });
    // const user = JSON.parse(JSON.stringify(newUser));
    // res.status(200).json(user);
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}
