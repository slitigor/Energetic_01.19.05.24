import { RzaType } from "@/data/types";
import { Button } from "../ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
} from "../ui/dialog";
import { useRzaTypeStore } from "@/data/stores/useRzaTypeStore";

const TypeDelDialog = ({
  deleted,
  setIsDel,
}: {
  deleted: RzaType;
  setIsDel: (arg: boolean) => void;
}) => {
  const [deleteType] = useRzaTypeStore((state) => [state.actions.deleteType]);

  return (
    <DialogPortal>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Удаление</DialogTitle>
        </DialogHeader>
        <div>
          <h2>Вы действительно хотите удалить эту запись:</h2>
          <p>Тип устройства: {deleted.type}</p>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            type="submit"
            onClick={() => {
              setIsDel(false);
              deleteType(deleted.id);
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

export default TypeDelDialog;
