// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db/prisma";
type dataType = {
  formId: string;
  subjectId: string;
  topicId: string;
  content: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {} = req.body;
  try {
    const result = await prisma.user.findMany({
      select: {
        id: true,
        userName: true,
        name: true,
      },
    });

    let searchResults = JSON.parse(JSON.stringify(result));
    res.status(200).json(searchResults);
  } catch (error) {
    res.status(404).json("Not Found");
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}
