import { DialogTitle } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RzaDevice, jurisdictionList } from "@/data/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
// import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
// import { FormControl } from "../ui/form";
// import { Calendar } from "../ui/calendar";
// import { format } from "date-fns";

const TypeAddDialog = () => {
  const [isAddDialog, setIsAddDialog] = useState(false);
  const [type, setType] = useState("");
  const [jurisdiction, setJurisdiction] = useState("");
  const [commissioning, setCommissioning] = useState(new Date());
  const [verificationCycle, setVerificationCycle] = useState<number>(3);
  const [rzaDevice, setRzaDevice] = useState<RzaDevice>();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          title="Новое присоединение"
          onClick={() => setIsAddDialog(true)}
        >
          <span className="sr-only">Новое устройство</span>
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      {isAddDialog && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Новый тип УРЗА</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Тип УРЗА
              </Label>
              <Input
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
              <Label htmlFor="jurisdiction" className="text-right">
                Принадлежность
              </Label>
              <Select
                onValueChange={setJurisdiction}
                defaultValue="Выбор подразделения"
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Выбор подразделения" />
                </SelectTrigger>
                <SelectContent id="jurisdiction">
                  <SelectGroup>
                    {jurisdictionList.map((jrd) => (
                      <SelectItem value={jrd} key={jrd}>
                        {jrd}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
              <Label htmlFor="commissioning" className="text-right">
                Дата ввода
              </Label>
              {/* <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !commissioning && "text-muted-foreground"
                      )}
                    >
                      {commissioning ? (
                        format(commissioning, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={commissioning}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover> */}
            </div>
            <div className="grid grid-cols-[120px_1fr] items-center gap-4">
              <Label htmlFor="verificationCycle" className="text-right">
                Цикличность
              </Label>
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default TypeAddDialog;
