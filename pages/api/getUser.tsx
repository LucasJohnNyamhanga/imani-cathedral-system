// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name } = req.body;
  try {
    const userFromServer = await prisma.user.findFirst({
      where: {
        name,
      },
      select: {
        id: true,
      },
    });
    const user = JSON.parse(JSON.stringify(userFromServer));
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json("Not Found");
    }
  } catch (error) {
  } finally {
    await prisma.$disconnect();
  }
}
