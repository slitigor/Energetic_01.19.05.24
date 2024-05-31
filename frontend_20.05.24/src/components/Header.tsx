import { ModeToggle } from "./mode-toggle";

const Header = () => {
  return (
    <header className="flex justify-between items-center h-[80px]">
      <div>logo</div>
      <div>
        <h1 className="text-[24px] uppercase tracking-wider">Энергетик</h1>
      </div>
      <div className="flex gap-2 items-center">
        <div>
          <ModeToggle />
        </div>
        <form action="">user</form>
      </div>
    </header>
  );
};

export default Header;
