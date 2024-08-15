import { DndContext, DragOverlay } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { createPortal } from 'react-dom'
import ColumnContainer from './ColumnContainer'

import TaskCard from './TaskCard'
import useKanbanBoardLogic from '../hooks/useKanbanBoardLogic'
import img from '../assets/img.png'

function KanbanBoard({
  columns,
  columnsId,
  activeColumn,
  activeTask,
  tasks,
  sensors,
  deleteColumn,
  updateColumn,
  createTask,
  deleteTask,
  updateTaskContent,
  onDragStart,
  onDragEnd,
  onDragOver
}: ReturnType<typeof useKanbanBoardLogic>) {
  if (!columns.length) {
    return (
      <div className="m-auto flex flex-col w-full items-center overflow-x-auto justify-center overflow-y-hidden">
        <img
          src={img}
          alt=""
          className="max-w-[400px] opacity-0 animate-fade-in"
        />
        <h1 className="text-white font-semibold text-2xl opacity-0 animate-fade-in">
          Não exite colunas criadas
        </h1>
      </div>
    )
  }

  return (
    <div className="m-auto flex  px-[40px] w-full items-center overflow-x-auto overflow-y-hidden">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex gap-4 mt-3">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map(col => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  updateTaskContent={updateTaskContent}
                  createTask={createTask}
                  deleteTask={deleteTask}
                  tasks={tasks.filter(task => task.columnId === col.id)}
                />
              ))}
            </SortableContext>
          </div>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                deleteTask={deleteTask}
                updateTaskContent={updateTaskContent}
                createTask={createTask}
                tasks={tasks.filter(task => task.columnId === activeColumn.id)}
              />
            )}
            {activeTask && (
              <TaskCard
                task={activeTask}
                deleteTask={deleteTask}
                updateTaskContent={updateTaskContent}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  )
}

export default KanbanBoard
