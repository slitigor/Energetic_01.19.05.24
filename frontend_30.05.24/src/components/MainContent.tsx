import { useState } from "react";
import Navbar from "./Navbar";
import { Separator } from "./ui/separator";
import SubstationPage from "@/components/substation/SubstationPage";
import DevicePage from "./device/DevicePage";
import TypePage from "./type/TypePage";
import ConnectionList from "./substation/ConnectionList";

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
      {tab === "substation" && <SubstationPage />}
      {tab === "device" && <DevicePage />}
      {tab === "type" && <TypePage />}
      {tab === "connection" && (
        <div className="m-auto p-2">
          <ConnectionList />
        </div>
      )}
    </section>
  );
};

export default MainContent;
