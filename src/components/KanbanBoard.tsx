import { useMemo, useState } from 'react'
import PlusIcon from '../icons/PlusIcon'
import { Column, Id } from '../types/TypesColumns'
import ColumnContainer from './ColumnContainer'
import { Task } from '../types/TypesTasks'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { createPortal } from 'react-dom'

function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([])
  const columnsId = useMemo(() => columns.map(col => col.id), [columns])
  const [activeColumn, setActiveColumn] = useState<Column | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 3 } })
  )

  const addColumn = () => {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`
    }
    setColumns([...columns, columnToAdd])
  }

  const deleteColumn = (id: Id) => {
    setColumns(columns.filter(column => column.id !== id))
  }
  const generateId = () => {
    return Math.floor(Math.random() * 10001)
  }

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'column') {
      setActiveColumn(event.active.data.current.column)
      return
    }
  }

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return
    const activeColumnId = active.id
    const overColumnId = over.id
    if (activeColumnId === overColumnId) return

    setColumns(columns => {
      const activeIndex = columns.findIndex(col => col.id === activeColumnId)
      const overIndex = columns.findIndex(col => col.id === overColumnId)
      return arrayMove(columns, activeIndex, overIndex)
    })
  }

  const updateColumn = (id: Id, title: string) => {
    const newColumns = columns.map(col => {
      if (col.id !== id) return col
      return { ...col, title }
    })
    setColumns(newColumns)
  }
  const createTask = (columnId: Id) => {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`
    }
    setTasks([...tasks, newTask])
  }

  const deleteTask = (id: Id) => {
    const newTasks = tasks.filter(task => task.id !== id)
    setTasks(newTasks)
  }

  const updateTaskContent = (id: Id, content: string) => {
    const newTasks = tasks.map(task => {
      if (task.id !== id) return task
      return { ...task, content }
    })
    setTasks(newTasks)
  }
  return (
    <div className="m-auto flex min-h-screen  px-[40px]  w-full items-center overflow-x-auto overflow-y-hidden">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
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
            onClick={() => {
              addColumn()
            }}
            className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-mainBackground border-2 border-columnBackground p-4 ring-rose-500 hover:ring-2 flex items-center gap-2 "
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
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  )
}

export default KanbanBoard
