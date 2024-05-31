import { useSubstationStore } from "@/data/stores/useSubstationStore";
import { ISubstation, districtList, schemaList } from "@/data/types";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const SubstationEditDialog = ({ substation }: { substation: ISubstation }) => {
  const [updateSubstation, deleteSubstation] = useSubstationStore((state) => [
    state.updateSubstation,
    state.deleteSubstation,
  ]);

  const [editSubstation, setEditSubstation] = useState<ISubstation>(substation);
  const [isEdit, setIsEdit] = useState(false);
  const [isDel, setIsDel] = useState(false);

  const handleSaveClick = () => {
    if (
      editSubstation.id &&
      editSubstation.name &&
      editSubstation.psSchema &&
      editSubstation.district !== undefined
    ) {
      updateSubstation(editSubstation.id, editSubstation);
    }
  };

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="w-8 h-8 p-0">
            <span className="sr-only">Открыть</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Действия</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <DialogTrigger asChild>
                <Button
                  variant="noborder"
                  onClick={() => {
                    setIsDel(false);
                    setIsEdit(true);
                  }}
                >
                  Редактировать
                </Button>
              </DialogTrigger>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DialogTrigger asChild>
                <Button
                  variant="noborder"
                  onClick={() => {
                    setIsDel(true);
                    setIsEdit(false);
                  }}
                >
                  Удалить
                </Button>
              </DialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
      {isDel && (
        <DialogPortal>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Удаление</DialogTitle>
            </DialogHeader>
            <div>
              <h2>Вы действительно хотите удалить эту запись:</h2>
              <p>
                ПС {substation.psSchema} {substation.name}
              </p>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                type="submit"
                onClick={() => {
                  setIsDel(false);
                  deleteSubstation(substation.id);
                }}
              >
                Удалить
              </Button>
              <DialogClose asChild>
                <Button variant="outline">Отмена</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      )}
      {isEdit && (
        <DialogPortal>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Редактирование</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Название ПС
                </Label>
                <Input value={editSubstation.name} disabled />
              </div>
              <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                <Label htmlFor="psSchema" className="text-right">
                  Схема ПС
                </Label>
                <Select
                  onValueChange={(e) =>
                    setEditSubstation({
                      ...editSubstation,
                      psSchema: e,
                    })
                  }
                  value={editSubstation.psSchema}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Выбор схемы" />
                  </SelectTrigger>
                  <SelectContent>
                    {schemaList.map((schema) => (
                      <SelectItem key={schema} value={schema}>
                        {schema}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                <Label htmlFor="district" className="text-right">
                  РЭС
                </Label>
                <Select
                  onValueChange={(e) =>
                    setEditSubstation({
                      ...editSubstation,
                      district: e,
                    })
                  }
                  value={editSubstation.district}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Выбор РЭС" />
                  </SelectTrigger>
                  <SelectContent>
                    {districtList.map((district) => (
                      <SelectItem key={district} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      )}
    </Dialog>
  );
};

export default SubstationEditDialog;
