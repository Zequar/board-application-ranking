import { NextApiRequest, NextApiResponse } from "next";
import { Board } from '@prisma/client'
import z from 'zod'
import { prisma } from "~/src/db/prisma";

type Data = {
  proposition: Proposition
}

const QueryScheme = z.object({
  boardId: z.string().transform((id) => Number(id))
})

const BodyScheme = z.object({
  title: z.string().min(1).max(255)
})

export const config = {
  api: {
    bodyParser: true,
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.status(405).end();
    return
  }

  const body = BodyScheme.parse(JSON.parse(req.body))


  const query = QueryScheme.parse(req.query)

  const proposition = await prisma.proposition.create({
    data: {
      title: body.title,
      boardId: query.boardId,
      ip: String(Math.random()), // change to get IP of user
    }
  })

  res.status(201).json({ proposition })
}