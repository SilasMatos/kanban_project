import { DndContext, DragOverlay } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { createPortal } from 'react-dom'
import ColumnContainer from './ColumnContainer'
import PlusIcon from '../icons/PlusIcon'
import TaskCard from './TaskCard'
import useKanbanBoardLogic from '../hooks/useKanbanBoardLogic'

function KanbanBoard() {
  const {
    columns,
    columnsId,
    activeColumn,
    activeTask,
    tasks,
    sensors,
    addColumn,
    deleteColumn,
    updateColumn,
    createTask,
    deleteTask,
    updateTaskContent,
    onDragStart,
    onDragEnd,
    onDragOver
  } = useKanbanBoardLogic()

  return (
    <div className="m-auto flex min-h-screen px-[40px] w-full items-center overflow-x-auto overflow-y-hidden">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex gap-4">
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
          <button
            onClick={addColumn}
            className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-mainBackground border-2 border-columnBackground p-4 ring-sky-500 hover:ring-2 flex items-center gap-2"
          >
            <PlusIcon />
            Adicionar Coluna
          </button>
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
