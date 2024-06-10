import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Substation } from "@/data/types";
import ConnectionAddDialog from "./ConnectionAddDialog";
import { useConnectionStore } from "@/data/stores/useConectionStore";
import { useEffect } from "react";
import ConnectionList from "./ConnectionList";

const SubstationItem = (substation: Substation) => {
  const [connectionList, getAllConnections] = useConnectionStore((state) => [
    state.connectionList,
    state.actions.getAllConnections,
  ]);
  // const active = "bg-slate-800";

  useEffect(() => {
    getAllConnections();
  }, [getAllConnections]);

  return (
    <Card key={substation.id} className="min-w-[500px] p-4">
      <CardHeader>
        <CardTitle>
          ПС {substation.psSchema} {substation.name}
        </CardTitle>
        <CardDescription>Сведения о подстанции</CardDescription>
      </CardHeader>
      <div className="grid w-full items-center gap-4">
        <div className="grid grid-cols-[100px_1fr] items-center gap-4">
          <Label htmlFor="id" className="text-right">
            ID
          </Label>
          <Input id="id" value={substation.id} disabled />
        </div>
        <div className="grid grid-cols-[100px_1fr] items-center gap-4">
          <Label htmlFor="psSchema" className="text-right">
            Схема ПС
          </Label>
          <Input id="psSchema" value={substation.psSchema} disabled />
        </div>
        <div className="grid grid-cols-[100px_1fr] items-center gap-4">
          <Label htmlFor="district" className="text-right">
            Район
          </Label>
          <Input id="district" value={substation.district} disabled />
        </div>
        <div className="flex flex-col justify-start items-center gap-4 px-2">
          <Label htmlFor="connectionList">Присоединения:</Label>
          {/* <ScrollArea className="h-40 w-full rounded-md border">
            {connectionList.filter((c) => c.substation.id === substation.id)
              .length === 0 ? (
              <div>Список пуст</div>
            ) : (
              <div className="p-4">
                {connectionList
                  .filter((conn) => conn.substation.id === substation.id)
                  .map((c) => (
                    <ConnectionListItem key={c.id} connection={c} />
                  ))}
              </div>
            )}
          </ScrollArea> */}
          <ConnectionList
            connList={connectionList.filter(
              (cl) => cl.substation.id === substation.id
            )}
          />
        </div>
      </div>
      <CardFooter className="flex justify-end gap-2 items-center mt-6">
        <ConnectionAddDialog
          substation={substation}
          // currentConnections={currConnections}
          // setCurrentConnections={setCurrentConnections}
        />
      </CardFooter>
    </Card>
  );
};

export default SubstationItem;
