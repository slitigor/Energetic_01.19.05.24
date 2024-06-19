import { Connection } from "@/data/types";
import { Button } from "../ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
} from "../ui/dialog";
import { useConnectionStore } from "@/data/stores/useConectionStore";

const ConnectionDelDialog = ({
  connection,
  setIsDel,
}: {
  connection: Connection;
  setIsDel: (arg: boolean) => void;
}) => {
  const [deleteConnection] = useConnectionStore((state) => [
    state.actions.deleteConnection,
  ]);
  return (
    <DialogPortal>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete</DialogTitle>
        </DialogHeader>
        <div>
          <h2>Вы действительно хотите удалить эту запись:</h2>
          <p>
            Присоединение {connection.connectionType} {connection.voltage}{" "}
            {connection.name}
          </p>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              deleteConnection(connection.id);
              setIsDel(false);
            }}
          >
            Удалить
          </Button>
          <DialogClose asChild>
            <Button variant="outline" onClick={() => setIsDel(false)}>
              Отмена
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </DialogPortal>
  );
};

export default ConnectionDelDialog;
