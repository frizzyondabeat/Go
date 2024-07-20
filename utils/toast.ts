import { toast, ToastT } from 'sonner';

type ToastProps<T> = ToastT & {
    title: string;
    message: string;
    loading?: string;
    success?: (value: T) => string;
    error?: (error: T) => string;
};

/**
 * **Description:**
 *
 * This function is a wrapper around the `sonner` library's `toast` function.
 *
 * **Parameters:**
 * @template T
 * @param {any} title
 * @param {any} type
 * @param {any} promise
 * @param {any} message
 * @param {any} className
 * @param {any} loading
 * @param {any} success
 * @param {any} error
 * @param {any} ...props:ToastProps<T>
 * @returns {void}
 */
export const toastHandler = <T>({
    title,
    type,
    promise,
    message,
    className,
    loading,
    success,
    error,
    ...props
}: ToastProps<T>): void => {
    switch (type) {
        case 'success':
            toast.success(title, { description: message, className, ...props });
            break;
        case 'error':
            toast.error(title, { description: message, className, ...props });
            break;
        case 'warning':
            toast.warning(title, { description: message, className, ...props });
            break;
        case 'info':
            toast.info(title, { description: message, className, ...props });
            break;
        case 'action':
            toast(title, { ...props });
            break;
        default:
            toast(title, { description: message, className, ...props });
            break;
    }

    if (promise) {
        toast.promise(promise, { loading, success, error, ...props });
    }
};
