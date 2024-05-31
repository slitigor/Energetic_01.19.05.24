import { RzaDevice, deviceColName } from "@/data/types";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { DataTableColumnHeader } from "../ui/column-header";
import DeviceDropdownMenu from "./DeviceDropdownMenu";

export const columns: ColumnDef<RzaDevice>[] = [
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
        titleList={deviceColName}
      />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="name"
        titleList={deviceColName}
      />
    ),
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="description"
        titleList={deviceColName}
      />
    ),
  },
  {
    id: "actions",
    header: "Действия",
    cell: ({ row }) => {
      const device = row.original;
      return <DeviceDropdownMenu device={device} />;
    },
  },
];
