import { FC, PropsWithChildren, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'framer-motion';

type ReactPortalProps = PropsWithChildren & {
    wrapperId: string;
};

const createWrapperAndAppendToBody = (wrapperId: string) => {
    if (!document) return null;
    const wrapperElement = document.createElement('div');
    wrapperElement.setAttribute('id', wrapperId);
    document.body.appendChild(wrapperElement);
    return wrapperElement;
};

/**
 * **Description:**
 *
 * ReactPortal component is used to create a portal for the children to be rendered in a different part of the DOM.
 *
 * **Usage:**
 *
 * ```tsx
 *
 * <ReactPortal wrapperId="portal-wrapper">
 *
 *      <div>Portal Content</div>
 *
 * </ReactPortal>
 *
 * ```
 * @param {any} children
 * @param {any} wrapperId
 * @returns {any}
 */
export const ReactPortal: FC<ReactPortalProps> = ({ children, wrapperId }) => {
    const [wrapperElement, setWrapperElement] = useState<HTMLElement>();

    useLayoutEffect(() => {
        let element = document.getElementById(wrapperId);
        let systemCreated = false;
        if (!element) {
            systemCreated = true;
            element = createWrapperAndAppendToBody(wrapperId);
        }
        setWrapperElement(element!);

        return () => {
            if (systemCreated && element?.parentNode) {
                element?.parentNode.removeChild(element);
            }
        };
    }, [wrapperId]);

    if (!wrapperElement) return null;

    return createPortal(<AnimatePresence mode="wait">{children}</AnimatePresence>, wrapperElement);
};
