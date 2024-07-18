'use client';

import { cn } from '@/lib/utils';
import React, { FC, PropsWithChildren } from 'react';
import { Button, buttonVariants } from './ui/button';
import { ArrowLeftToLine } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { SidebarItemProps } from '@/types';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const Sidebar: FC<PropsWithChildren> = ({ children }) => {
    return (
        <aside className="hidden h-full w-[20%] rounded bg-white sm:flex">
            <nav className="flex h-full w-full flex-col p-3 shadow-lg dark:text-white">
                <span className="text-xs font-semibold">Settings</span>

                <ul className={cn('flex-1 space-y-2 px-4')}>{children}</ul>

                <div className="flex w-full items-center justify-center">
                    <Button variant={'outline'}>
                        <ArrowLeftToLine className="mr-2 size-4" />
                        <span>Back to Dashboard</span>
                    </Button>
                </div>
            </nav>
        </aside>
    );
};

export const SidebarItem: FC<SidebarItemProps> = ({ icon: Icon, href, label }) => {
    const pathname = usePathname();

    const isActive =
        (pathname === '/' && href === '/') || pathname === href || pathname?.startsWith(`${href}/`);

    const MotionLink = motion(Link);

    const isSettings = label.includes('Settings');

    return (
        <li className="group relative flex items-center justify-between">
            <MotionLink
                whileHover={{ scale: !isActive ? 1.05 : 1 }}
                transition={{ duration: 0.3 }}
                href={href}
                className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    'hover:bg-primary-100/15 relative w-full justify-start rounded-sm p-0 transition-colors duration-300'
                )}
            >
                {isActive && (
                    <motion.div
                        layoutId="active-tab"
                        className="absolute inset-0 rounded-r-md bg-gradient-to-r from-transparent to-blue-500/10 dark:to-blue-200/30"
                    />
                )}
                <Icon
                    className={cn(
                        'size-5 stroke-[1.5] transition-all duration-200 group-hover:delay-100',
                        {
                            '-rotate-6 stroke-2 text-blue-700 dark:text-white': isActive,
                            'group-hover:animate-spin-slow': isSettings && !isActive,
                            'group-hover:animate-wiggle': !isSettings && !isActive,
                        }
                    )}
                />
                <span
                    className={cn('ml-5 overflow-hidden text-xs font-normal transition-all', {
                        'font-medium text-blue-700 dark:text-white': isActive,
                    })}
                >
                    {label}
                </span>
                {isActive && (
                    <div className="absolute right-0 h-10 w-1 rounded-r-full bg-blue-700 dark:bg-blue-200" />
                )}
            </MotionLink>
        </li>
    );
};
