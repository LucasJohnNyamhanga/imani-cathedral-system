// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { tarehe, amount, userId } = req.body;
  try {
    await prisma.sadaka.create({
      data: {
        tarehe,
        amount,
        userId,
      },
    });
    res.status(200).json({
      message: `Sadaka ya sh ${amount} imewekwa kwa ukamilifu.`,
      type: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      message: "Sadaka imeshindikana kuwekwa, tatizo la kimtandao",
      type: "error",
    });
  } finally {
    await prisma.$disconnect();
  }
}
