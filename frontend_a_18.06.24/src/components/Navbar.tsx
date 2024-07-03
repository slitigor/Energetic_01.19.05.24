import { Button } from "./ui/button";

const Navbar = ({ setTab }: { setTab: (arg: string) => void }) => {
  return (
    <nav className="flex items-center gap-2">
      <Button variant={"outline"} onClick={() => setTab("main")}>
        Главная
      </Button>
      <Button variant={"outline"} onClick={() => setTab("todo")}>
        Задачи
      </Button>
      <Button variant={"outline"} onClick={() => setTab("test")}>
        Тест
      </Button>
    </nav>
  );
};

export default Navbar;
