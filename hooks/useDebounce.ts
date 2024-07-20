import { useEffect, useState } from 'react';

/**
 * **Description:**
 * This hook is used to debounce the value passed to it.
 *
 * **Usage:**
 *
 * ```tsx
 *
 * import { useDebounce } from '@/hooks';
 *
 * const [searchValue, setSearchValue] = useState<string>('');
 *
 * const debouncedSearchValue = useDebounce(searchValue, 300);
 *
 * ```
 *
 * @param {any} value:T
 * @param {any} delay:number Default value is 500
 * @returns {any} debouncedValue:T
 */
export const useDebounce = <T>(value: T, delay: number = 500): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
};
