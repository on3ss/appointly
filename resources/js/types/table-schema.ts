import { BulkAction } from '@/components/data-table';

export interface TableColumnSchema {
    key: string;
    label: string;
    sortable?: boolean;
    searchable?: boolean;
    toggleable?: boolean;
    align?: 'left' | 'center' | 'right';
    width?: string;
    cellType?: 'text' | 'badge' | 'currency' | 'boolean' | 'custom';

    currency?: string;
    locale?: string;
    prefix?: string;
    suffix?: string;
    decimals?: number;

    trueLabel?: string;
    falseLabel?: string;
    trueVariant?: string;
    falseVariant?: string;
    trueIcon?: string;
    falseIcon?: string;

    variant?: string;
    colorMap?: Record<string, string>;
    icon?: string;
    iconPosition?: 'left' | 'right';
}

export interface FilterSchema {
    key: string;
    label: string;
    type: 'text' | 'select';
    options?: Array<{ label: string; value: string }>;
}

export interface TableSchema {
    columns: TableColumnSchema[];
    filters?: FilterSchema[];
    actions?: {
        edit?: boolean;
        delete?: boolean;
    };
    defaultSort?: { key: string; direction: 'asc' | 'desc' };
    bulkActions?: BulkAction<any>[];
    defaultHiddenColumns?: string[];
}
