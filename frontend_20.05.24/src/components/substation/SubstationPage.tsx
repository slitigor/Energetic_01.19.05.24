import { useSubstationStore } from "@/data/stores/useSubstationStore";
import { useEffect } from "react";
import { DataTable } from "../ui/DataTable";
import { Columns } from "./Column";
import { substationColName } from "@/data/types";
import SubstationAddDialog from "./SubstationAddDialog";

const SubstationPage = () => {
  const [substationList, getAllSubstation, createSubstation] =
    useSubstationStore((state) => [
      state.substationList,
      state.getAllSubstation,
      state.createSubstation,
    ]);

  useEffect(() => {
    getAllSubstation();
  }, [getAllSubstation]);

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-[16px] uppercase tracking-wider font-bold mb-2">
        Список подстанций
      </h2>
      <DataTable
        data={substationList}
        columns={Columns}
        columnName={substationColName}
        addedDialog={
          <SubstationAddDialog
            substationList={substationList}
            getAllSubstation={getAllSubstation}
            createSubstation={createSubstation}
          />
        }
      />
    </div>
  );
};

export default SubstationPage;
