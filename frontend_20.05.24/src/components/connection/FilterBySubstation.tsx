import { useSubstationStore } from "@/data/stores/useSubstationStore";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { IConnection } from "@/data/types";

const FilterBySubstation = ({
  connectionList,
  setCurrentList,
}: {
  connectionList: IConnection[];
  setCurrentList: (arg: IConnection[]) => void;
}) => {
  const [substationList, getAllSubstation] = useSubstationStore((state) => [
    state.substationList,
    state.getAllSubstation,
  ]);

  const changePSFilter = (name: string) => {
    if (name === "all") {
      setCurrentList(connectionList);
    } else {
      const currentList = connectionList.filter(
        (c) => c.substation.name === name
      );
      setCurrentList(currentList);
    }
  };

  useEffect(() => {
    getAllSubstation();
  }, [getAllSubstation]);

  return (
    <Select onValueChange={(e) => changePSFilter(e)} defaultValue="all">
      <SelectTrigger>
        <SelectValue placeholder="Фильтр по ПС" />
      </SelectTrigger>
      <SelectContent className="w-[200px]">
        <SelectGroup>
          <SelectItem value="all">Все ПС</SelectItem>
          {substationList.map((s) => (
            <SelectItem key={s.id} value={s.name}>
              {s.psSchema} {s.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default FilterBySubstation;
