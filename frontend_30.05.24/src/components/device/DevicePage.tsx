import { useRzaDeviceStore } from "@/data/stores/useRzaDeviceStore";
import { DataTable } from "../ui/data-table";
import { useEffect } from "react";
import { deviceColName } from "@/data/types";
import { columns } from "./Column";
import DeviceAddDialog from "./DeviceAddDialog";

const DevicePage = () => {
  const [deviceList, getAllDevices] = useRzaDeviceStore((state) => [
    state.deviceList,
    state.actions.getAllDevices,
  ]);

  useEffect(() => {
    getAllDevices();
  }, [getAllDevices]);

  return (
    <section className="container mx-auto py-6">
      <h2 className="text-[16px] uppercase tracking-wider font-bold mb-2">
        Список УРЗА
      </h2>
      <DataTable
        columns={columns}
        columnName={deviceColName}
        data={deviceList}
        addedDialog={<DeviceAddDialog />}
      />
    </section>
  );
};

export default DevicePage;
