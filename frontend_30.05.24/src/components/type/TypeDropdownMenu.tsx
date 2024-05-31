import { RzaType } from "@/data/types";
import { useState } from "react";
import { Dialog, DialogTrigger } from "../ui/dialog";
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
import TypeDelDialog from "./TypeDelDialog";
import TypeEditDialog from "./TypeEditDialog";

const TypeDropdownMenu = ({ type }: { type: RzaType }) => {
  const [isDel, setIsDel] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

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
                    setIsEdit(false);
                  }}
                >
                  Удалить
                </Button>
              </DialogTrigger>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DialogTrigger asChild>
                <Button
                  variant="noborder"
                  onClick={() => {
                    setIsDel(false);
                    setIsEdit(true);
                  }}
                >
                  Редактировать
                </Button>
              </DialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
      {isDel && <TypeDelDialog deleted={type} setIsDel={setIsDel} />}
      {isEdit && <TypeEditDialog edited={type} setIsEdit={setIsEdit} />}
    </Dialog>
  );
};

export default TypeDropdownMenu;
