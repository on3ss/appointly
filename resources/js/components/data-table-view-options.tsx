import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Table } from "@tanstack/react-table"
import { Settings2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

interface CustomColumnMeta {
    dropdownLabel?: string;
}

export function DataTableViewOptions<TData>({
    table,
}: {
    table: Table<TData>
}) {
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className="ml-auto hidden h-8 lg:flex"
                    >
                        <Settings2 />
                        View
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="" alignOffset={4}>
                    <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {table
                        .getAllColumns()
                        .filter(
                            (column) =>
                                typeof column.accessorFn !== "undefined" && column.getCanHide()
                        )
                        .map((column) => {
                            const columnMeta = column.columnDef.meta as CustomColumnMeta | undefined;
                            const dropdownLabel = columnMeta?.dropdownLabel;
                            const displayName = dropdownLabel
                                || (typeof column.columnDef.header === 'string'
                                    ? column.columnDef.header
                                    : column.id);
                            return (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                >
                                    {displayName}
                                </DropdownMenuCheckboxItem>
                            )
                        })}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
