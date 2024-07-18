import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { addUserSchema, AddUserType } from '@/types/schemas/add-user-schema';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/app/_api/axios';
import { toastHandler } from '@/utils/toast';
import { cn } from '@/lib/utils';

type AddUserFormProps = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddUserForm: FC<AddUserFormProps> = ({ setOpen }) => {
    const [showPassword, setShowPassword] = useState(false);
    const queryClient = useQueryClient();
    const form = useForm<AddUserType>({
        resolver: zodResolver(addUserSchema),
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (data: AddUserType) => {
            return api.post('/users', data);
        },
        onSuccess: () => {
            setOpen(false);
            queryClient.invalidateQueries({
                queryKey: ['users'],
            });
            toastHandler({
                id: 'add-user',
                title: 'User added successfully',
                type: 'success',
                message: 'User has been added successfully',
            });
        },
        onError: () => {
            toastHandler({
                id: 'add-user',
                title: 'Failed to add user',
                type: 'error',
                message: 'Failed to add user',
            });
        },
    });

    const onSubmit = (data: AddUserType) => {
        mutate(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 w-full space-y-6">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage {...field} />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage {...field} />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder={field.value as string} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="sales-manager">Sales Manager</SelectItem>
                                    <SelectItem value="sales-representative">
                                        Sales Representative
                                    </SelectItem>
                                    <SelectItem value="administrator">Administrator</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage {...field} />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <div className="relative hidden h-full items-center justify-center md:flex">
                                    <Input {...field} type="password" />
                                    {showPassword ? (
                                        <Eye
                                            size={24}
                                            className="absolute right-2 cursor-pointer stroke-1 text-gray-400"
                                            onClick={() => setShowPassword(false)}
                                        />
                                    ) : (
                                        <EyeOff
                                            size={24}
                                            className="absolute right-2 cursor-pointer stroke-1 text-gray-400"
                                            onClick={() => setShowPassword(true)}
                                        />
                                    )}
                                </div>
                            </FormControl>

                            <FormMessage {...field} />
                        </FormItem>
                    )}
                />
                <Button
                    disabled={form.formState.isSubmitting || !form.formState.isDirty}
                    type="submit"
                    className="w-full bg-blue-500 transition-all duration-300 ease-in-out hover:bg-blue-700"
                >
                    {isPending ? (
                        <div className="flex items-center justify-center gap-2">
                            <LoaderCircle className={cn('animate-spin')} size={24} />
                            <span>Adding user...</span>
                        </div>
                    ) : (
                        'Add User'
                    )}
                </Button>
            </form>
        </Form>
    );
};
