import { useState } from "react";
import { Separator } from "./ui/separator";
import Navbar from "./Navbar";
import TodoPage from "./todos/TodoPage";
import TestPage from "./todos/TestPage";

const MainContent = () => {
  const [tab, setTab] = useState("main");
  return (
    <section className="flex flex-col gap-2">
      <Navbar setTab={setTab} />
      <Separator />
      {tab === "main" && (
        <div>
          <h2 className="text-[20px] font-medium">Главная страница</h2>
          <p>Краткое описание приложения, новости и т.п.</p>
        </div>
      )}
      {tab === "todo" && <TodoPage />}
      {tab === "test" && <TestPage />}
    </section>
  );
};

export default MainContent;
