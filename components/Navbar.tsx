import Logo from '@/public/images/logo.png';
import Profile from '@/public/images/profile.png';
import { Bell, ChevronDown, CircleHelp, Search, Settings, Wallet } from 'lucide-react';
import Image from 'next/image';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';

const NavbarButtonOptions = [
    {
        name: 'Notifications',
        icon: Bell,
    },
    {
        name: 'Wallet',
        icon: Wallet,
    },
    {
        name: 'Inquiries',
        icon: CircleHelp,
    },
    {
        name: 'Settings',
        icon: Settings,
    },
];

export const Navbar = () => {
    return (
        <header className="flex h-[65px] w-full items-center justify-between border-b bg-white px-8 py-2 shadow-sm">
            <div className="flex space-x-4">
                <Image src={Logo} alt="logo" className="size-9" quality={100} />
                <div className="relative hidden h-full items-center justify-center md:flex">
                    <Input
                        placeholder="Search here..."
                        className="w-96 bg-slate-50 px-10 dark:bg-slate-50/5"
                    />
                    <Search size={18} className="absolute left-3 text-slate-500" />
                </div>
            </div>
            <div className="flex gap-5">
                {NavbarButtonOptions.map(({ name, icon: Icon }, index) => (
                    <div
                        key={`${name}-${index}`}
                        className="group flex cursor-pointer flex-col items-center justify-center gap-1"
                    >
                        <Icon
                            className={cn(
                                'size-4 transition-all duration-300 ease-in-out group-hover:text-blue-500',
                                {
                                    'group-hover:animate-wiggle': name !== 'Settings',
                                    'group-hover:animate-spin-slow': name === 'Settings',
                                }
                            )}
                        />
                        <span className="text-xs group-hover:text-blue-500">{name}</span>
                    </div>
                ))}
                <div className="flex items-center gap-1">
                    <Image src={Profile} alt="profile" className="size-9" quality={100} />
                    <ChevronDown size={18} className="text-slate-500" />
                </div>
            </div>
        </header>
    );
};
