import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PlusCircle, UserIcon } from 'lucide-react';
import { useState } from 'react';
import { AddUserForm } from './add-user-form';

export const AddUserDialog = () => {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-blue-500 transition-all duration-300 ease-in-out hover:bg-blue-700">
                    <PlusCircle className="size-4 @lg:mr-2" />
                    <span className="hidden @lg:flex">New user</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <UserIcon className="size-10 rounded-full border-[0.5px] bg-blue-100 p-2 text-blue-400" />
                        <DialogTitle>New User</DialogTitle>
                    </div>
                    <AddUserForm setOpen={setOpen} />
                </div>
            </DialogContent>
        </Dialog>
    );
};
