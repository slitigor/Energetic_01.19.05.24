import { IConnection } from "@/data/types";
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
  connection: IConnection;
  setIsDel: (arg: boolean) => void;
}) => {
  const deleteConnection = useConnectionStore(
    (state) => state.deleteConnection
  );
  return (
    <DialogPortal>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Удаление</DialogTitle>
        </DialogHeader>
        <div>
          <h2>Вы действительно хотите удалить эту запись:</h2>
          <p>
            Присоединение {connection.voltage} кВ &quot;{connection.name}
            &quot;
          </p>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            type="submit"
            onClick={() => {
              setIsDel(false);
              deleteConnection(connection.id);
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
  );
};

export default ConnectionDelDialog;
