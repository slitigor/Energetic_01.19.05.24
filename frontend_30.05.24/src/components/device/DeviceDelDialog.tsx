import { RzaDevice } from "@/data/types";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useRzaDeviceStore } from "@/data/stores/useRzaDeviceStore";

const DeviceDelDialog = ({
  device,
  setIsDel,
}: {
  device: RzaDevice;
  setIsDel: (arg: boolean) => void;
}) => {
  const [deleteDevice] = useRzaDeviceStore((state) => [
    state.actions.deleteDevice,
  ]);

  return (
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
  );
};

export default DeviceDelDialog;
