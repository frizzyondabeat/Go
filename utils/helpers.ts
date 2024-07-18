import {
    Banknote,
    BellRing,
    Cloud,
    LockIcon,
    LucideUser,
    LucideUsersRound,
    TagIcon,
} from 'lucide-react';

export const sidebarRoutes = [
    {
        label: 'Account',
        href: '/settings/account',
        icon: LucideUser,
    },
    {
        label: 'Security',
        href: '/settings/security',
        icon: LockIcon,
    },
    {
        label: 'Notifications',
        href: '/settings/notifications',
        icon: BellRing,
    },
    {
        label: 'Pricing',
        href: '/settings/pricing',
        icon: Banknote,
    },
    {
        label: 'Sales',
        href: '/settings/sales',
        icon: TagIcon,
    },
    {
        label: 'Users & Roles',
        href: '/settings/users',
        icon: LucideUsersRound,
    },

    {
        label: 'Backups',
        href: '/settings/backups',
        icon: Cloud,
    },
];
