import { DataTable } from './data-table';
import { buildColumnsFromSchema, buildFilterDefinitions } from '@/lib/table-builder';
import { PaginatedResponse } from '@/types/response';
import { TableSchema } from '@/types/table-schema';
import { useMemo } from 'react';

interface ResourceTableProps<TData> {
    schema: TableSchema;
    data: PaginatedResponse<TData>;
    filters: Record<string, any>;
    actionButtons?: React.ReactNode;
}

export function ResourceTable<TData>({ schema, data, filters, actionButtons }: ResourceTableProps<TData>) {
    const columns = useMemo(() => buildColumnsFromSchema<TData>(schema), [schema]);
    const filterDefs = useMemo(() => buildFilterDefinitions(schema), [schema]);

    return (
        <DataTable
            columns={columns}
            paginatedData={data}
            filters={filters}
            filterDefinitions={filterDefs}
            bulkActions={schema.bulkActions}
            defaultHiddenColumns={schema.defaultHiddenColumns}
            actionButtons={actionButtons}
        />
    );
}