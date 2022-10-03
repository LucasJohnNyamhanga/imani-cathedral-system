// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    name,
    image,
    jinsia,
    tareheYaKuzaliwa,
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
    password,
  } = req.body;
  try {
    await prisma.user.create({
      data: {
        name,
        image,
        jinsia,
        tareheYaKuzaliwa,
        tareheYaNdoa,
        haliYaNdoa,
        ainaYaNdoa,
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
        password,
      },
    });
    res.status(200).json({
      message: "Account Successful Created.",
      type: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      message: "Error writting to database",
      type: "error",
    });
  } finally {
    await prisma.$disconnect();
  }
}
