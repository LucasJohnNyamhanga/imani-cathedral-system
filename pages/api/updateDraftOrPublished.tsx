// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db/prisma";
type userData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<userData>
) {
  const { id, published } = req.body;

  try {
    await prisma.post.update({
      where: { id: parseInt(id) },
      data: {
        published: published,
      },
    });
    res.status(200).json({ message: "Update successful" });
  } catch (error) {
    res.status(200).json({ message: "Error, Could not update." });
  } finally {
    await prisma.$disconnect();
  }
}
