import {
  IConnection,
  ISubstation,
  connectionTypeList,
  voltageList,
} from "@/data/types";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useUid } from "@/data/utils/uuid";
import { useConnectionStore } from "@/data/stores/useConectionStore";
import { useSubstationStore } from "@/data/stores/useSubstationStore";

const ConnectionCreateDialog = ({
  editConnection,
  connectionList,
  setIsAddedDialog,
}: {
  editConnection?: IConnection;
  connectionList: IConnection[];
  setIsAddedDialog: (arg: boolean) => void;
}) => {
  const [createConnection] = useConnectionStore((state) => [
    state.createConnection,
  ]);

  const [substationList, getAllSubstation] = useSubstationStore((state) => [
    state.substationList,
    state.getAllSubstation,
  ]);

  useEffect(() => {
    getAllSubstation();
  }, [getAllSubstation]);
  getAllSubstation;

  const [name, setName] = useState(
    editConnection !== undefined ? editConnection.name : ""
  );
  const [voltage, setVoltage] = useState(
    editConnection !== undefined ? editConnection.voltage : ""
  );
  const [connectionType, setConnectionType] = useState(
    editConnection !== undefined ? editConnection.connectionType : ""
  );
  const [substation, setSubstation] = useState<ISubstation | undefined>(
    editConnection !== undefined ? editConnection.substation : undefined
  );

  const arrId = connectionList.map((c) => c.id);
  const id = useUid(arrId);

  const handleSaveClick = () => {
    if (name && substation !== undefined) {
      // Добавить ограничения по напряжению и типу присоединений
      createConnection({
        id: id,
        name: name,
        connectionType: connectionType,
        voltage: voltage,
        substation: substation,
      });
      setName("");
      setVoltage("");
      setSubstation(undefined);
    }
  };

  const handleSelectSubstation = (name: string) => {
    const selectSusbtation = substationList.find((s) => s.name === name);
    if (selectSusbtation !== undefined) {
      setSubstation(selectSusbtation);
    }
  };

  return (
    <DialogPortal>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить присоединение</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-[100px_1fr] items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Наименование
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-[100px_1fr] items-center gap-4">
            <Label htmlFor="connection_type" className="text-right">
              Тип
            </Label>
            <Select
              onValueChange={(e) => setConnectionType(e)}
              defaultValue="Выбор типа"
            >
              <SelectTrigger>
                <SelectValue placeholder="Выбор типа" />
              </SelectTrigger>
              <SelectContent id="connection_type">
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
          <div className="grid grid-cols-[100px_1fr] items-center gap-4">
            <Label htmlFor="voltage" className="text-right">
              Напряжение
            </Label>
            <Select
              onValueChange={(e) => setVoltage(e)}
              defaultValue="Выбор напряжения"
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Выбор напряжения" />
              </SelectTrigger>
              <SelectContent id="voltage">
                <SelectGroup>
                  {voltageList.map((v) => (
                    <SelectItem value={v} key={v}>
                      {v}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-[100px_1fr] items-center gap-4">
            <Label htmlFor="substation" className="text-right">
              Подстанция
            </Label>
            <Select
              onValueChange={(e) => handleSelectSubstation(e)}
              defaultValue="Выбор ПС"
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Выбор ПС" />
              </SelectTrigger>
              <SelectContent id="substation">
                <SelectGroup>
                  {substationList.map((s) => (
                    <SelectItem value={s.name} key={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            type="submit"
            onClick={() => {
              handleSaveClick();
              setIsAddedDialog(false);
            }}
          >
            Сохранить
          </Button>
          <DialogClose asChild>
            <Button variant="outline" onClick={() => setIsAddedDialog(false)}>
              Отмена
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </DialogPortal>
  );
};

export default ConnectionCreateDialog;
