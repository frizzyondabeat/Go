'use client';
import React, { FC, PropsWithChildren, useRef } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { useDisableScroll, useOnClickOutside } from '@/hooks';
import { ReactPortal } from './react-portal';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { X } from 'lucide-react';

type ModalProps = PropsWithChildren & {
    isOpen: boolean;
    onClose: () => void;
};

export const ModalContext = React.createContext<ModalProps>({
    isOpen: false,
    onClose: () => {},
});

const Modal: FC<ModalProps> & {
    Container: FC<ModalContainerProps>;
    Content: FC<ModalContentProps>;
    Header: FC<ModalHeaderProps>;
    Body: FC<ModalBodyProps>;
    Footer: FC<ModalFooterProps>;
} = ({ children, isOpen, onClose }) => {
    return (
        isOpen && (
            <ReactPortal wrapperId="modal">
                <ModalContext.Provider value={{ isOpen, onClose }}>
                    {children}
                </ModalContext.Provider>
            </ReactPortal>
        )
    );
};

export const useModal = () => {
    if (!React.useContext(ModalContext)) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return React.useContext(ModalContext);
};

export type ModalContainerProps = PropsWithChildren & {
    className?: string;
};

const ModalContainer: FC<ModalContainerProps> = ({ children, className }) => {
    return (
        <motion.div
            key="modal-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
                'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-[1px]',
                className
            )}
        >
            {children}
        </motion.div>
    );
};

export type ModalContentProps = PropsWithChildren & {
    className?: string;
    animateDirection?: 'from-bottom' | 'from-right';
};

const ModalContent: FC<ModalContentProps> = ({
    children,
    className,
    animateDirection = 'from-bottom',
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const { onClose: toggleModal } = useModal();
    useOnClickOutside(ref, toggleModal);
    useDisableScroll();

    return (
        <motion.div
            ref={ref}
            key="modal-content"
            initial={{
                opacity: 0,
                y: animateDirection === 'from-bottom' ? 50 : 0,
                x: animateDirection === 'from-right' ? 50 : 0,
            }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{
                opacity: 0,
                y: animateDirection === 'from-bottom' ? 50 : 0,
                x: animateDirection === 'from-right' ? 50 : 0,
            }}
            transition={{ duration: 0.3 }}
            className={cn(
                'max-h-screen w-full max-w-lg rounded-xl bg-white p-4 shadow-md',
                className
            )}
        >
            {children}
        </motion.div>
    );
};

export type ModalHeaderProps = PropsWithChildren & {
    className?: string;
    type?: 'HEADLESS' | 'PRIMARY' | 'SECONDARY' | 'CUSTOM' | 'EMPTY';
    title?: string;
    subtitle?: string;
    closeIconClass?: string;
    closeIconBgClass?: string;
};

const ModalHeader: FC<ModalHeaderProps> = ({
    children,
    className,
    type,
    title,
    closeIconClass,
    closeIconBgClass,
    subtitle,
}) => {
    const { onClose: toggleModal } = useModal();
    const renderHeadless = () => (
        <div className={cn('flex w-full justify-end px-5', className)}>
            <Button
                onClick={toggleModal}
                variant="destructive"
                size={'icon'}
                className={cn('p-1', closeIconBgClass)}
            >
                <X className={cn('size-4 stroke-1', closeIconClass)} />
            </Button>
        </div>
    );

    const renderPrimary = () => (
        <div
            className={cn(
                'flex w-full items-center justify-between border-b px-4 pb-4 pt-0',
                className
            )}
        >
            <div className="flex flex-col leading-3">
                <span className="text-base font-medium">{title}</span>
                <h3 className="text-sm font-light text-gray-400">{subtitle}</h3>
            </div>
            <Button
                onClick={toggleModal}
                variant="destructive"
                size={'icon'}
                className={cn('p-1', closeIconBgClass)}
            >
                <X className={cn('size-4 stroke-1', closeIconClass)} />
            </Button>
        </div>
    );

    const renderCustom = () => (
        <div className={cn('relative flex w-full items-center justify-center p-4', className)}>
            {children}
            <Button
                onClick={toggleModal}
                variant="destructive"
                size={'icon'}
                className={cn('absolute right-2 top-2 p-1', closeIconBgClass)}
            >
                <X className={cn('size-4 stroke-1', closeIconClass)} />
            </Button>
        </div>
    );

    const renderEmpty = () => <></>;

    const renderMap: Record<string, () => JSX.Element> = {
        HEADLESS: renderHeadless,
        PRIMARY: renderPrimary,
        CUSTOM: renderCustom,
        EMPTY: renderEmpty,
    };

    const render = renderMap[type!] || renderEmpty;

    return <>{render()}</>;
};

export type ModalBodyProps = PropsWithChildren & {
    className?: string;
};

const ModalBody: FC<ModalBodyProps> = ({ children, className }) => {
    return <div className={cn('mt-4', className)}>{children}</div>;
};

export type ModalFooterProps = PropsWithChildren & {
    className?: string;
};

const ModalFooter: FC<ModalFooterProps> = ({ children, className }) => {
    return <div className={cn('mt-4 flex w-full border-t px-4', className)}>{children}</div>;
};

Modal.Container = ModalContainer;
Modal.Content = ModalContent;
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export { Modal };
