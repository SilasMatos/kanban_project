import React from 'react'
import KanbanBoard from '../components/KanbanBoard'
import useKanbanBoardLogic from '../hooks/useKanbanBoardLogic'

const Home: React.FC = () => {
  return (
    <>
      <div className="m-auto  max-h-screen px-[40px] w-full items-center   ">
        <KanbanBoard />
      </div>
    </>
  )
}

export default Home
