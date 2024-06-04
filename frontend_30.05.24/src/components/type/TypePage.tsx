import { useRzaTypeStore } from "@/data/stores/useRzaTypeStore";
import { useEffect } from "react";
import { DataTable } from "../ui/data-table";
import { column } from "./Column";
import { typeColName } from "@/data/types";
import TypeAddDialog from "./TypeAddDialog";

const TypePage = () => {
  const [typeList, getAllDevices] = useRzaTypeStore((state) => [
    state.typeList,
    state.actions.getAllTypes,
  ]);
  useEffect(() => {
    getAllDevices();
  }, [getAllDevices]);

  return (
    <section className="container mx-auto py-6">
      <h2 className="text-[16px] uppercase tracking-wider font-bold mb-2">
        Список подстанций
      </h2>
      <DataTable
        columns={column}
        columnName={typeColName}
        data={typeList}
        addedDialog={<TypeAddDialog typeList={typeList} />}
      />
    </section>
  );
};

export default TypePage;
