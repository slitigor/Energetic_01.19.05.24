import { IConnection, IRzaDevice } from "@/data/types";
import { ScrollArea } from "../ui/scroll-area";
// import { useState } from "react";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

const MultiselectDemo = ({
  deviceList,
  connection,
}: {
  deviceList: IRzaDevice[];
  connection: IConnection;
}) => {
  // const [addDevices, setAddDevices] = useState<IRzaDevice[]>([]);

  return (
    <ScrollArea className="h-28 w-full rounded border">
      <div className="p-4">
        {deviceList.map((d) => (
          <div className="flex items-center justify-between p-2">
            <Label htmlFor={d.id.toString()}>{d.name}</Label>
            <Switch
              checked={
                connection.devices
                  ? connection.devices.find((cd) => cd.id === d.id) !==
                    undefined
                  : false
              }
              onCheckedChange={() => {
                connection.devices
                  ? connection.devices.find((cd) => cd.id === d.id) !==
                    undefined
                    ? false
                    : true
                  : false;
              }}
            />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default MultiselectDemo;
