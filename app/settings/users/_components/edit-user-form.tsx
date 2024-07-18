import { editUserSchema, EditUserType } from '@/types/schemas/edit-user-schema';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from './users-table';
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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/app/_api/axios';
import { toastHandler } from '@/utils/toast';
import { cn } from '@/lib/utils';

type EditUserFormProps = {
    defaultValues: User;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EditUserForm: FC<EditUserFormProps> = ({ defaultValues, setOpen }) => {
    const [showPassword, setShowPassword] = useState(false);
    const form = useForm<EditUserType>({
        resolver: zodResolver(editUserSchema),
        defaultValues: {
            name: defaultValues.name,
            email: defaultValues.email,
            role: defaultValues.role,
            password: defaultValues.password,
        },
    });

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (data: EditUserType) => {
            return api.put(`/users/${defaultValues.id}`, data);
        },
        onSuccess: () => {
            setOpen(false);
            queryClient.invalidateQueries({
                queryKey: ['users'],
            });
            toastHandler({
                id: 'update-user',
                title: 'User updated successfully',
                type: 'success',
                message: 'User has been updated successfully',
            });
        },
        onError: () => {
            toastHandler({
                id: 'update-user',
                title: 'Failed to update user',
                type: 'error',
                message: 'Failed to update user',
            });
        },
    });

    const onSubmit = (data: EditUserType) => {
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
                            <FormDescription>
                                Password must be at least 8 characters long
                            </FormDescription>
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
                            <span>Updating user...</span>
                        </div>
                    ) : (
                        'Update User'
                    )}
                </Button>
            </form>
        </Form>
    );
};
