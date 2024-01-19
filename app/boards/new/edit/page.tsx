import { prisma } from "~/src/db/prisma";
import BoardForm from "./BoardForm";

export default async function Home() {
  const boards = await prisma.board.findMany()

  return <div className="flex flex-col gap-10">
    <h1 className='text-2xl'>Create a new board</h1>
    <BoardForm/>
  </div>;

}
