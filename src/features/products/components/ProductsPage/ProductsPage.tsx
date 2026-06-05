'use client';

import { useState } from 'react';
import { Sidebar } from '@/features/dashboard/components/Sidebar/Sidebar';
import { TopBar } from '@/features/dashboard/components/TopBar/TopBar';
import { InventoryStatsBanner } from '../InventoryStatsBanner/InventoryStatsBanner';
import { ProductsTable } from '../ProductsTable/ProductsTable';
import { RegisterProductModal } from '../RegisterProductModal/RegisterProductModal';
import type { RegisterProductFormData } from '../RegisterProductForm/RegisterProductForm';
import { inventoryStats, mockProducts } from '../../utils/mockData';

export function ProductsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddProduct = (data: RegisterProductFormData) => {
    // TODO: integrate with real API
    console.log('[mock] Novo produto cadastrado:', data);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F0F1F3]">
      {/* Sidebar — active item: produtos */}
      <Sidebar activeItem="produtos" />

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <TopBar />

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto px-8 py-6">
          {/* Inventory stats banner */}
          <div className="mb-5">
            <InventoryStatsBanner stats={inventoryStats} />
          </div>

          {/* Products table — pass opener to the button inside */}
          <ProductsTable
            products={mockProducts}
            onAddProduct={() => setIsModalOpen(true)}
          />
        </main>
      </div>

      {/* Register product modal (portal-like via fixed positioning) */}
      <RegisterProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddProduct}
      />
    </div>
  );
}
