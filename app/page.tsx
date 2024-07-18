'use client';

import { useRouter } from 'next/navigation';

const IndexPage = () => {
    const router = useRouter();
    router.replace('/settings/users');
};

export default IndexPage;
