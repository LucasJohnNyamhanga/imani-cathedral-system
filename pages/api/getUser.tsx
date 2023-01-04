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
        name: true,
      },
    });
    const user = JSON.parse(JSON.stringify(userFromServer));
    res.status(200).json(user);
  } catch (error) {
  } finally {
    await prisma.$disconnect();
  }
}
