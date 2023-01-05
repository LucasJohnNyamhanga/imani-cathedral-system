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
  const { title, subTitle, tagId, body, userId, id } = req.body;

  try {
    await prisma.post.update({
      where: { id },
      data: {
        title,
        subTitle,
        tagId,
        body,
        userId,
      },
    });
    res
      .status(200)
      .json({ message: "Mabolesho Yamefanyika kikamilifu", type: "success" });
  } catch (error) {
    res.status(200).json({
      message: "Kuna kitu hakiko sawa, jaribu tena baadae.",
      type: "success",
    });
  } finally {
    await prisma.$disconnect();
  }
}
