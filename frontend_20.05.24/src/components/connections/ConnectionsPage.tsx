import { connectionColName } from "@/data/types";
import { DataTable } from "../ui/DataTable";
import { Columns } from "./Column";
import { useConnectionStore } from "@/data/stores/useConectionStore";
import { useEffect } from "react";
import ConnectionAddDialog from "./ConnectionAddDialog";

const ConnectionsPage = () => {
  const [connectionList, getAllConnection] = useConnectionStore((state) => [
    state.connectionList,
    state.getAllConnection,
  ]);

  useEffect(() => {
    getAllConnection();
  }, [getAllConnection]);

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-[16px] uppercase tracking-wider font-bold mb-2">
        Список присоединений
      </h2>
      <DataTable
        columns={Columns}
        columnName={connectionColName}
        data={connectionList}
        addedDialog={<ConnectionAddDialog connectionList={connectionList} />}
      />
    </div>
  );
};

export default ConnectionsPage;
