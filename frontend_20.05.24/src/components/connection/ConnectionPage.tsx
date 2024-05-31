import { connectionColName } from "@/data/types";
import { DataTable } from "../ui/DataTable";
import { Columns } from "./Column";
import { useConnectionStore } from "@/data/stores/useConectionStore";
import { useEffect, useState } from "react";
import ConnectionAddDialog from "./ConnectionAddDialog";
import FilterBySubstation from "./FilterBySubstation";

const ConnectionPage = () => {
  const [connectionList, getAllConnection] = useConnectionStore((state) => [
    state.connectionList,
    state.getAllConnection,
  ]);

  const [currentList, setCurrentList] = useState(connectionList);

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
        data={currentList}
        addedDialog={<ConnectionAddDialog connectionList={connectionList} />}
        filter={
          <FilterBySubstation
            connectionList={connectionList}
            setCurrentList={setCurrentList}
          />
        }
      />
    </div>
  );
};

export default ConnectionPage;
