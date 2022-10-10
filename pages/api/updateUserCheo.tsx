// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, cheo } = req.body;
  try {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        cheo: {
          set: cheo,
        },
      },
    });
    res.status(200).json({
      message: "Msharika kapewa cheo kikamilifu.",
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
