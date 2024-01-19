import React from 'react'
import { notFound } from 'next/navigation'
import { prisma } from '~/src/db/prisma'
import { Proposition } from '~/src/components/proposition/PropositionLine'
import PropositionForm from './PropositionForm'
import { Button } from '~/src/components/form/Bouton'

export default async function BoardPage({
  params,
  searchParams,
}: {
  params: { boardId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const boardId = Number(params.boardId)

  const propositions = await prisma.proposition.findMany({
    where: {
      boardId: boardId
    },
    orderBy: {
      vote: {
        _count: 'desc',
      }
    },
    select: {
      title: true,
      id: true,
      _count: {
        select: {
          vote: true,
        },
      },
    }
  })

    return (
      <div className='flex flex-col gap-8'>
        <PropositionForm boardId={boardId}/>
        <ul className='flex flex-col gap-4'>
          {propositions.map((proposition) => (
            <Proposition key={proposition.id} voteCount={proposition._count.vote} {...proposition}/>
          ))}
        </ul>
      </div>
      
    )
}