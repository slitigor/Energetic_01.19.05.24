import { ScrollArea } from "../ui/scroll-area";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogPortal,
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
import { DialogTitle } from "@radix-ui/react-dialog";
import { Connection } from "@/data/types";

const ConnectionList = ({ connList }: { connList: Connection[] }) => {
  // const [connectionList, getAllConnections] = useConnectionStore((state) => [
  //   state.connectionList,
  //   state.actions.getAllConnections,
  // ]);
  const [isDel, setIsDel] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  // useEffect(() => {
  //   getAllConnections();
  // }, [getAllConnections]);

  return (
    <ScrollArea className="h-52 w-full rounded-md border p-4">
      {connList.map((connection) => (
        <div key={connection.id}>
          <div
            className="grid grid-cols-[50px_60px_1fr_60px] 
          items-center justify-start gap-4 my-1 hover:bg-accent px-4 py-1 rounded"
          >
            <div>
              {connection.connectionType === "Общеподстанционные устройства"
                ? "О П У"
                : connection.connectionType}
            </div>
            <div>{connection.voltage}</div>
            <div>{connection.name}</div>
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
                <DialogPortal>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete</DialogTitle>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button
                          variant="outline"
                          onClick={() => setIsDel(false)}
                        >
                          Отмена
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </DialogPortal>
              )}
              {isEdit && (
                <DialogPortal>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit</DialogTitle>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button
                          variant="outline"
                          onClick={() => setIsEdit(false)}
                        >
                          Отмена
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </DialogPortal>
              )}
            </Dialog>
          </div>
        </div>
      ))}
    </ScrollArea>
  );
};

export default ConnectionList;
