import { Navbar } from '@/components/Navbar';
import { SidebarWrapper } from '@/components/SidebarWrapper';
import { FC, PropsWithChildren } from 'react';

const SettingsLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="flex h-dvh w-screen flex-col">
            <Navbar />
            <div className="flex h-full w-full gap-10 bg-slate-200 p-10">
                <SidebarWrapper />
                {children}
            </div>
        </div>
    );
};

export default SettingsLayout;
