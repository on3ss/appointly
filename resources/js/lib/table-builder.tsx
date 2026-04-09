// resources/js/lib/table-builder.tsx
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { TableSchema, TableColumnSchema } from "@/types/table-schema";
import { FilterDefinition } from "@/components/data-table-filters";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { router } from "@inertiajs/react";

// Simple ActionsCell component (inline for now)
function ActionsCell<TData>({ row, actions }: { row: TData; actions: TableSchema['actions'] }) {
    return (
        <div className="text-right">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {actions?.edit && (
                        <DropdownMenuItem onClick={() => {
                            // Replace with actual edit navigation
                            console.log('Edit', row);
                        }}>
                            <Pencil className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                    )}
                    {actions?.delete && (
                        <DropdownMenuItem
                            onClick={() => {
                                // Replace with actual delete logic
                                console.log('Delete', row);
                            }}
                            className="text-red-600"
                        >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export function buildColumnsFromSchema<TData>(
    schema: TableSchema,
    additionalMeta?: Record<string, any>
): ColumnDef<TData>[] {
    const columns: ColumnDef<TData>[] = schema.columns.map((col) => {
        const baseColumn: ColumnDef<TData> = {
            accessorKey: col.key,
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={col.label} />
            ),
            enableSorting: col.sortable ?? false,
            meta: {
                align: col.align ?? 'left',
                ...additionalMeta,
            },
        };

        if (col.cellType === 'badge') {
            baseColumn.cell = ({ row }) => {
                const value = row.getValue(col.key) as string;
                let variant: "default" | "secondary" | "outline" = "outline";
                if (col.key === 'service_type') {
                    variant = value === 'timeslot' ? 'default' : 'secondary';
                }
                return <Badge variant={variant} className="capitalize">{value}</Badge>;
            };
        } else if (col.cellType === 'currency') {
            baseColumn.cell = ({ row }) => {
                const value = row.getValue(col.key) as number;
                return new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                }).format(value);
            };
        } else if (col.cellType === 'boolean') {
            baseColumn.cell = ({ row }) => {
                const isActive = row.getValue(col.key) as boolean;
                return (
                    <Badge variant={isActive ? "default" : "secondary"}>
                        {isActive ? 'Active' : 'Inactive'}
                    </Badge>
                );
            };
        } else if (col.cellType === 'custom' && col.cellComponent) {
            const CellComponent = col.cellComponent;
            baseColumn.cell = ({ row }) => (
                <CellComponent value={row.getValue(col.key)} row={row.original} />
            );
        }

        return baseColumn;
    });

    // Actions column
    if (schema.actions) {
        columns.push({
            id: 'actions',
            header: () => <div className="text-right">Actions</div>,
            cell: ({ row }) => <ActionsCell row={row.original} actions={schema.actions} />,
            enableSorting: false,
            meta: { align: 'end' },
        });
    }

    return columns;
}

export function buildFilterDefinitions(schema: TableSchema): FilterDefinition[] {
    return schema.columns
        .filter((col) => col.filterable)
        .map((col) => {
            // Map internal filterType to the FilterDefinition's expected type
            let type: FilterDefinition['type'];
            if (col.filterType === 'select') {
                type = 'select';
            } else {
                type = 'text'; // default
            }
            return {
                key: col.key,
                label: col.label,
                type,
                options: col.filterOptions,
            };
        });
}