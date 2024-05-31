import { useSubstationStore } from "@/data/stores/useSubstationStore";
import { useEffect } from "react";
import SubstationItem from "./SubstationItem";

const SubstationPage = () => {
  const [substationList, actions] = useSubstationStore((state) => [
    state.substationList,
    state.actions,
  ]);

  useEffect(() => {
    actions.getAllSubstation();
  }, [actions]);
  return (
    <section className="container mx-auto py-6">
      <h2 className="text-[16px] uppercase tracking-wider font-bold mb-2">
        Список подстанций
      </h2>
      <div className="grid grid-flow-row md:grid-cols-3 sm:grid-cols-2 items-start justify-start gap-4">
        {substationList.map((substation) => (
          <SubstationItem
            key={substation.id}
            id={substation.id}
            name={substation.name}
            psSchema={substation.psSchema}
            district={substation.district}
          />
        ))}
      </div>
    </section>
  );
};

export default SubstationPage;
