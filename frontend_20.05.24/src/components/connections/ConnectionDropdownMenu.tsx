import { IConnection } from "@/data/types";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPortal,
  SheetTitle,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { DialogTrigger } from "../ui/dialog";
import { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { useRzaDeviceStore } from "@/data/stores/useRzaDeviceStore";
import { Checkbox } from "../ui/checkbox";
// import { ConnectionForm } from "./ConnectionForm";
import MultiselectFormDemo from "./MultiselectFormDemo";

const ConnectionDropdownMenu = ({
  connection,
}: {
  connection: IConnection;
}) => {
  const [deviceList, getAllDevices] = useRzaDeviceStore((state) => [
    state.deviceList,
    state.getAllDevices,
  ]);
  const [isEdit, setIsEdit] = useState(false);
  const [isAddDev, setIsAddDev] = useState(false);

  useEffect(() => {
    getAllDevices();
  }, [getAllDevices]);

  return (
    <Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="w-8 h-8 p-0">
            <span className="sr-only">Открыть</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Действия</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <DialogTrigger asChild>
                <Button
                  variant="noborder"
                  onClick={() => {
                    setIsEdit(true);
                    setIsAddDev(false);
                  }}
                >
                  Редактировать
                </Button>
              </DialogTrigger>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DialogTrigger asChild>
                <Button
                  variant="noborder"
                  onClick={() => {
                    setIsEdit(false);
                    setIsAddDev(true);
                  }}
                >
                  Добавить УРЗА
                </Button>
              </DialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
      {isEdit && (
        <SheetPortal>
          <SheetContent side="left" className="w-[400px]">
            <SheetHeader>
              <SheetTitle>Редактирование</SheetTitle>
            </SheetHeader>
            <SheetDescription></SheetDescription>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Наименование
                </Label>
                <Input id="name" value={connection.name} disabled />
              </div>
              <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                <Label htmlFor="connectionType" className="text-right">
                  Тип присоединения
                </Label>
                <Input
                  id="connectionType"
                  value={connection.connectionType}
                  disabled
                />
              </div>
              <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                <Label htmlFor="voltage" className="text-right">
                  Напряжение
                </Label>
                <Input id="voltage" value={connection.voltage} disabled />
              </div>
              <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                <Label htmlFor="substation" className="text-right">
                  ПС
                </Label>
                <Input
                  id="substation"
                  value={connection.substation.name}
                  disabled
                />
              </div>
              <div className="grid grid-rows-[60px_1fr] items-center gap-2">
                <Label htmlFor="devices" className="text-left">
                  Список УРЗА
                </Label>
                <ScrollArea className="h-80 w-full rounded-md border px-2">
                  {deviceList.map((device) => (
                    <div
                      key={device.id}
                      className="flex items-center justify-between p-2 rounded hover:bg-slate-900"
                    >
                      <Checkbox />
                      <Label>{device.name}</Label>
                    </div>
                  ))}
                </ScrollArea>
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit" onClick={() => setIsEdit(false)}>
                  Сохранить
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </SheetPortal>
      )}
      {isAddDev && (
        <SheetPortal>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Добавление УРЗА</SheetTitle>
            </SheetHeader>
            <SheetDescription></SheetDescription>
            <MultiselectFormDemo />
          </SheetContent>
        </SheetPortal>
      )}
      {/* <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger> */}
    </Sheet>
  );
};

export default ConnectionDropdownMenu;
