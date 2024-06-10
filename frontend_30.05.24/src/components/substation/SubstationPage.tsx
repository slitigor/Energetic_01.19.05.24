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

const SubstationPage = () => {
  const [substationList, actions] = useSubstationStore((state) => [
    state.substationList,
    state.actions,
  ]);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

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

  return (
    <section className="container mx-auto py-6">
      <h2 className="text-[16px] uppercase tracking-wider font-bold mb-2">
        Список подстанций
      </h2>
      {/* <div className="grid grid-flow-row md:grid-cols-3 sm:grid-cols-2 items-start justify-start gap-4">
        {substationList.map((substation) => (
          <SubstationItem
            key={substation.id}
            id={substation.id}
            name={substation.name}
            psSchema={substation.psSchema}
            district={substation.district}
          />
        ))}
      </div> */}
      <div>
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {substationList.map((substation) => (
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
