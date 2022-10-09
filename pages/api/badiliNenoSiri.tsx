// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db/prisma";
type userData = {
  message: string;
  type: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<userData>
) {
  const { id, nenoLaSiri } = req.body;

  try {
    await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        nenoLaSiri,
      },
    });
    res
      .status(200)
      .json({
        message: "Neno la Siri limebadilishwa kwa mafanikio",
        type: "success",
      });
  } catch (error) {
    console.log(error);
    res
      .status(200)
      .json({
        message: "Tahadhari, Neno la Siri halijabadilishwa, jaribu baadae.",
        type: "error",
      });
  } finally {
    await prisma.$disconnect();
  }
}
