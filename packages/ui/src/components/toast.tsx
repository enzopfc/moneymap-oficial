import * as React from 'react';
import * as Toast from '@radix-ui/react-toast';
import { cn } from '../lib/utils';

export interface ToastProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export interface ToastProviderProps {
  children: React.ReactNode;
}

export interface ToastViewportProps {
  className?: string;
}

const ToastProvider = ({ children }: ToastProviderProps) => {
  return (
    <Toast.Provider swipeDirection="right" duration={5000}>
      {children}
    </Toast.Provider>
  );
};

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof Toast.Viewport>,
  ToastViewportProps
>(({ className, ...props }, ref) => (
  <Toast.Viewport
    ref={ref}
    className={cn(
      'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]',
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = 'ToastViewport';

const ToastRoot = React.forwardRef<
  React.ElementRef<typeof Toast.Root>,
  React.ComponentPropsWithoutRef<typeof Toast.Root> & {
    variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  }
>(({ className, variant = 'default', ...props }, ref) => {
  const variantStyles = {
    default: 'bg-white border-gray-200',
    success: 'bg-green-50 border-green-200 text-green-900',
    error: 'bg-red-50 border-red-200 text-red-900',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-900',
    info: 'bg-blue-50 border-blue-200 text-blue-900',
  };

  return (
    <Toast.Root
      ref={ref}
      className={cn(
        'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-xl border p-4 pr-8 shadow-lg transition-all',
        'data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none',
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
});
ToastRoot.displayName = 'ToastRoot';

const ToastAction = React.forwardRef<
  React.ElementRef<typeof Toast.Action>,
  React.ComponentPropsWithoutRef<typeof Toast.Action>
>(({ className, ...props }, ref) => (
  <Toast.Action
    ref={ref}
    className={cn(
      'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive',
      className
    )}
    {...props}
  />
));
ToastAction.displayName = 'ToastAction';

const ToastClose = React.forwardRef<
  React.ElementRef<typeof Toast.Close>,
  React.ComponentPropsWithoutRef<typeof Toast.Close>
>(({ className, ...props }, ref) => (
  <Toast.Close
    ref={ref}
    className={cn(
      'absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600',
      className
    )}
    toast-close=""
    {...props}
  >
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  </Toast.Close>
));
ToastClose.displayName = 'ToastClose';

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof Toast.Title>,
  React.ComponentPropsWithoutRef<typeof Toast.Title>
>(({ className, ...props }, ref) => (
  <Toast.Title
    ref={ref}
    className={cn('text-sm font-semibold', className)}
    {...props}
  />
));
ToastTitle.displayName = 'ToastTitle';

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof Toast.Description>,
  React.ComponentPropsWithoutRef<typeof Toast.Description>
>(({ className, ...props }, ref) => (
  <Toast.Description
    ref={ref}
    className={cn('text-sm opacity-90', className)}
    {...props}
  />
));
ToastDescription.displayName = 'ToastDescription';

// Hook para usar toast
type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

interface UseToastProps {
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

const useToast = () => {
  const [toasts, setToasts] = React.useState<(UseToastProps & { id: string; open: boolean })[]>([]);

  const toast = React.useCallback((props: UseToastProps) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { ...props, id, open: true };
    
    setToasts(prev => [...prev, newToast]);

    // Auto remove after duration
    setTimeout(() => {
      setToasts(prev => prev.map(t => t.id === id ? { ...t, open: false } : t));
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 150); // Wait for animation
    }, props.duration || 5000);

    return id;
  }, []);

  const dismiss = React.useCallback((id?: string) => {
    if (id) {
      setToasts(prev => prev.map(t => t.id === id ? { ...t, open: false } : t));
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 150);
    } else {
      setToasts(prev => prev.map(t => ({ ...t, open: false })));
      setTimeout(() => {
        setToasts([]);
      }, 150);
    }
  }, []);

  return {
    toast,
    dismiss,
    toasts,
  };
};

export {
  ToastProvider,
  ToastViewport,
  ToastRoot,
  ToastAction,
  ToastClose,
  ToastTitle,
  ToastDescription,
  useToast,
};
