import { useTodoStore } from "@/data/stores/useTodoStore";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useEffect } from "react";
import { Label } from "../ui/label";

const TodoPage = () => {
  const [todoList, getAllTodos] = useTodoStore((state) => [
    state.todoList,
    state.getAllTodos,
  ]);

  useEffect(() => {
    getAllTodos();
  }, [getAllTodos]);

  return (
    <div className="font-narrow">
      {todoList.length === 0 && <div>Список пуст</div>}
      {todoList.length > 0 && (
        <div>
          {todoList.map((todo) => (
            <Card key={todo.id} className="w-[480px]">
              <CardHeader>
                <CardTitle className="font-comfort">{todo.title}</CardTitle>
                <CardDescription>{todo.description}</CardDescription>
              </CardHeader>
              <div className="flex justify-start items-center gap-4 px-6 pb-4">
                <Label>Статус:</Label>
                <div>{todo.stage}</div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoPage;
