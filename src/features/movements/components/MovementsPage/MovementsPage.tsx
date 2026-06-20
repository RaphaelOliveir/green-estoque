'use client';

import { Sidebar } from '@/features/dashboard/components/Sidebar/Sidebar';
import { TopBar } from '@/features/dashboard/components/TopBar/TopBar';
import { MovementsTable } from '../MovementsTable/MovementsTable';
import { useGetInventoryUnitsQuery } from '@/shared/api/apiSlice';

export function MovementsPage() {
  const { data: movementsData, isLoading, isError } = useGetInventoryUnitsQuery({ page: 1, limit: 100 });
  const movements = movementsData?.data || movementsData || [];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F0F1F3]">
      <Sidebar activeItem="movimentacoes" />

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar />

        <main className="flex-1 overflow-y-auto px-8 py-6">
          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <span className="text-[#858D9D]">Carregando movimentações...</span>
            </div>
          ) : isError ? (
            <div className="flex h-64 items-center justify-center">
              <span className="text-[#F04438]">Erro ao carregar movimentações</span>
            </div>
          ) : (
            <MovementsTable movements={movements} />
          )}
        </main>
      </div>
    </div>
  );
}

