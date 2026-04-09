import { BulkAction } from "@/components/data-table";

export interface TableColumnSchema {
    key: string;
    label: string;
    sortable?: boolean;
    filterable?: boolean;
    filterType?: 'text' | 'select' | 'boolean';
    filterOptions?: Array<{ label: string; value: string }>;
    cellType?: 'text' | 'badge' | 'currency' | 'boolean' | 'custom';
    // Additional metadata for custom rendering
    align?: 'left' | 'center' | 'right';
    width?: string;
    // For custom cell components
    cellComponent?: React.ComponentType<{ value: any; row: any }>;
}

export interface TableSchema {
    columns: TableColumnSchema[];
    actions?: {
        edit?: boolean;
        delete?: boolean;
        // custom actions...
    };
    defaultSort?: { key: string; direction: 'asc' | 'desc' };
    bulkActions?: BulkAction<any>[];
    defaultHiddenColumns?: string[];
}