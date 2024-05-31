import { ISubstation, substationColName } from "@/data/types";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { DataTableColumnHeader } from "../ui/column-header";
import SubstationEditDialog from "./SubstationEditDialog";

export const Columns: ColumnDef<ISubstation>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="id"
        titleList={substationColName}
      />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="name"
        titleList={substationColName}
      />
    ),
  },
  {
    accessorKey: "psSchema",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="psSchema"
        titleList={substationColName}
      />
    ),
  },
  {
    accessorKey: "district",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="district"
        titleList={substationColName}
      />
    ),
  },
  {
    id: "actions",
    header: "Действия",
    cell: ({ row }) => {
      const substation = row.original;
      return <SubstationEditDialog substation={substation} />;
    },
  },
];
