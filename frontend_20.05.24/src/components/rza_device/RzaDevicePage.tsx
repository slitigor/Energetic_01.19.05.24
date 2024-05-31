import { useRzaDeviceStore } from "@/data/stores/useRzaDeviceStore";
import { useEffect } from "react";
import { DataTable } from "../ui/DataTable";
import { Columns } from "./Column";
import { deviceColName } from "@/data/types";
import RzaDeviceAddDialog from "./RzaDeviceAddDialog";

const RzaDevicePage = () => {
  const [deviceList, getAllDevices] = useRzaDeviceStore((state) => [
    state.deviceList,
    state.getAllDevices,
  ]);

  useEffect(() => {
    getAllDevices();
  }, [getAllDevices]);

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-[16px] uppercase tracking-wider font-bold mb-2">
        Список УРЗА
      </h2>
      <DataTable
        columns={Columns}
        columnName={deviceColName}
        data={deviceList}
        addedDialog={<RzaDeviceAddDialog />}
      />
    </div>
  );
};

export default RzaDevicePage;
