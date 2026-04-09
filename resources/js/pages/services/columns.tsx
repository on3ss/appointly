import { Service } from '@/types/resource';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { DataTableColumnHeader } from '@/components/data-table-column-header';

export const columns: ColumnDef<Service>[] = [
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
        meta: { dropdownLabel: 'Name' },
    },
    {
        accessorKey: 'service_type',
        header: 'Service Type',
        cell: ({ row }) => {
            const type = row.getValue('service_type') as string;
            let variant: 'default' | 'secondary' | 'destructive' | 'outline' =
                'outline';
            switch (type) {
                case 'queue':
                    variant = 'secondary';
                    break;
                case 'timeslot':
                    variant = 'default';
                    break;
            }
            return (
                <Badge variant={variant} className="capitalize">
                    {type}
                </Badge>
            );
        },
        meta: { dropdownLabel: 'Service Type' },
    },
    {
        accessorKey: 'price',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Price" />
        ),
        cell: ({ row }) => {
            const price = row.getValue('price') as number;
            // dummy – no team currency yet, hardcode USD
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(price);
        },
        meta: { dropdownLabel: 'Price' },
    },
    {
        accessorKey: 'is_active',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const isActive = row.getValue('is_active') as boolean;
            return (
                <Badge variant={isActive ? 'default' : 'secondary'}>
                    {isActive ? 'Active' : 'Inactive'}
                </Badge>
            );
        },
        meta: { dropdownLabel: 'Status' },
    },
    {
        id: 'actions',
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row }) => {
            const service = row.original;
            return (
                <div className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                            >
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                onClick={() =>
                                    alert(
                                        `Edit service: ${service.name} (dummy action)`,
                                    )
                                }
                            >
                                <Pencil className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    alert(
                                        `Delete service: ${service.name} (dummy action)`,
                                    )
                                }
                                className="text-red-600"
                            >
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
        meta: { dropdownLabel: 'Actions', align: 'end' }, // <-- add align: 'end'
    },
];
