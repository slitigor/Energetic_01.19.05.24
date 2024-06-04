import { DialogTitle } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RzaDevice, RzaType } from "@/data/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRzaDeviceStore } from "@/data/stores/useRzaDeviceStore";
import { useRzaTypeStore } from "@/data/stores/useRzaTypeStore";
import { useUid } from "@/data/utils/uuid";

const TypeAddDialog = ({ typeList }: { typeList: RzaType[] }) => {
  const [deviceList, getAllDevices] = useRzaDeviceStore((state) => [
    state.deviceList,
    state.actions.getAllDevices,
  ]);
  const [createType] = useRzaTypeStore((state) => [state.actions.createType]);
  const [isAddDialog, setIsAddDialog] = useState(false);
  const [type, setType] = useState("");
  const [verificationCycle, setVerificationCycle] = useState<number>(6);
  const [rzaDevice, setRzaDevice] = useState<RzaDevice>();

  //   const year = new Date(1970).getFullYear();
  //   const years = Array.from(
  //     new Array(2025 - year),
  //     (_val, index) => index + year
  //   );

  const id = useUid(typeList.map((t) => t.id));

  const handleSaveClick = () => {
    if (type && verificationCycle) {
      createType({
        id: id,
        type: type,
        verificationCycle: verificationCycle,
        rzaDevice: rzaDevice,
      });
      setType("");
      setVerificationCycle(6);
      setRzaDevice(undefined);
    }
  };

  //   console.log(years);

  useEffect(() => {
    getAllDevices();
  }, [getAllDevices]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          title="Новое присоединение"
          onClick={() => setIsAddDialog(true)}
        >
          <span className="sr-only">Новое устройство</span>
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      {isAddDialog && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Новый тип УРЗА</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Тип УРЗА
              </Label>
              <Input
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </div>
            {/* <div className="grid grid-cols-[120px_1fr] items-center gap-4">
              <Label htmlFor="jurisdiction" className="text-right">
                Принадлежность
              </Label>
              <Select
                onValueChange={setJurisdiction}
                defaultValue="Выбор подразделения"
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Выбор подразделения" />
                </SelectTrigger>
                <SelectContent id="jurisdiction">
                  <SelectGroup>
                    {jurisdictionList.map((jrd) => (
                      <SelectItem value={jrd} key={jrd}>
                        {jrd}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div> */}
            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
              <Label htmlFor="verificationCycle" className="text-right">
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
            <Button
              type="submit"
              onClick={() => {
                handleSaveClick();
                setIsAddDialog(false);
              }}
            >
              Сохранить
            </Button>
            <DialogClose asChild>
              <Button onClick={() => setIsAddDialog(false)}>Отмена</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default TypeAddDialog;
