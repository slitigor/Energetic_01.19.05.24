import { useConnectionStore } from "@/data/stores/useConectionStore";
import {
  //   Connection,
  Substation,
  connectionTypeList,
  voltageList,
} from "@/data/types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useUid } from "@/data/utils/uuid";

const ConnectionAddDialog = ({ substation }: { substation: Substation }) => {
  const [connectionList, createConnection] = useConnectionStore((state) => [
    state.connectionList,
    state.actions.createConnection,
  ]);

  const [isAddDialog, setIsAddDialog] = useState(false);
  const [name, setName] = useState("");
  const [connectionType, setConnectionType] = useState("");
  const [voltage, setVoltage] = useState("");
  const id = useUid(connectionList.map((c) => c.id));

  const handleSaveClick = () => {
    if (name && connectionType && voltage) {
      const conn = {
        id: id,
        name: name,
        connectionType: connectionType,
        voltage: voltage,
        substation: substation,
      };
      createConnection(conn);
      setName("");
      setConnectionType("");
      setVoltage("");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          title="Добавить присоединение"
          onClick={() => setIsAddDialog(true)}
        >
          <span className="sr-only">Добавить присоединение</span>
          <Plus className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      {isAddDialog && (
        <DialogContent>
          <DialogHeader className="mb-4">
            <DialogTitle>Добавить присоединение</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-stretch justify-start gap-4">
            <div className="grid grid-cols-[130px_1fr] items-center gap-y-2 gap-x-4">
              <Label className="text-right" htmlFor="connectionType">
                Тип присоединения
              </Label>
              <Select onValueChange={setConnectionType}>
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
              <Select onValueChange={setVoltage}>
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
              <Button variant="outline" onClick={() => setIsAddDialog(false)}>
                Отмена
              </Button>
            </DialogClose>
            <Button
              variant="outline"
              onClick={() => {
                handleSaveClick();
                setIsAddDialog(false);
              }}
            >
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default ConnectionAddDialog;
