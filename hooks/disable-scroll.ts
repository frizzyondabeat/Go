import React from 'react';

/**
 * **Description:**
 *
 * useDisableScroll is a custom hook that disables the scroll on the body element.
 *
 * **Usage:**
 *
 * ```tsx
 *
 * useDisableScroll();
 *
 * ```
 *
 * @param {any} dependencies:T
 * @returns {any}
 */
export const useDisableScroll = <T extends unknown>(dependencies?: T) => {
    React.useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [dependencies]);
};
