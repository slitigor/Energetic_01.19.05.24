import { RzaDevice, RzaType } from "@/data/types";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useRzaTypeStore } from "@/data/stores/useRzaTypeStore";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useRzaDeviceStore } from "@/data/stores/useRzaDeviceStore";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const TypeEditDialog = ({
  edited,
  setIsEdit,
}: {
  edited: RzaType;
  setIsEdit: (arg: boolean) => void;
}) => {
  const [updateType] = useRzaTypeStore((state) => [state.actions.updateType]);
  const [deviceList, getAllDevices] = useRzaDeviceStore((state) => [
    state.deviceList,
    state.actions.getAllDevices,
  ]);
  const [type, setType] = useState(edited.type);
  const [rzaDevice, setRzaDevice] = useState<RzaDevice>(
    edited.rzaDevice ? edited.rzaDevice : deviceList[0]
  );
  const [verificationCycle, setVerificationCycle] = useState(
    edited.verificationCycle
  );

  const handleSaveClick = () => {
    updateType(edited.id, {
      id: edited.id,
      type: type,
      rzaDevice: rzaDevice,
      verificationCycle: verificationCycle,
    });
  };

  useEffect(() => {
    getAllDevices();
  }, [getAllDevices]);

  return (
    <DialogPortal>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактирование</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-stretch justify-start gap-4">
          <div className="grid grid-cols-[100px_1fr] items-center gap-2">
            <Label className="text-right" htmlFor="type">
              Тип РЗА
            </Label>
            <Input
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-[100px_1fr] items-center gap-2">
            <Label className="text-right" htmlFor="verificationCycle">
              Цикличность
            </Label>
            <Input
              id="verificationCycle"
              type="number"
              value={verificationCycle}
              onChange={(e) => setVerificationCycle(parseInt(e.target.value))}
            />
          </div>
          <div className="grid grid-cols-[120px_1fr] items-center gap-4">
            <Label htmlFor="device">Устройство РЗА</Label>
            <Select
              onValueChange={(e) => {
                const dev = deviceList.find((d) => d.id === parseInt(e));
                if (dev !== undefined) setRzaDevice(dev);
              }}
              value={rzaDevice.id.toString()}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Выбор подразделения" />
              </SelectTrigger>
              <SelectContent id="device">
                <SelectGroup>
                  {deviceList.map((dev) => (
                    <SelectItem value={dev.id.toString()} key={dev.id}>
                      {dev.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={() => setIsEdit(false)}>
              Отмена
            </Button>
          </DialogClose>
          <Button
            variant="outline"
            type="submit"
            onClick={() => {
              setIsEdit(false);
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

export default TypeEditDialog;
