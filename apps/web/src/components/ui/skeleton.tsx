'use client';

import { cn } from '../../lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]',
        className
      )}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-32" />
        </div>
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
        <Skeleton className="h-6 w-48" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>
      <Skeleton className="h-[300px] sm:h-[350px] w-full" />
    </div>
  );
}

export function TransactionSkeleton() {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-3">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="space-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
      <div className="text-right space-y-1">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
}

export function AccountSkeleton() {
  return (
    <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-3">
        <Skeleton className="h-10 w-10 rounded-lg" />
        <div className="space-y-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
      <div className="text-right space-y-1">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
}

export function GoalSkeleton() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-40" />
        </div>
        <Skeleton className="h-6 w-12 rounded-full" />
      </div>
      <Skeleton className="h-2 w-full rounded-full" />
    </div>
  );
}