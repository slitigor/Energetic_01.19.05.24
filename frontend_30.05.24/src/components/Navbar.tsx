import { Button } from "./ui/button";

const Navbar = ({ setTab }: { setTab: (arg: string) => void }) => {
  return (
    <nav className="flex items-center gap-2">
      <Button variant={"outline"} onClick={() => setTab("main")}>
        Главная
      </Button>
      <Button variant={"outline"} onClick={() => setTab("substation")}>
        Подстанции
      </Button>
      <Button variant={"outline"} onClick={() => setTab("device")}>
        Устройства РЗА
      </Button>
      <Button variant={"outline"} onClick={() => setTab("type")}>
        Типы РЗА
      </Button>
    </nav>
  );
};

export default Navbar;
