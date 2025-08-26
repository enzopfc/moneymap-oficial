import * as React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '../lib/utils';
import { Button } from './button';

export interface ModalProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
}

export interface ModalTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export interface ModalContentProps {
  children: React.ReactNode;
  className?: string;
}

export interface ModalHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

const Modal = ({ children, open, onOpenChange }: ModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  );
};

const ModalTrigger = React.forwardRef<
  React.ElementRef<typeof Dialog.Trigger>,
  ModalTriggerProps
>(({ children, asChild = false, ...props }, ref) => (
  <Dialog.Trigger ref={ref} asChild={asChild} {...props}>
    {children}
  </Dialog.Trigger>
));
ModalTrigger.displayName = 'ModalTrigger';

const ModalContent = React.forwardRef<
  React.ElementRef<typeof Dialog.Content>,
  ModalContentProps & { size?: 'sm' | 'md' | 'lg' | 'xl' | 'full' }
>(({ className, children, size = 'md', ...props }, ref) => (
  <Dialog.Portal>
    <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
    <Dialog.Content
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%]',
        'w-full max-h-[85vh] overflow-y-auto',
        'bg-white rounded-2xl shadow-2xl border border-gray-100',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
        'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
        {
          'max-w-md': size === 'sm',
          'max-w-lg': size === 'md',
          'max-w-2xl': size === 'lg',
          'max-w-4xl': size === 'xl',
          'max-w-[95vw] max-h-[95vh]': size === 'full',
        },
        className
      )}
      {...props}
    >
      {children}
    </Dialog.Content>
  </Dialog.Portal>
));
ModalContent.displayName = 'ModalContent';

const ModalHeader = React.forwardRef<
  HTMLDivElement,
  ModalHeaderProps
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('px-6 py-4 border-b border-gray-200', className)}
    {...props}
  >
    {children}
  </div>
));
ModalHeader.displayName = 'ModalHeader';

const ModalFooter = React.forwardRef<
  HTMLDivElement,
  ModalFooterProps
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl', className)}
    {...props}
  >
    {children}
  </div>
));
ModalFooter.displayName = 'ModalFooter';

const ModalTitle = React.forwardRef<
  React.ElementRef<typeof Dialog.Title>,
  React.ComponentPropsWithoutRef<typeof Dialog.Title>
>(({ className, ...props }, ref) => (
  <Dialog.Title
    ref={ref}
    className={cn('text-xl font-semibold text-gray-900', className)}
    {...props}
  />
));
ModalTitle.displayName = 'ModalTitle';

const ModalDescription = React.forwardRef<
  React.ElementRef<typeof Dialog.Description>,
  React.ComponentPropsWithoutRef<typeof Dialog.Description>
>(({ className, ...props }, ref) => (
  <Dialog.Description
    ref={ref}
    className={cn('text-sm text-gray-600 mt-1', className)}
    {...props}
  />
));
ModalDescription.displayName = 'ModalDescription';

const ModalClose = React.forwardRef<
  React.ElementRef<typeof Dialog.Close>,
  React.ComponentPropsWithoutRef<typeof Dialog.Close>
>(({ className, children, ...props }, ref) => (
  <Dialog.Close
    ref={ref}
    className={cn(
      'absolute right-4 top-4 rounded-lg p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors',
      className
    )}
    {...props}
  >
    {children || (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    )}
    <span className="sr-only">Fechar</span>
  </Dialog.Close>
));
ModalClose.displayName = 'ModalClose';

export {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalClose,
};
