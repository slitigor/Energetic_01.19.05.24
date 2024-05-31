import { IRzaDevice } from "@/data/types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { useRzaDeviceStore } from "@/data/stores/useRzaDeviceStore";

const RzaDeviceEditDialog = ({ device }: { device: IRzaDevice }) => {
  const [deleteDevice] = useRzaDeviceStore((state) => [state.deleteDevice]);

  const [isDel, setIsDel] = useState(false);

  return (
    <Dialog>
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
                    setIsDel(true);
                  }}
                >
                  Удалить
                </Button>
              </DialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
      {isDel && (
        <DialogPortal>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Удаление</DialogTitle>
            </DialogHeader>
            <div>
              <h2>Вы действительно хотите удалить эту запись:</h2>
              <p>Устройство {device.name}</p>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                type="submit"
                onClick={() => {
                  setIsDel(false);
                  deleteDevice(device.id);
                }}
              >
                Удалить
              </Button>
              <DialogClose asChild>
                <Button variant="outline">Отмена</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      )}
    </Dialog>
  );
};

export default RzaDeviceEditDialog;
