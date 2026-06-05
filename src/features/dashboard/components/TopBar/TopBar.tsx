'use client';

function SearchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="8" stroke="#858D9D" strokeWidth="2" />
      <path d="M21 21L16.65 16.65" stroke="#858D9D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 2C10 2 4 5 4 11V15L2 17V18H18V17L16 15V11C16 5 10 2 10 2Z"
        stroke="#5D6679"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8 18C8 19.1046 8.89543 20 10 20C11.1046 20 12 19.1046 12 18" stroke="#5D6679" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TopBar() {
  return (
    <header className="flex h-[100px] w-full items-center justify-between border-b border-[#EEEEEE] bg-white px-8">
      {/* Search bar */}
      <div className="flex h-11 w-[400px] items-center gap-2 rounded border border-[#F0F1F3] px-4">
        <SearchIcon />
        <span className="text-base text-[#858D9D]">Buscar produto, fornecedor, pedido</span>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-5">
        {/* Notification */}
        <button
          type="button"
          aria-label="Notificações"
          className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-50 transition-colors"
        >
          <BellIcon />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Avatar */}
        <button
          type="button"
          aria-label="Perfil do usuário"
          className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-blue-100 hover:ring-2 hover:ring-blue-300 transition-all"
        >
          <span className="text-base font-semibold text-[#1570EF]">U</span>
        </button>
      </div>
    </header>
  );
}
