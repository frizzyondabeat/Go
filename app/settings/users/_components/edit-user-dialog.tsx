import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { UserIcon } from 'lucide-react';
import React, { useState } from 'react';
import { EditUserForm } from './edit-user-form';
import { Row } from '@tanstack/react-table';
import { User } from './users-table';

export const EditUserDialog = ({ row }: { row: Row<User> }) => {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="secondary"
                    className="bg-transparent p-0 text-blue-500 transition-all duration-200 ease-in-out hover:bg-transparent hover:text-blue-800"
                >
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <UserIcon className="size-10 rounded-full border-[0.5px] bg-blue-100 p-2 text-blue-400" />
                        <DialogTitle>Edit User</DialogTitle>
                    </div>
                    <EditUserForm defaultValues={row.original} setOpen={setOpen} />
                </div>
            </DialogContent>
        </Dialog>
    );
};
