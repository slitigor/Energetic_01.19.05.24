import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
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
import { useState } from "react";
import { Connection } from "@/data/types";
import ConnectionDelDialog from "./ConnectionDelDialog";
import ConnectionEditDialog from "./ConnectionEditDialog";

const ConnectionDropdownMenu = ({ connection }: { connection: Connection }) => {
  const [isDel, setIsDel] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-8 h-8 p-0"
            title="Меню действия"
          >
            <span className="sr-only">Edit connection</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent>
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
      {isDel && (
        <ConnectionDelDialog connection={connection} setIsDel={setIsDel} />
      )}
      {isEdit && (
        <ConnectionEditDialog connection={connection} setIsEdit={setIsEdit} />
      )}
    </Dialog>
  );
};

export default ConnectionDropdownMenu;
