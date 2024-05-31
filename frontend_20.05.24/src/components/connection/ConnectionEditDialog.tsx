import { IConnection, connectionTypeList, voltageList } from "@/data/types";
import { Button } from "../ui/button";
import {
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useSubstationStore } from "@/data/stores/useSubstationStore";
import { useEffect } from "react";
import { useConnectionStore } from "@/data/stores/useConectionStore";

const ConnectionEditDialog = ({
  editConnection,
  setEditConnection,
  setIsEdit,
}: {
  editConnection: IConnection;
  setEditConnection: (arg: IConnection) => void;
  setIsEdit: (arg: boolean) => void;
}) => {
  const [substationList, getAllSubstation] = useSubstationStore((state) => [
    state.substationList,
    state.getAllSubstation,
  ]);
  const [updateConnection] = useConnectionStore((state) => [
    state.updateConnection,
  ]);

  const handleSelectSubstation = (name: string) => {
    const selectSubstation = substationList.find((s) => s.name === name);
    if (selectSubstation !== undefined)
      setEditConnection({ ...editConnection, substation: selectSubstation });
  };

  const handleSaveClick = () => {
    if (
      editConnection.name &&
      editConnection.voltage &&
      editConnection.substation !== undefined
    ) {
      updateConnection(editConnection.id, editConnection);
    }
  };

  useEffect(() => {
    getAllSubstation();
  }, [getAllSubstation]);
  return (
    <DialogPortal>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактирование</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-[100px_1fr] items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Наименование
            </Label>
            <Input id="name" value={editConnection.name} disabled />
          </div>
          <div className="grid grid-cols-[100px_1fr] items-center gap-4">
            <Label htmlFor="connection_type" className="text-right">
              Тип
            </Label>
            <Select
              onValueChange={(e) =>
                setEditConnection({
                  ...editConnection,
                  connectionType: e,
                })
              }
              value={editConnection.connectionType}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Выбор типа" />
              </SelectTrigger>
              <SelectContent id="connection_type">
                {connectionTypeList.map((ctype) => (
                  <SelectItem key={ctype} value={ctype}>
                    {ctype}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-[100px_1fr] items-center gap-4">
            <Label htmlFor="voltage" className="text-right">
              Напряжение
            </Label>
            <Select
              onValueChange={(e) =>
                setEditConnection({
                  ...editConnection,
                  voltage: e,
                })
              }
              value={editConnection.voltage}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Выбор схемы" />
              </SelectTrigger>
              <SelectContent id="voltage">
                {voltageList.map((volt) => (
                  <SelectItem key={volt} value={volt}>
                    {volt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-[100px_1fr] items-center gap-4">
            <Label htmlFor="substation" className="text-right">
              Подстанция
            </Label>
            <Select
              onValueChange={(e) => handleSelectSubstation(e)}
              value={editConnection.substation.name}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Выбор РЭС" />
              </SelectTrigger>
              <SelectContent>
                {substationList.map((substation) => (
                  <SelectItem key={substation.id} value={substation.name}>
                    {substation.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
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

export default ConnectionEditDialog;
