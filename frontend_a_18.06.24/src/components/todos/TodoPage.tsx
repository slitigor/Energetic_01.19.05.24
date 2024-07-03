import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import PlusIcon from "../icons/PlusIcon";
import { TaskCategory } from "@/data/types";
import TodoContainer from "./TodoContainer";
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

const TodoPage = () => {
  const [columns, setColumns] = useState<TaskCategory[]>([]);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const createCard = () => {
    const columnToAdd: TaskCategory = {
      id: generateId(),
      title: `Список ${columns.length + 1}`,
    };
    setColumns([...columns, columnToAdd]);
  };

  const generateId = () => {
    return Math.floor(Math.random() * 10001);
  };

  const deleteColumn = (id: number) => {
    setColumns(columns.filter((col) => col.id !== id));
  };

  return (
    <div
      className="
	font-narrow m-auto flex min-h-[580px] 
	w-full items-center
	overflow-x-auto overflow-y-hidden px-[40px]"
    >
      <DndContext>
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <TodoContainer
                  column={col}
                  key={col.id}
                  deleteColumn={deleteColumn}
                />
              ))}
            </SortableContext>
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-4 ring-blue-800 hover:ring-2"
            onClick={() => createCard()}
          >
            <PlusIcon />
            Добавить
          </Button>
        </div>
      </DndContext>
    </div>
  );
};

export default TodoPage;
