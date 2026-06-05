'use client';

import { useRouter } from 'next/navigation';
import { SidebarNavItem } from './SidebarNavItem';
import { ROUTES } from '@/mocked-routes';

// SVG Icons
function HomeIcon() {
  return (
    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 7.5L9 1L17 7.5V17.5C17 17.7652 16.8946 18.0196 16.7071 18.2071C16.5196 18.3946 16.2652 18.5 16 18.5H12C11.7348 18.5 11.4804 18.3946 11.2929 18.2071C11.1054 18.0196 11 17.7652 11 17.5V13.5H7V17.5C7 17.7652 6.89464 18.0196 6.70711 18.2071C6.51957 18.3946 6.26522 18.5 6 18.5H2C1.73478 18.5 1.48043 18.3946 1.29289 18.2071C1.10536 18.0196 1 17.7652 1 17.5V7.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BoxIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21 16V8C20.9996 7.64927 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64927 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M3.27002 6.96L12 12.01L20.73 6.96" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 22.08V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="3" width="15" height="13" rx="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 8H19L23 12V16H16V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="5.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="18.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.1667 10C16.1667 10.3667 16.1334 10.725 16.075 11.075L18.1584 12.6083C18.3417 12.75 18.3917 13.0083 18.275 13.2167L16.275 16.7833C16.1584 16.9917 15.9084 17.075 15.6917 16.9917L13.2667 15.9917C12.7417 16.3917 12.1667 16.725 11.5417 16.975L11.1667 19.5583C11.1334 19.7917 10.9334 20 10.6917 20H6.69169C6.45002 20 6.25002 19.7917 6.21669 19.5583L5.84169 16.975C5.21669 16.725 4.64169 16.3917 4.11669 15.9917L1.69169 16.9917C1.47502 17.075 1.22502 16.9917 1.10836 16.7833L-0.891638 13.2167C-1.0083 13.0083 -0.958298 12.75 -0.774965 12.6083L1.30836 11.075C1.25003 10.725 1.21669 10.3667 1.21669 10C1.21669 9.63333 1.25003 9.275 1.30836 8.925L-0.774965 7.39167C-0.958298 7.25 -1.0083 6.99167 -0.891638 6.78333L1.10836 3.21667C1.22502 3.00833 1.47502 2.925 1.69169 3.00833L4.11669 4.00833C4.64169 3.60833 5.21669 3.275 5.84169 3.025L6.21669 0.441667C6.25002 0.208333 6.45002 0 6.69169 0H10.6917C10.9334 0 11.1334 0.208333 11.1667 0.441667L11.5417 3.025C12.1667 3.275 12.7417 3.60833 13.2667 4.00833L15.6917 3.00833C15.9084 2.925 16.1584 3.00833 16.275 3.21667L18.275 6.78333C18.3917 6.99167 18.3417 7.25 18.1584 7.39167L16.075 8.925C16.1334 9.275 16.1667 9.63333 16.1667 10Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 19H2C1.46957 19 0.960859 18.7893 0.585786 18.4142C0.210714 18.0391 0 17.5304 0 17V3C0 2.46957 0.210714 1.96086 0.585786 1.58579C0.960859 1.21071 1.46957 1 2 1H6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M11 15L16 10L11 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 10H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface SidebarProps {
  activeItem?: string;
}

export function Sidebar({ activeItem = 'dashboard' }: SidebarProps) {
  const router = useRouter();

  return (
    <aside className="flex h-full w-[280px] flex-shrink-0 flex-col border-r border-[#F0F1F3] bg-white">
      {/* Logo */}
      <div className="px-6 pt-6">
        <div className="flex items-end gap-2">
          {/* Green leaf/solar icon */}
          <div className="flex h-[35px] w-[35px] items-center justify-center rounded-md bg-[#E8F4FE]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#1570EF" />
              <path d="M2 17L12 22L22 17" stroke="#1570EF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12L12 17L22 12" stroke="#1570EF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-xl font-semibold text-[#1570EF]">GREEN ESTOQUE</span>
        </div>
      </div>

      {/* Main nav */}
      <nav className="mt-10 flex-1 px-4">
        <div className="flex flex-col gap-3">
          <SidebarNavItem
            icon={<HomeIcon />}
            label="Dashboard"
            active={activeItem === 'dashboard'}
            onClick={() => router.push(ROUTES.DASHBOARD)}
          />
          <SidebarNavItem
            icon={<BoxIcon />}
            label="Produtos"
            active={activeItem === 'produtos'}
            onClick={() => router.push(ROUTES.PRODUCTS)}
          />
          <SidebarNavItem
            icon={<TruckIcon />}
            label="Movimentações"
            active={activeItem === 'movimentacoes'}
          />
        </div>
      </nav>

      {/* Bottom nav */}
      <div className="px-4 pb-6">
        <div className="flex flex-col gap-3">
          <SidebarNavItem
            icon={<SettingsIcon />}
            label="Configurações"
            active={activeItem === 'configuracoes'}
          />
          <SidebarNavItem
            icon={<LogoutIcon />}
            label="Sair"
          />
        </div>
      </div>
    </aside>
  );
}
