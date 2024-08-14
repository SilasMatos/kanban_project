import { useState, useMemo } from 'react';
import { PointerSensor, useSensors, useSensor, DragStartEvent, DragEndEvent, DragOverEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Column, Id } from '../types/TypesColumns';
import { Task } from '../types/TypesTasks';

const useKanbanBoardLogic = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const columnsId = useMemo(() => columns.map(col => col.id), [columns]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 3 } })
  );

  const generateId = () => Math.floor(Math.random() * 10001);

  const addColumn = () => {


    const columnToAdd: Column = {
      id: generateId(),
      title: `Coluna ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  };

  const deleteColumn = (id: Id) => {
    setColumns(columns.filter(column => column.id !== id));
    setTasks(tasks.filter(task => task.columnId !== id));
  };

  const updateColumn = (id: Id, title: string) => {
    setColumns(columns.map(col => (col.id !== id ? col : { ...col, title })));
  };

  const createTask = (columnId: Id) => {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: `Tarefa ${tasks.length + 1}`,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id: Id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const updateTaskContent = (id: Id, content: string) => {
    setTasks(tasks.map(task => (task.id !== id ? task : { ...task, content })));
  };

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'column') {
      setActiveColumn(event.active.data.current.column);
    } else if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task);
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns(columns => {
      const activeIndex = columns.findIndex(col => col.id === activeColumnId);
      const overIndex = columns.findIndex(col => col.id === overColumnId);

      if (activeIndex !== -1 && overIndex !== -1) {
        return arrayMove(columns, activeIndex, overIndex);
      }
      return columns;
    });
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === 'Task';
    const isOverATask = over.data.current?.type === 'Task';

    if (!isActiveATask) return;

    if (isActiveATask && isOverATask) {
      setTasks(tasks => {
        const activeIndex = tasks.findIndex(t => t.id === activeId);
        const overIndex = tasks.findIndex(t => t.id === overId);

        if (activeIndex !== -1 && overIndex !== -1) {
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(tasks, activeIndex, overIndex);
        }
        return tasks;
      });
    }

    const isOverAColumn = over.data.current?.type === 'column';
    if (isActiveATask && isOverAColumn) {
      setTasks(tasks => {
        const activeIndex = tasks.findIndex(t => t.id === activeId);
        if (activeIndex !== -1) {
          tasks[activeIndex].columnId = overId;
          return arrayMove(tasks, activeIndex, activeIndex);
        }
        return tasks;
      });
    }
  };

  return {
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
    onDragOver,
  };
};

export default useKanbanBoardLogic;
