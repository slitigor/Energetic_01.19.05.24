import { useSubstationStore } from "@/data/stores/useSubstationStore";
import { useEffect, useState } from "react";
import SubstationItem from "./SubstationItem";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Substation, districtList } from "@/data/types";
import { Label } from "../ui/label";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import SubstationAddDialog from "./SubstationAddDialog";

const SubstationPage = () => {
  const [substationList, actions] = useSubstationStore((state) => [
    state.substationList,
    state.actions,
  ]);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [district, setDistrict] = useState("");
  const [currentSubstations, setCurrentSubstations] =
    useState<Substation[]>(substationList);

  useEffect(() => {
    actions.getAllSubstation();
  }, [actions]);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const filteredSubstation = (currentDistrict: string) => {
    setDistrict(currentDistrict === district ? "" : currentDistrict);

    if (district === "") setCurrentSubstations(substationList);
    else
      setCurrentSubstations(
        substationList.filter((s) => s.district === currentDistrict)
      );
  };

  return (
    <section className="container mx-auto py-6">
      <h2 className="text-[16px] uppercase tracking-wider font-bold mb-2">
        Список подстанций
      </h2>
      <div className="flex gap-2 items-center justify-between">
        <div className="mb-4">
          <Label>Выбор района:</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {district
                  ? districtList.find((d) => d === district)
                  : // ?.label
                    "Выбери район..."}
                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Поиск района..." className="h-9" />
                <CommandList>
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    {districtList.map((d) => (
                      <CommandItem
                        key={d}
                        value={d}
                        onSelect={(currentDistrict) => {
                          filteredSubstation(currentDistrict);
                          setOpen(false);
                        }}
                      >
                        {d}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            district === d ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <SubstationAddDialog />
      </div>

      <div>
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {currentSubstations.map((substation) => (
              <CarouselItem key={substation.id}>
                <SubstationItem
                  key={substation.id}
                  id={substation.id}
                  name={substation.name}
                  psSchema={substation.psSchema}
                  district={substation.district}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="py-2 text-center text-sm text-muted-foreground">
          Slide {current} of {count}
        </div>
      </div>
    </section>
  );
};

export default SubstationPage;
