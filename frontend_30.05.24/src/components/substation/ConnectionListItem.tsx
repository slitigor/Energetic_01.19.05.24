import { Connection } from "@/data/types";
import { useState } from "react";

const ConnectionListItem = ({ connection }: { connection: Connection }) => {
  const [active, setActive] = useState(false);
  const style = active
    ? "cursor-pointer my-1 p-2 rounded hover:bg-slate-800 bg-slate-800"
    : "cursor-pointer my-1 p-2 rounded hover:bg-slate-800";
  return (
    <div className={style} onClick={() => setActive(!active)}>
      {connection.connectionType} {connection.voltage} {connection.name}
    </div>
  );
};

export default ConnectionListItem;
