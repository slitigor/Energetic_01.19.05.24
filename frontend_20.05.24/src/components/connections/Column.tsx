import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { DataTableColumnHeader } from "../ui/column-header";
import { IConnection, connectionColName } from "@/data/types";
import ConnectionDropdownMenu from "./ConnectionDropdownMenu";

export const Columns: ColumnDef<IConnection>[] = [
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
        titleList={connectionColName}
      />
    ),
  },
  {
    accessorKey: "connectionType",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="connectionType"
        titleList={connectionColName}
      />
    ),
  },
  {
    accessorKey: "voltage",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="voltage"
        titleList={connectionColName}
      />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="name"
        titleList={connectionColName}
      />
    ),
  },
  {
    accessorKey: "substation",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="substation"
        titleList={connectionColName}
      />
    ),
    cell: ({ row }) => {
      const substation = row.original.substation;
      return (
        <div>
          ПС {substation.psSchema} {substation.name}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Действия",
    cell: ({ row }) => {
      const connection = row.original;
      return <ConnectionDropdownMenu connection={connection} />;
    },
  },
];
