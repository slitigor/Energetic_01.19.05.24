import { IConnection } from "@/data/types";
import { useState } from "react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import ConnectionCreateDialog from "./ConnectionCreateDialog";

const ConnectionAddDialog = ({
  connectionList,
}: {
  connectionList: IConnection[];
}) => {
  const [isAddedDialog, setIsAddedDialog] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          title="Новое присоединение"
          onClick={() => setIsAddedDialog(true)}
        >
          <span className="sr-only">Новое присоединение</span>
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      {isAddedDialog && (
        <ConnectionCreateDialog
          connectionList={connectionList}
          setIsAddedDialog={setIsAddedDialog}
        />
      )}
    </Dialog>
  );
};

export default ConnectionAddDialog;
