'use client';

import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';

interface SidebarNavItemProps {
  icon: ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function SidebarNavItem({ icon, label, active = false, onClick }: SidebarNavItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-4 rounded-lg px-3 py-4 text-left transition-colors duration-150',
        active
          ? 'bg-blue-50 text-[#1570EF]'
          : 'text-[#5D6679] hover:bg-gray-50 hover:text-[#1570EF]',
      )}
    >
      <span className="flex h-6 w-6 shrink-0 items-center justify-center">{icon}</span>
      <span className="text-base font-medium">{label}</span>
    </button>
  );
}
