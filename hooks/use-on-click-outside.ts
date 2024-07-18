import { RefObject, useEffect } from 'react';

type Event = MouseEvent | TouchEvent;

/**
 * **Description:**
 *
 * This hook listens for clicks outside of a given element and calls a handler when it happens.
 *
 * **Usage:**
 *
 * ```ts
 * const ref = useRef<HTMLDivElement>(null);
 *
 * useOnClickOutside(ref, () => {
 *    console.log('Clicked outside!');
 * });
 *
 * return <div ref={ref}>Click outside me!</div>;
 * ```
 *
 * @param {any} ref:RefObject<T>
 * @param {any} handler:(event:Event)=>void
 * @returns {any}
 */
export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
    ref: RefObject<T>,
    handler: (event: Event | KeyboardEvent) => void
): any => {
    useEffect(() => {
        const listener = (event: Event) => {
            const el = ref?.current;
            if (!el || el.contains((event?.target as Node) || null)) {
                return;
            }

            handler(event);
        };

        const escKeyListener = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handler(event);
            }
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);
        document.addEventListener('keydown', escKeyListener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
            document.removeEventListener('keydown', escKeyListener);
        };
    }, [ref, handler]); // Reload only if ref or handler changes
};
