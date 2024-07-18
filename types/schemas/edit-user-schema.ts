import z from 'zod';

export const editUserSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    role: z.enum(['sales-manager', 'administrator', 'sales-representative']),
    password: z.string(),
});

export type EditUserType = z.infer<typeof editUserSchema>;
