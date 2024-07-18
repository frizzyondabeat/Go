import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Row } from '@tanstack/react-table';
import React from 'react';
import { User } from './users-table';

export const RemoveUserDialog = ({ row }: { row: Row<User> }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    className="bg-transparent p-0 text-slate-400 transition-all duration-200 ease-in-out hover:bg-transparent hover:text-red-700"
                >
                    Remove
                </Button>
            </DialogTrigger>
            <DialogContent>
                <div className="flex flex-col items-center justify-center"></div>
            </DialogContent>
        </Dialog>
    );
};
