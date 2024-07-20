'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { useSearchParams, useRouter } from 'next/navigation';
import { UsersPageBreadCrumb } from './_components/breadcrumb-header';
import { UsersTable } from './_components/users-table';

const UsersAndRolesPage = () => {
    // const router = useRouter();
    // const searchParams = useSearchParams();
    // const tab = searchParams.get('tab') || 'users';

    return (
        <main className="flex h-full w-full flex-1 flex-col gap-7">
            <UsersPageBreadCrumb />
            <div>
                <h1 className="text-xl font-semibold">Users & Roles</h1>
                <p className="text-sm font-light text-slate-400">
                    Manage all users in your business
                </p>
            </div>
            <Tabs defaultValue={'users'} className="w-full">
                <TabsList>
                    <TabsTrigger
                        // onClick={() => {
                        //     router.push('/settings/users?tab=users', { scroll: false });
                        // }}
                        value="users"
                    >
                        Users
                    </TabsTrigger>
                    <TabsTrigger
                        // onClick={() => {
                        //     router.push('/settings/users?tab=roles', { scroll: false });
                        // }}
                        value="roles"
                    >
                        Roles
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="users">
                    <UsersTable />
                </TabsContent>
                <TabsContent value="roles"></TabsContent>
            </Tabs>
        </main>
    );
};

export default UsersAndRolesPage;
