import { IConnection, IRzaDevice } from "@/data/types";
import { Button } from "../ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import { Switch } from "../ui/switch";
import { useRzaDeviceStore } from "@/data/stores/useRzaDeviceStore";
import { useEffect, useState } from "react";

const EditDeviceList = ({
  connection,
  setIsEditDevList: setIsEditDevList,
}: {
  connection: IConnection;
  setIsEditDevList: (arg: boolean) => void;
}) => {
  const [deviceList, getAllDevices] = useRzaDeviceStore((state) => [
    state.deviceList,
    state.getAllDevices,
  ]);
  const [editConnection, setEditConnection] = useState(connection);
  const [editDevList, setEditDevList] = useState<IRzaDevice[]>([]);

  const handleSaveClick = () => {
    setEditConnection({
      ...editConnection,
      devices: editDevList,
    });
  };

  const handleToggleDevice = (id: number) => {
    const currDevice = deviceList.find((dl) => dl.id === id);
    if (currDevice !== undefined) {
      editDevList.find((d) => d.id === id) !== undefined
        ? setEditDevList(editDevList.filter((d) => d.id !== id))
        : setEditDevList([...editDevList, currDevice]);
    }
  };

  useEffect(() => {
    getAllDevices();
  }, [getAllDevices]);

  return (
    <DialogPortal>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editConnection.name}</DialogTitle>
          <DialogDescription>
            Переключателем добавьте или исключите УРЗА текущего присоединения.
            Затем нажмите 'Сохранить'
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-40 w-full rounded-md border px-2">
          {deviceList.map((device) => (
            <div
              key={device.id}
              className="flex items-center justify-between p-2 rounded hover:bg-slate-900n"
              onClick={() => handleToggleDevice(device.id)}
            >
              <Label htmlFor={device.id.toString()}>{device.name}</Label>
              <Switch
                id={device.id.toString()}
                checked={
                  editConnection.devices
                    ? editConnection.devices.find((d) => d.id === device.id) !==
                      undefined
                    : false
                }
              />
            </div>
          ))}
        </ScrollArea>
        <DialogFooter>
          <Button
            variant="outline"
            type="submit"
            onClick={() => {
              setIsEditDevList(false);
              handleSaveClick();
            }}
          >
            Сохранить
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogPortal>
  );
};

export default EditDeviceList;
