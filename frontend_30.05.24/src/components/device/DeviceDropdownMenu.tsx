import { RzaDevice } from "@/data/types";
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
import { Dialog, DialogTrigger } from "../ui/dialog";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import DeviceDelDialog from "./DeviceDelDialog";

const DeviceDropdownMenu = ({ device }: { device: RzaDevice }) => {
  const [isDel, setIsDel] = useState(false);
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-8 h-8 p-0" title="Меню действия">
            <span className="sr-only">Edit device</span>
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
      {isDel && <DeviceDelDialog device={device} setIsDel={setIsDel} />}
    </Dialog>
  );
};

export default DeviceDropdownMenu;
