import { Connection, connectionTypeList, voltageList } from "@/data/types";
import { Button } from "../ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { useState } from "react";
import { useConnectionStore } from "@/data/stores/useConectionStore";

const ConnectionEditDialog = ({
  connection,
  setIsEdit,
}: {
  connection: Connection;
  setIsEdit: (arg: boolean) => void;
}) => {
  const [updateConnection] = useConnectionStore((state) => [
    state.actions.updateConnection,
  ]);
  const [connectionType, setConnectionType] = useState(
    connection.connectionType
  );
  const [voltage, setVoltage] = useState(connection.voltage);
  const [name, setName] = useState(connection.name);

  const handleSaveClick = () => {
    if (name && connectionType && voltage) {
      updateConnection(connection.id, {
        id: connection.id,
        name: name,
        connectionType: connectionType,
        voltage: voltage,
        substation: connection.substation,
      });
    }
  };

  return (
    <DialogPortal>
      <DialogContent>
        <DialogHeader className="mb-4">
          <DialogTitle>Добавить присоединение</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-stretch justify-start gap-4">
          <div className="grid grid-cols-[130px_1fr] items-center gap-y-2 gap-x-4">
            <Label className="text-right" htmlFor="connectionType">
              Тип присоединения
            </Label>
            <Select onValueChange={setConnectionType} value={connectionType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Выбор типа" />
              </SelectTrigger>
              <SelectContent id="connectiontype">
                <SelectGroup>
                  {connectionTypeList.map((type) => (
                    <SelectItem value={type} key={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-[130px_1fr] items-center gap-4">
            <Label className="text-right" htmlFor="voltage">
              Напряжение
            </Label>
            <Select onValueChange={setVoltage} value={voltage}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Выбор напряжения" />
              </SelectTrigger>
              <SelectContent id="voltage">
                <SelectGroup>
                  {voltageList.map((voltage) => (
                    <SelectItem key={voltage} value={voltage}>
                      {voltage}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-[130px_1fr] items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Название
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
            onClick={() => {
              handleSaveClick();
              setIsEdit(false);
            }}
          >
            Сохранить
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogPortal>
  );
};

export default ConnectionEditDialog;
