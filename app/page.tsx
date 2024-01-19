import { BoardCard } from "~/src/components/board/BoardCard";
import { Button } from "~/src/components/form/Bouton";
import { prisma } from "~/src/db/prisma";
import BoardForm from "./boards/new/edit/BoardForm";

export default async function Home() {
  const boards = await prisma.board.findMany()

  return <div className="flex flex-col gap-4">
    <h1 className="text-5xl font-bold">Board list</h1>

    <BoardForm/>    

    <ul className="flex flex-col gap-2">
      {boards.map((board) => (
        <BoardCard key={boards.Id} board={board} />
      ))}
    </ul>
  </div>;

}
