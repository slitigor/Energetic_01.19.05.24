import { IConnection } from "@/data/types";
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
import { useConnectionStore } from "@/data/stores/useConectionStore";
import { useEffect, useState } from "react";
import ConnectionDelDialog from "./ConnectionDelDialog";
import ConnectionEditDialog from "./ConnectionEditDialog";
import ConnectionCreateDialog from "./ConnectionCreateDialog";
import EditDeviceList from "./EditDeviceList";
// { setTab }: { setTab: (arg: string) => void }

const ConnectionDropdownMenu = ({
  connection,
}: {
  connection: IConnection;
}) => {
  const [connectionList, getAllConnection] = useConnectionStore((state) => [
    state.connectionList,
    state.getAllConnection,
  ]);

  const [editConnection, setEditConnection] = useState(connection);

  const [isEdit, setIsEdit] = useState(false);
  const [isDel, setIsDel] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [isEditDevList, setIsEditDevList] = useState(false);

  useEffect(() => {
    getAllConnection();
  }, [getAllConnection]);

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
                    setIsCreate(false);
                    setIsDel(false);
                    setIsEdit(true);
                    setIsEditDevList(false);
                  }}
                >
                  Редактировать
                </Button>
              </DialogTrigger>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DialogTrigger asChild>
                <Button
                  variant="noborder"
                  onClick={() => {
                    setIsCreate(false);
                    setIsDel(false);
                    setIsEdit(false);
                    setIsEditDevList(true);
                  }}
                >
                  Добавить УРЗА
                </Button>
              </DialogTrigger>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DialogTrigger asChild>
                <Button
                  variant="noborder"
                  onClick={() => {
                    setIsCreate(true);
                    setIsDel(false);
                    setIsEdit(false);
                    setIsEditDevList(false);
                  }}
                >
                  Создать на основе
                </Button>
              </DialogTrigger>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <DialogTrigger asChild>
                <Button
                  variant="noborder"
                  onClick={() => {
                    setIsCreate(false);
                    setIsDel(true);
                    setIsEdit(false);
                    setIsEditDevList(false);
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
        <ConnectionDelDialog connection={connection} setIsDel={setIsDel} />
      )}
      {isEdit && (
        <ConnectionEditDialog
          editConnection={editConnection}
          setEditConnection={setEditConnection}
          setIsEdit={setIsEdit}
        />
      )}
      {isCreate && (
        <ConnectionCreateDialog
          connectionList={connectionList}
          editConnection={editConnection}
          setIsAddedDialog={setIsCreate}
        />
      )}
      {isEditDevList && (
        <EditDeviceList
          connection={connection}
          setIsEditDevList={setIsEditDevList}
        />
      )}
    </Dialog>
  );
};

export default ConnectionDropdownMenu;
