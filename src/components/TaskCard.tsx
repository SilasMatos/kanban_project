import { useState } from 'react'
import TrashIcon from '../icons/TrashIcon'
import { Task } from '../types/TypesTasks'
import { CSS } from '@dnd-kit/utilities'
import { Id } from '../types/TypesColumns'
import { useSortable } from '@dnd-kit/sortable'

interface Props {
  task: Task
  deleteTask: (id: Id) => void
  updateTaskContent: (id: Id, content: string) => void
}

function TaskCard({ task, deleteTask, updateTaskContent }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false)

  const [editMode, setEditMode] = useState(false)
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task
    }
  })
  const toggleEditMode = () => {
    setEditMode(prev => !prev)
    setMouseIsOver(false)
  }

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-30 bg-mainBackground p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-sky-500  cursor-grab relative task"
      ></div>
    )
  }
  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-mainBackground p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-blue-600 cursor-grab relative"
      >
        <textarea
          className="h-[90%] w-full relize-none border-none rounded bg-transparent text-white focus:outline-none "
          autoFocus
          value={task.content}
          placeholder="Task content here "
          onBlur={toggleEditMode}
          onKeyDown={e => {
            if (e.key === 'Enter' && e.shiftKey) {
              toggleEditMode()
            }
          }}
          onChange={e => updateTaskContent(task.id, e.target.value)}
        ></textarea>
      </div>
    )
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      className="bg-mainBackground p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-blue-600 cursor-grab relative task"
    >
      <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
        {' '}
        {task.content}
      </p>

      {mouseIsOver && (
        <button
          onClick={() => {
            deleteTask(task.id)
          }}
          className="stroke-white absolute right-4 top-1/2 -translate-y-1/2 bg-columnBackground p-2 rounded opacity-60 hover:opacity-100
      "
        >
          <TrashIcon />
        </button>
      )}
    </div>
  )
}

export default TaskCard
