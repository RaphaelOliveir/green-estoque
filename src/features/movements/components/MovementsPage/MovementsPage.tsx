'use client';

import { useState } from 'react';
import { Sidebar } from '@/features/dashboard/components/Sidebar/Sidebar';
import { TopBar } from '@/features/dashboard/components/TopBar/TopBar';
import { MovementsStatsBanner } from '../MovementsStatsBanner/MovementsStatsBanner';
import { MovementsTable } from '../MovementsTable/MovementsTable';
import { RegisterMovementModal } from '../RegisterMovementModal/RegisterMovementModal';
import type { RegisterMovementFormData } from '../RegisterMovementForm/RegisterMovementForm';
import { movementStats, mockMovements } from '../../utils/mockData';

export function MovementsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddMovement = (data: RegisterMovementFormData) => {
    // TODO: integrate with real API
    console.log('[mock] Novo pedido cadastrado:', data);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F0F1F3]">
      {/* Sidebar — active item: movimentacoes */}
      <Sidebar activeItem="movimentacoes" />

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <TopBar />

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto px-8 py-6">
          {/* Inventory stats banner */}
          <div className="mb-5">
            <MovementsStatsBanner stats={movementStats} />
          </div>

          {/* Movements table */}
          <MovementsTable
            movements={mockMovements}
            onAddPedido={() => setIsModalOpen(true)}
          />
        </main>
      </div>

      {/* Modal */}
      <RegisterMovementModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddMovement}
      />
    </div>
  );
}
