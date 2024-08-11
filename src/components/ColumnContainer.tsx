import { useSortable } from '@dnd-kit/sortable'
import TrashIcon from '../icons/TrashIcon'
import { CSS } from '@dnd-kit/utilities'
import { Column, Id } from '../types/TypesColumns'
import { useState } from 'react'
import PlusIcon from '../icons/PlusIcon'

interface Props {
  column: Column
  deleteColumn: (id: Id) => void
  updateColumn: (id: Id, title: string) => void
  createTask: (columnId: Id) => void
}

function ColumnContainer(props: Props) {
  const { column, deleteColumn, updateColumn, createTask } = props
  const [editMode, setEditMode] = useState(false)
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: column.id,
    data: {
      type: 'column',
      column
    }
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-columnBackground w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col opacity-60 border-2 border-rose-500"
      ></div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-columnBackground w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"
    >
      <div
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true)
        }}
        className="bg-mainBackground text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-columnBackground border-3 flex justify-between items-center"
      >
        <div className="flex gap-2">
          <div className="flex items-center justify-center bg-columnBackground text-sm rounded-full">
            0
          </div>
          {!editMode && column.title}
          {editMode && (
            <input
              className="bg-black focus:border-rose-500 border rounded outline-none px-2"
              autoFocus
              value={column.title}
              onChange={e => updateColumn(column.id, e.target.value)}
              onBlur={() => {
                setEditMode(false)
              }}
              onKeyDown={e => {
                if (e.key !== 'Enter') return
                setEditMode(false)
              }}
            />
          )}
        </div>
        <button
          onClick={() => {
            deleteColumn(column.id)
          }}
          className="stroke-gray-500 hover:stroke-white hover:bg-columnBackground rounded px-1 p"
        >
          <TrashIcon />
        </button>
      </div>
      <div className="flex flex-grow">Content</div>
      <div>
        <button
          className="flex gap-2 items-center border-columnBackground border-2 rounded-md p-4 border-x-columnBackground hover:bg-mainBackground hover:text-rose-500 active:bg-black "
          onClick={() => {
            createTask(column.id)
          }}
        >
          <PlusIcon /> Nova Task
        </button>
      </div>
    </div>
  )
}

export default ColumnContainer
