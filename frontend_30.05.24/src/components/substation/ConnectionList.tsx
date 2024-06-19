import { ScrollArea } from "../ui/scroll-area";
import { Connection } from "@/data/types";
import ConnectionDropdownMenu from "./ConnectionDropdownMenu";

const ConnectionList = ({ connList }: { connList: Connection[] }) => {
  return (
    <ScrollArea className="h-52 w-full rounded-md border p-4">
      {connList.length > 0 &&
        connList.map((connection) => (
          <div key={connection.id}>
            <div
              className="grid grid-cols-[50px_60px_1fr_60px] 
          items-center justify-start gap-4 my-1 hover:bg-accent px-4 py-1 rounded"
            >
              <div>
                {connection.connectionType === "Общеподстанционные устройства"
                  ? "О П У"
                  : connection.connectionType}
              </div>
              <div>{connection.voltage}</div>
              <div>{connection.name}</div>
              <ConnectionDropdownMenu connection={connection} />
            </div>
          </div>
        ))}
      {connList.length === 0 && <div>Список пуст</div>}
    </ScrollArea>
  );
};

export default ConnectionList;
