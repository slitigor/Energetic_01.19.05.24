import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useUid } from "@/data/utils/uuid";
import { useRzaDeviceStore } from "@/data/stores/useRzaDeviceStore";

const RzaDeviceAddDialog = () => {
  const [deviceList, getAllDevices, createDevice] = useRzaDeviceStore(
    (state) => [state.deviceList, state.getAllDevices, state.createDevice]
  );
  const [isAddedDialog, setIsAddedDialog] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const arrNumb = deviceList.map((d) => d.id);
  const id = useUid(arrNumb);

  const handleCreateClick = () => {
    if (name && description) {
      createDevice({
        id: id,
        name: name,
        description: description,
      });
      setName("");
      setDescription("");
    }
  };

  useEffect(() => {
    getAllDevices();
  }, [getAllDevices]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          title="Новое присоединение"
          onClick={() => setIsAddedDialog(true)}
        >
          <span className="sr-only">Новое устройство</span>
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      {isAddedDialog && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить устройство</DialogTitle>
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
              <Label htmlFor="description" className="text-right">
                Описание
              </Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              type="submit"
              onClick={() => {
                setIsAddedDialog(false);
                handleCreateClick();
              }}
            >
              Создать
            </Button>
            <DialogClose asChild>
              <Button variant="outline" onClick={() => setIsAddedDialog(false)}>
                Отмена
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default RzaDeviceAddDialog;
