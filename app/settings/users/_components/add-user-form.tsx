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
import { Eye, EyeOff } from 'lucide-react';

export const AddUserForm: FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const form = useForm<AddUserType>({
        resolver: zodResolver(addUserSchema),
    });

    const onSubmit = (data: AddUserType) => {
        console.log(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 w-full space-y-4">
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
                                            className="absolute right-2 cursor-pointer text-gray-400"
                                            onClick={() => setShowPassword(false)}
                                        />
                                    ) : (
                                        <EyeOff
                                            size={24}
                                            className="absolute right-2 cursor-pointer text-gray-400"
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
                    Update User
                </Button>
            </form>
        </Form>
    );
};
