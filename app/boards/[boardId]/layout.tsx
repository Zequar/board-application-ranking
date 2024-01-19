import React, { PropsWithChildren } from 'react'
import { notFound } from 'next/navigation'
import { prisma } from '~/src/db/prisma'
import { Button } from '~/src/components/form/Bouton'

export default async function LayoutBoard({
  params,
  children
}: PropsWithChildren<{
  params: { boardId: string }
}>) {

  const boardId = Number(params.boardId)

  if (isNaN(boardId)) {
    console.log('ici ??')
    return notFound()
  }

  const board = await prisma.board.findUniqueOrThrow({
    where: {
      id: boardId
    }
  })

    return (
      <div className='flex flex-col gap-6'>
      <Button as='a' href='/'>Back</Button>

      <h2 className='text-4xl font-bold'>
        {board?.title}
      </h2>
      {children}
      </div>

    )
}