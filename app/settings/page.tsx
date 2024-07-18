'use client';

import { useRouter } from 'next/navigation';

const SettingsPage = () => {
    const router = useRouter();
    router.replace('/settings/account');
};

export default SettingsPage;
