import React from 'react'
import KanbanBoard from '../components/KanbanBoard'
import Navbar from '../components/Navbar'
import useKanbanBoardLogic from '../hooks/useKanbanBoardLogic'

const Home: React.FC = () => {
  const kanbanLogic = useKanbanBoardLogic()

  return (
    <div className="m-auto  w-full items-center">
      <Navbar addColumn={kanbanLogic.addColumn} />
      <KanbanBoard {...kanbanLogic} />
    </div>
  )
}

export default Home
