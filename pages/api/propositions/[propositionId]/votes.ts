import { NextApiRequest, NextApiResponse } from "next";
import z from 'zod'
import { prisma } from "~/src/db/prisma";
import { Vote } from '@prisma/client'

type Data = {
  vote: Vote;
}

const QueryScheme = z.object({
  propositionId: z.string().transform((id) => Number(id))
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


  const query = QueryScheme.parse(req.query)

  const vote = await prisma.vote.create({
    data: {
      propositionId: query.propositionId,
      ip: String(Math.random()), // change to get IP of user
    }
  })

  res.status(201).json({ vote })
}