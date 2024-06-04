import { RzaType, typeColName } from "@/data/types";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { DataTableColumnHeader } from "../ui/column-header";
import TypeDropdownMenu from "./TypeDropdownMenu";

export const column: ColumnDef<RzaType>[] = [
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
        titleList={typeColName}
      />
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="type"
        titleList={typeColName}
      />
    ),
  },
  // {
  //   accessorKey: "jurisdiction",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader
  //       column={column}
  //       title="jurisdiction"
  //       titleList={typeColName}
  //     />
  //   ),
  // },
  {
    accessorKey: "verificationCycle",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="verificationCycle"
        titleList={typeColName}
      />
    ),
  },
  {
    accessorKey: "rzaDevice",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="rzaDevice"
        titleList={typeColName}
      />
    ),
    cell: ({ row }) => {
      const device = row.original.rzaDevice;
      return <div>{device?.name}</div>;
    },
  },
  {
    id: "actions",
    header: "Действия",
    cell: ({ row }) => {
      const type = row.original;
      return <TypeDropdownMenu type={type} />;
    },
  },
];
