// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const usersFromServer = await prisma.user.findMany({
      where: {
        missing: true,
        verified: false,
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
      },
    });
    const users = JSON.parse(JSON.stringify(usersFromServer));
    res.status(200).json(users);
  } catch (error) {
  } finally {
    await prisma.$disconnect();
  }
}
