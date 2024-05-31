import { RzaType } from "@/data/types";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useRzaTypeStore } from "@/data/stores/useRzaTypeStore";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useRzaDeviceStore } from "@/data/stores/useRzaDeviceStore";

const TypeEditDialog = ({
  edited,
  setIsEdit,
}: {
  edited: RzaType;
  setIsEdit: (arg: boolean) => void;
}) => {
  const [updateType] = useRzaTypeStore((state) => [state.actions.updateType]);
  const [deviceList, getAllDevices] = useRzaDeviceStore((state) => [
    state.deviceList,
    state.actions.getAllDevices,
  ]);
  const [type, setType] = useState(edited.type);
  const [commissioning, setCommissioning] = useState(edited.commissioning);
  const [jurisdiction, setJurisdiction] = useState(edited.jurisdiction);
  const [rzaDevice, setRzaDevice] = useState(edited.rzaDevice);
  const [verificationCycle, setVerificationCycle] = useState(
    edited.verificationCycle
  );

  const handleSaveClick = () => {
    updateType(edited.id, {
      id: edited.id,
      type: type,
      commissioning: commissioning,
      jurisdiction: jurisdiction,
      rzaDevice: rzaDevice,
      verificationCycle: verificationCycle,
    });
  };

  useEffect(() => {
    getAllDevices();
  }, [getAllDevices]);

  return (
    <DialogPortal>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактирование</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-stretch justify-start gap-4">
          <div className="grid grid-cols-[100px_1fr] items-center gap-2">
            <Label className="text-right" htmlFor="type">
              Тип РЗА
            </Label>
            <Input
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-[100px_1fr] items-center gap-2">
            <Label className="text-right" htmlFor="verificationCycle">
              Цикличность
            </Label>
            <Input
              id="verificationCycle"
              value={verificationCycle}
              onChange={(e) => setVerificationCycle(parseInt(e.target.value))}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            type="submit"
            onClick={() => {
              setIsEdit(false);
              handleSaveClick();
            }}
          >
            Сохранить
          </Button>
          <DialogClose>
            <Button variant="outline" onClick={() => setIsEdit(false)}>
              Отмена
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </DialogPortal>
  );
};

export default TypeEditDialog;
