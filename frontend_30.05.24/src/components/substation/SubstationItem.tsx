import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Substation } from "@/data/types";

const SubstationItem = (substation: Substation) => {
  return (
    <Card key={substation.id} className="min-w-[240px]">
      <CardHeader>
        <CardTitle>
          ПС {substation.psSchema} {substation.name}
        </CardTitle>
        <CardDescription>Сведения о подстанции</CardDescription>
      </CardHeader>
      <div className="grid w-full items-center gap-4">
        <div className="grid grid-cols-[100px_1fr] items-center gap-4">
          <Label htmlFor="id" className="text-right">
            ID
          </Label>
          <Input id="id" value={substation.id} disabled />
        </div>
        <div className="grid grid-cols-[100px_1fr] items-center gap-4">
          <Label htmlFor="psSchema" className="text-right">
            Схема ПС
          </Label>
          <Input id="psSchema" value={substation.psSchema} disabled />
        </div>
        <div className="grid grid-cols-[100px_1fr] items-center gap-4">
          <Label htmlFor="district" className="text-right">
            Район
          </Label>
          <Input id="district" value={substation.district} disabled />
        </div>
      </div>
    </Card>
  );
};

export default SubstationItem;
