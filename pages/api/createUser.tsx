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
    await prisma.user.create({
      data: {
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