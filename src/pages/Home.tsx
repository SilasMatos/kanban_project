import React from 'react'
import KanbanBoard from '../components/KanbanBoard'
import Navbar from '../components/Navbar'
import useKanbanBoardLogic from '../hooks/useKanbanBoardLogic'

const Home: React.FC = () => {
  const kanbanLogic = useKanbanBoardLogic()

  return (
    <div className="m-auto  min-h-screen w-full items-center relative">
      <Navbar addColumn={kanbanLogic.addColumn} />
      <KanbanBoard {...kanbanLogic} />
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4 p-2 text-sm">
        produced by Silas Matos®
      </div>
    </div>
  )
}

export default Home
