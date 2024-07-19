'use client';

import {
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
import { ListFilter, Loader, Search } from 'lucide-react';
import * as React from 'react';
import { api } from '@/app/_api/axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { toastHandler } from '@/utils/toast';
import { useQuery } from '@tanstack/react-query';
import { AddUserDialog } from './add-user-dialog';
import { usersColumns } from './users-table-columns';

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
        columns: usersColumns,
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
        <div className="w-full rounded-md bg-white @container">
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                    <div className="relative flex h-full items-center justify-center">
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
                        <ListFilter className="size-4 @lg:mr-2" />
                        <span className="hidden @lg:flex">Filter</span>
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
                        {query.isLoading ? (
                            <TableCell
                                colSpan={usersColumns.length}
                                className="items-center justify-center text-center"
                            >
                                <div className="flex items-center justify-center">
                                    <Loader className="size-16 animate-spin-slower" />
                                </div>
                            </TableCell>
                        ) : table.getRowModel().rows?.length ? (
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
                                <TableCell
                                    colSpan={usersColumns.length}
                                    className="h-24 text-center"
                                >
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
