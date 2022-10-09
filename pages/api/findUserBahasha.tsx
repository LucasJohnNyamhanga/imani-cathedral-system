// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { bahasha } = req.body;
  try {
    const userFromServer = await prisma.user.findFirst({
      where: {
        bahasha,
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
    const user = JSON.parse(JSON.stringify(userFromServer));
    res.status(200).json(user);
  } catch (error) {
  } finally {
    await prisma.$disconnect();
  }
}
