import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";

const DeviceAddDialog = () => {
  const [isAddDialog, setIsAddDialog] = useState(false);
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
            <DialogTitle>Добавить УРЗА</DialogTitle>
          </DialogHeader>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default DeviceAddDialog;
