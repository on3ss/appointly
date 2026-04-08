import { Service } from "@/types/resource";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Service>[] = [
    {
        accessorKey: 'name',
        header: "Name",
        meta: { dropdownLabel: 'Name' }
    },
    {
        accessorKey: 'service_type',
        header: "Service Type",
        meta: { dropdownLabel: 'Service Type' }
    },
];