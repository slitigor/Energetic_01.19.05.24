import { create } from "zustand";
import { TodoStoreState, schemaTodo } from "../types";
import { appDB } from "../helper";

export const useTodoStore = create<TodoStoreState>()((set, get) => ({
  todoList: [],
  getAllTodos: async () => {
    try {
      const r = await appDB.get("/todo");
      if (r.status !== 200) throw new Error("Server Error!");
      const data = schemaTodo.array().parse(r.data);
      set({
        todoList: data,
      });
    } catch (err) {
      console.log(err);
    }
  },
  createTodo: async (todo) => {
    const { todoList } = get();
    try {
      const r = await appDB.post("/todo", todo);
      if (r.status !== 200 && r.status !== 201)
        throw new Error("Server Error!");
      const data = schemaTodo.parse(r.data);
      set({
        todoList: [...todoList, data],
      });
    } catch (err) {
      console.log(err);
    }
  },
  updateTodo: async (id, todo) => {
    const { todoList } = get();
    try {
      const r = await appDB.put(`/todo/${id}`, todo);
      if (r.status !== 200) throw new Error("Server Error!");
      const data = schemaTodo.parse(r.data);
      set({
        todoList: todoList.map((t) => (t.id === id ? data : t)),
      });
    } catch (err) {
      console.log(err);
    }
  },
  deleteTodo: async (id) => {
    const { todoList } = get();
    try {
      const r = await appDB.delete(`/todo/${id}`);
      if (r.status !== 200) throw new Error("Server Error!");
      set({
        todoList: todoList.filter((t) => t.id !== id),
      });
    } catch (err) {
      console.log(err);
    }
  },
}));
