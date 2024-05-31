import { useState } from "react";
import Navbar from "./Navbar";
import { Separator } from "./ui/separator";
import SubstationPage from "./substation/SubstationPage";
import ConnectionPage from "./connection/ConnectionPage";
import RzaDevicePage from "./rza_device/RzaDevicePage";
import ConnectionsPage from "./connections/ConnectionsPage";

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
      {tab === "connection" && <ConnectionPage />}
      {tab === "device" && <RzaDevicePage />}
      {tab === "connections" && <ConnectionsPage />}
    </section>
  );
};

export default MainContent;
