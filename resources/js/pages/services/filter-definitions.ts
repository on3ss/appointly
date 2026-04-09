import { FilterDefinition } from '@/components/data-table-filters';

export const filterDefinitions: FilterDefinition[] = [
    {
        key: 'name',
        label: 'Name',
        type: 'text' as const,
    },
    {
        key: 'service_type',
        label: 'Service Type',
        type: 'select' as const,
        options: [
            { label: 'Timeslot', value: 'timeslot' },
            { label: 'Queue', value: 'queue' },
        ],
    },
    {
        key: 'is_active',
        label: 'Status',
        type: 'select' as const,
        options: [
            { label: 'Active', value: '1' },
            { label: 'Inactive', value: '0' },
        ],
    },
];
