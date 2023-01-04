// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { image, name, bio, nambaYaSimu, jinsia, userName, nenoLaSiri } =
    req.body;
  try {
    const newUser = await prisma.user.create({
      data: {
        image,
        name,
        bio,
        nambaYaSimu,
        jinsia,
        userName,
        nenoLaSiri,
      },
      select: {
        id: true,
        userName: true,
        nenoLaSiri: true,
      },
    });
    const user = JSON.parse(JSON.stringify(newUser));
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}
