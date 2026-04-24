import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import * as Icons from 'lucide-react';
import { DataTableColumnHeader } from '@/components/data-table-column-header';
import type { FilterDefinition } from '@/components/data-table-filters';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { TableSchema } from '@/types/table-schema';

const Icon = ({ name, className }: { name?: string; className?: string }) => {
    if (!name) {
return null;
}

    // @ts-expect-error - dynamic import from lucide
    const LucideIcon = Icons[name];

    return LucideIcon ? <LucideIcon className={className} /> : null;
};

function ActionsCell<TData>({
    row,
    actions,
}: {
    row: TData;
    actions: TableSchema['actions'];
}) {
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
                        <DropdownMenuItem
                            onClick={() => console.log('Edit', row)}
                        >
                            <Pencil className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                    )}
                    {actions?.delete && (
                        <DropdownMenuItem
                            onClick={() => console.log('Delete', row)}
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
    additionalMeta?: Record<string, any>,
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

        if (col.cellType === 'currency') {
            baseColumn.cell = ({ row }) => {
                const value = row.getValue(col.key) as
                    | number
                    | string
                    | null
                    | undefined;

                if (value === null || value === undefined || value === '') {
                    return <span className="text-muted-foreground">—</span>;
                }

                const numericValue =
                    typeof value === 'string' ? parseFloat(value) : value;

                if (isNaN(numericValue)) {
                    return <span className="text-muted-foreground">—</span>;
                }

                const currency = col.currency || 'USD';
                const rawLocale = col.locale || 'en-US';
                const locale = rawLocale.replace(/_/g, '-');
                const prefix = col.prefix || '';
                const suffix = col.suffix || '';
                const decimals = col.decimals ?? 2;

                try {
                    const formatted = new Intl.NumberFormat(locale, {
                        style: 'currency',
                        currency,
                        minimumFractionDigits: decimals,
                        maximumFractionDigits: decimals,
                    }).format(numericValue);

                    return (
                        <span>
                            {prefix}
                            {formatted}
                            {suffix}
                        </span>
                    );
                } catch {
                    const fallback = `${currency} ${numericValue.toFixed(decimals)}`;

                    return (
                        <span>
                            {prefix}
                            {fallback}
                            {suffix}
                        </span>
                    );
                }
            };
        } else if (col.cellType === 'boolean') {
            baseColumn.cell = ({ row }) => {
                const isTrue = row.getValue(col.key) as boolean;
                const label = isTrue
                    ? col.trueLabel || 'Active'
                    : col.falseLabel || 'Inactive';
                const variant = isTrue
                    ? col.trueVariant || 'default'
                    : col.falseVariant || 'secondary';
                const iconName = isTrue ? col.trueIcon : col.falseIcon;

                return (
                    <Badge variant={variant as any}>
                        <Icon name={iconName} className="mr-1 h-3 w-3" />
                        {label}
                    </Badge>
                );
            };
        } else if (col.cellType === 'badge') {
            baseColumn.cell = ({ row }) => {
                const value = row.getValue(col.key) as string;
                const colorMap = col.colorMap || {};
                const variant = col.variant || 'outline';
                const iconName = col.icon;
                const iconPos = col.iconPosition || 'left';

                const badgeVariant = colorMap[value] || variant;

                return (
                    <Badge variant={badgeVariant as any} className="capitalize">
                        {iconName && iconPos === 'left' && (
                            <Icon name={iconName} className="mr-1 h-3 w-3" />
                        )}
                        {value}
                        {iconName && iconPos === 'right' && (
                            <Icon name={iconName} className="ml-1 h-3 w-3" />
                        )}
                    </Badge>
                );
            };
        } else if (col.cellType === 'custom' && (col as any).cellComponent) {
            const CellComponent = (col as any).cellComponent;
            baseColumn.cell = ({ row }) => (
                <CellComponent
                    value={row.getValue(col.key)}
                    row={row.original}
                />
            );
        }

        return baseColumn;
    });

    if (schema.actions) {
        columns.push({
            id: 'actions',
            header: () => <div className="text-right">Actions</div>,
            cell: ({ row }) => (
                <ActionsCell row={row.original} actions={schema.actions} />
            ),
            enableSorting: false,
            meta: { align: 'end' },
        });
    }

    return columns;
}

export function buildFilterDefinitions(
    schema: TableSchema,
): FilterDefinition[] {
    if (schema.filters) {
        return schema.filters.map((f) => ({
            key: f.key,
            label: f.label,
            type: f.type,
            options: f.options,
        }));
    }

    return schema.columns
        .filter((col) => (col as any).filterable)
        .map((col) => ({
            key: col.key,
            label: col.label,
            type: ((col as any).filterType === 'select'
                ? 'select'
                : 'text') as any,
            options: (col as any).filterOptions,
        }));
}
