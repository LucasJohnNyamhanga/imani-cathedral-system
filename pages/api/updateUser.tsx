// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    id,
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
    verified,
  } = req.body;
  try {
    await prisma.user.update({
      where: {
        id: parseInt(id),
      },
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
        verified,
      },
    });
    res.status(200).json({
      message: "Uboreshaji wa Msharika umekamilika.",
      type: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      message: "Tatizo limetokea, mtaarifu mtaalam wa mfumo.",
      type: "error",
    });
  } finally {
    await prisma.$disconnect();
  }
}
