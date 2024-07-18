'use client';

import { sidebarRoutes } from '@/utils/helpers';
import { Sidebar, SidebarItem } from './Sidebar';

export const SidebarWrapper = () => {
    return (
        <Sidebar>
            {sidebarRoutes.map((route, index) => (
                <SidebarItem key={index} {...route} />
            ))}
        </Sidebar>
    );
};
