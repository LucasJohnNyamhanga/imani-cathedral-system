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
  const { title, subTitle, body, tagId, userId } = req.body;

  let userIdNumber = parseInt(userId);
  let tag = parseInt(tagId);
  try {
    await prisma.post.create({
      data: {
        title,
        subTitle,
        body,
        tagId: tag,
        userId: userIdNumber,
      },
    });
    res.status(200).json({
      message: "Andiko limesajiliwa kikamilifu.",
      type: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      message: "Kuna kitu hakiko sawa, jaribu tena baadae.",
      type: "error",
    });
  } finally {
    await prisma.$disconnect();
  }
}
