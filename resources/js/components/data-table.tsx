// DataTable.tsx
import { router, usePage } from '@inertiajs/react';
import type {
    ColumnDef,
    SortingState,
    VisibilityState,
    RowSelectionState} from '@tanstack/react-table';
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { CircleX } from 'lucide-react';
import * as React from 'react';

import { useMemo, useCallback, useState, useEffect } from 'react';
import { useDebounceValue } from 'usehooks-ts';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import type { PaginatedResponse } from '@/types/response';
import type { FilterDefinition } from './data-table-filters';
import { DataTableFilters } from './data-table-filters';
import { DataTablePagination } from './data-table-pagination';
import { DataTableViewOptions } from './data-table-view-options';

export interface BulkAction<TData> {
    label: string;
    onClick: (selectedRows: TData[]) => void;
    variant?: 'default' | 'destructive' | 'outline';
    icon?: React.ReactNode;
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    paginatedData: PaginatedResponse<TData>;
    filters?: Record<string, any>;
    filterDefinitions?: FilterDefinition[];
    bulkActions?: BulkAction<TData>[];
    defaultHiddenColumns?: string[];
    noResultsMessage?: React.ReactNode;
    actionButtons?: React.ReactNode;
}

export function DataTable<TData, TValue>({
    columns,
    paginatedData,
    filters = {},
    filterDefinitions = [],
    bulkActions = [],
    defaultHiddenColumns = [],
    noResultsMessage = (
        <div className="flex flex-col items-center justify-center gap-2">
            <CircleX className="h-8 w-8 text-muted-foreground" />
            <div className="text-sm text-muted-foreground">
                No results found.
            </div>
        </div>
    ),
    actionButtons,
}: DataTableProps<TData, TValue>) {
    const initialColumnVisibility = useMemo(() => {
        return defaultHiddenColumns.reduce(
            (acc, colId) => ({ ...acc, [colId]: false }),
            {},
        );
    }, [defaultHiddenColumns]);

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        initialColumnVisibility,
    );
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [filtersState, setFiltersState] = useState(filters);
    const [debouncedFilters] = useDebounceValue(filtersState, 500);

    const { url } = usePage();
    const basePath = useMemo(() => url.split('?')[0], [url]);
    const data = paginatedData.data;

    const normalizeQuery = (query: string) =>
        new URLSearchParams(query).toString();

    const buildQueryParams = useCallback(
        (page = 1, perPage = paginatedData.per_page) => {
            const params = new URLSearchParams();

            if (sorting.length > 0) {
                const sort = sorting[0];
                const prefix = sort.desc ? '-' : '';
                params.set('sort', `${prefix}${sort.id}`);
            }

            Object.entries(debouncedFilters).forEach(([key, val]) => {
                if (val && Array.isArray(val)) {
val.forEach((v) => params.append(`filter[${key}][]`, v));
} else if (val != null && val !== '') {
params.set(`filter[${key}]`, val);
}
            });

            params.set('page', String(page));
            params.set('per_page', String(perPage));

            return params.toString();
        },
        [sorting, debouncedFilters, paginatedData.per_page],
    );

    const hasMounted = React.useRef(false);

    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true;

            return;
        }

        const newQuery = buildQueryParams(1);
        const currentQuery = window.location.search.slice(1);

        if (normalizeQuery(newQuery) !== normalizeQuery(currentQuery)) {
            router.visit(`${basePath}?${newQuery}`, {
                preserveState: true,
                replace: true,
            });
        }
    }, [debouncedFilters, sorting, basePath, buildQueryParams]);

    const handlePageChange = useCallback(
        (page: number) => {
            router.visit(`${basePath}?${buildQueryParams(page)}`, {
                preserveState: true,
                replace: true,
            });
        },
        [basePath, buildQueryParams],
    );

    const handlePerPageChange = useCallback(
        (perPage: number) => {
            router.visit(`${basePath}?${buildQueryParams(1, perPage)}`, {
                preserveState: true,
                replace: true,
            });
        },
        [basePath, buildQueryParams],
    );

    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({
        data,
        columns,
        manualPagination: true,
        manualSorting: true,
        manualFiltering: true,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
        },
    });

    const selectedRows = table
        .getSelectedRowModel()
        .rows.map((r) => r.original);

    return (
        <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4">
                    {filterDefinitions.length > 0 && (
                        <>
                            <DataTableFilters
                                filters={filtersState}
                                setFilters={setFiltersState}
                                filterDefinitions={filterDefinitions}
                                basePath={basePath}
                            />
                        </>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <DataTableViewOptions table={table} />
                    {actionButtons}
                </div>
            </div>

            {bulkActions.length > 0 && selectedRows.length > 0 && (
                <div className="flex items-center justify-between rounded bg-muted p-3">
                    <div className="text-sm">
                        {selectedRows.length} selected
                    </div>
                    <div className="flex gap-2">
                        {bulkActions.map((action, i) => (
                            <Button
                                key={i}
                                size="sm"
                                variant={action.variant ?? 'default'}
                                onClick={() => action.onClick(selectedRows)}
                            >
                                {action.icon}
                                {action.label}
                            </Button>
                        ))}
                    </div>
                </div>
            )}

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} role="row">
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        role="columnheader"
                                        aria-sort={
                                            header.column.getIsSorted()
                                                ? header.column.getIsSorted() ===
                                                  'desc'
                                                    ? 'descending'
                                                    : 'ascending'
                                                : undefined
                                        }
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext(),
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected()
                                            ? 'selected'
                                            : undefined
                                    }
                                    role="row"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} role="cell">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    {noResultsMessage}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <DataTablePagination
                table={table}
                pagination={{
                    currentPage: paginatedData.current_page,
                    lastPage: paginatedData.last_page,
                    perPage: paginatedData.per_page,
                    total: paginatedData.total,
                    onPageChange: handlePageChange,
                    onPerPageChange: handlePerPageChange,
                }}
            />
        </div>
    );
}
