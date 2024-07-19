import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Row } from '@tanstack/react-table';
import React from 'react';
import { User } from '@/types/general-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/app/_api/axios';
import { toastHandler } from '@/utils/toast';
import { LoaderCircle, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export const RemoveUserDialog = ({ row }: { row: Row<User> }) => {
    const queryClient = useQueryClient();

    const [open, setOpen] = React.useState(false);

    const { mutate, isPending } = useMutation({
        mutationFn: () => {
            return api.delete(`/users/${row.original.id}`);
        },
        onSuccess: () => {
            setOpen(false);
            queryClient.invalidateQueries({
                queryKey: ['users'],
            });
            toastHandler({
                id: 'delete-user',
                title: 'User deleted successfully',
                type: 'success',
                message: 'User has been deleted successfully',
            });
        },
        onError: () => {
            toastHandler({
                id: 'delete-user',
                title: 'Failed to delete user',
                type: 'error',
                message: 'Failed to delete user',
            });
        },
    });

    const onSubmit = () => {
        mutate();
    };

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
                <div className="flex flex-col items-center justify-center space-y-4">
                    <DialogTitle className="text-xl">Delete this User</DialogTitle>
                    <p className="text-center text-sm">
                        This user and all associated data will be permanently removed. Do you wish
                        to continue
                    </p>
                    <div className="flex gap-2">
                        <Button variant={'outline'} onClick={() => setOpen(false)}>
                            Cancel action
                        </Button>
                        <Button
                            variant={'outline'}
                            onClick={onSubmit}
                            className="border-red-500 bg-red-100 text-red-500 transition-all duration-300 ease-in-out hover:border-0 hover:bg-red-500 hover:text-white"
                        >
                            {isPending ? (
                                <div className="flex items-center justify-center gap-2">
                                    <LoaderCircle className={cn('animate-spin')} size={24} />
                                    <span>Deleting user...</span>
                                </div>
                            ) : (
                                <>
                                    <Trash2 className="mr-2 size-4" />
                                    Yes, Delete
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
