import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { User } from '@/types/general-types';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { EditUserDialog } from './edit-user-dialog';
import { RemoveUserDialog } from './remove-user-dialog';

const roleColors = {
    administrator: 'bg-blue-100 text-blue-800',
    'sales-manager': 'bg-green-100 text-green-800',
    'sales-representative': 'bg-amber-100 text-amber-800',
};

export const usersColumns: ColumnDef<User>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={value => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div>{row.getValue('name')}</div>,
    },
    {
        accessorKey: 'email',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
    },
    {
        accessorKey: 'role',
        header: 'Role',
        cell: ({ row }) => {
            const role = row.getValue('role') as User['role'];
            return (
                <div
                    className={`inline-flex rounded-md px-2 py-1 text-center text-xs capitalize ${roleColors[role]}`}
                >
                    {role.replace('-', ' ')}
                </div>
            );
        },
    },
    {
        id: 'actions',
        enableHiding: false,
        header: 'Actions',
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-3">
                    <EditUserDialog row={row} />
                    <RemoveUserDialog row={row} />
                </div>
            );
        },
    },
];
