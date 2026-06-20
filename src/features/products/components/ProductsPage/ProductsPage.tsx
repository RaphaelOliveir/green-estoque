'use client';

import { useState } from 'react';
import { Sidebar } from '@/features/dashboard/components/Sidebar/Sidebar';
import { TopBar } from '@/features/dashboard/components/TopBar/TopBar';
import { ProductsTable } from '../ProductsTable/ProductsTable';
import { RegisterProductModal } from '../RegisterProductModal/RegisterProductModal';
import type { RegisterProductFormData } from '../RegisterProductForm/RegisterProductForm';
import { useGetProductsQuery, useCreateProductMutation } from '@/shared/api/apiSlice';

export function ProductsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: productsData, isLoading, isError } = useGetProductsQuery({ page: 1, limit: 100 });
  const [createProduct] = useCreateProductMutation();

  const products = productsData?.data || productsData || [];

  const handleAddProduct = async (data: RegisterProductFormData) => {
    try {
      await createProduct({
        name: data.nome,
        vendor: data.fornecedor,
        customer: data.comprador,
        purchaseDate: new Date(data.dataCompra).toISOString(),
        cost: Number(data.valor),
        type: data.tipo === 'Painel Solar' ? 'SOLAR_PANEL' : data.tipo === 'Inversor' ? 'INVERTER' : 'STRUCTURE',
        description: data.descricao,
        image: data.imagem ? URL.createObjectURL(data.imagem) : undefined, // Note: real file upload would require multipart/form-data
      }).unwrap();
      setIsModalOpen(false);
    } catch (err) {
      console.error('Failed to create product:', err);
      alert('Erro ao criar produto');
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F0F1F3]">
      <Sidebar activeItem="produtos" />

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar />

        <main className="flex-1 overflow-y-auto px-8 py-6">
          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <span className="text-[#858D9D]">Carregando produtos...</span>
            </div>
          ) : isError ? (
            <div className="flex h-64 items-center justify-center">
              <span className="text-[#F04438]">Erro ao carregar produtos</span>
            </div>
          ) : (
            <ProductsTable
              products={products}
              onAddProduct={() => setIsModalOpen(true)}
            />
          )}
        </main>
      </div>

      <RegisterProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddProduct}
      />
    </div>
  );
}
