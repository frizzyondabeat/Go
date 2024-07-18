'use client';

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, ListFilter, Search } from 'lucide-react';
import * as React from 'react';

import { api } from '@/app/_api/axios';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { AddUserDialog } from './add-user-dialog';
import { EditUserDialog } from './edit-user-dialog';
import { RemoveUserDialog } from './remove-user-dialog';
import { toastHandler } from '@/utils/toast';

const roleColors = {
    administrator: 'bg-blue-100 text-blue-800',
    'sales-manager': 'bg-green-100 text-green-800',
    'sales-representative': 'bg-amber-100 text-amber-800',
};

export type User = {
    id: string;
    name: string;
    role: 'administrator' | 'sales-manager' | 'sales-representative';
    email: string;
    password?: string;
};

export const columns: ColumnDef<User>[] = [
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
                    className={`w-[80%] rounded-md px-2 py-1 text-center text-xs capitalize ${roleColors[role]}`}
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

export function UsersTable() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const query = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            return (await api.get('/users')).data;
        },
    });

    const data = query.data ?? [];

    if (query.isError) {
        toastHandler({
            type: 'error',
            message: 'Failed to fetch users',
            id: 'users',
            title: 'Error',
        });
    }

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className="w-full rounded-md bg-white">
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                    <div className="relative hidden h-full items-center justify-center md:flex">
                        <Input
                            placeholder="Filter emails..."
                            value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
                            onChange={event =>
                                table.getColumn('email')?.setFilterValue(event.target.value)
                            }
                            className="max-w-sm bg-slate-50 px-10 dark:bg-slate-50/5"
                        />
                        <Search size={18} className="absolute left-3 text-slate-500" />
                    </div>
                    <Button variant="outline">
                        <ListFilter className="mr-2" />
                        <span>Filter</span>
                    </Button>
                </div>
                <AddUserDialog />
            </div>
            <div>
                <Table>
                    <TableHeader className="bg-slate-200">
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef.header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map(row => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && 'selected'}
                                >
                                    {row.getVisibleCells().map(cell => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 p-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{' '}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
