'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/features/dashboard/components/Sidebar/Sidebar';
import { TopBar } from '@/features/dashboard/components/TopBar/TopBar';
import { 
  useGetInventoryUnitByIdQuery, 
  useUpdateInventoryUnitStatusMutation,
  useDeleteProductMutation 
} from '@/shared/api/apiSlice';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import type { MovementStatus } from '../../types/movements.types';

interface MovementDetailsPageProps {
  movementId: string;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(value);
}

function formatDate(date: string) {
  if (!date) return '—';
  try {
    const dateStr = date.split('T')[0];
    const parts = dateStr.split('-');
    if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
    
    const d = new Date(date);
    if (isNaN(d.getTime())) return date;
    return new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(d);
  } catch {
    return date;
  }
}

export function MovementDetailsPage({ movementId }: MovementDetailsPageProps) {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const isEngineering = user?.role === 'ENGINEERING';
  
  const { data: movement, isLoading, isError } = useGetInventoryUnitByIdQuery(movementId);
  const [updateStatusMutation] = useUpdateInventoryUnitStatusMutation();
  const [deleteProductMutation, { isLoading: isDeleting }] = useDeleteProductMutation();
  
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState<MovementStatus>('IN_STOCK');

  useEffect(() => {
    const sync = async () => {
      if (movement) {
        setStatus(movement.status === 'EM_ESTOQUE' ? 'IN_STOCK' : movement.status === 'INSTALADO' ? 'INSTALLED' : movement.status || 'IN_STOCK');
      }
    };
    sync();
  }, [movement]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full overflow-hidden bg-[#F0F1F3]">
        <Sidebar activeItem="movimentacoes" />
        <div className="flex flex-1 flex-col overflow-hidden">
          <TopBar />
          <main className="flex flex-1 items-center justify-center p-8">
            <span className="text-[#858D9D]">Carregando movimentação...</span>
          </main>
        </div>
      </div>
    );
  }

  // Fallback se não encontrar
  if (isError || !movement) {
    return (
      <div className="flex h-screen w-full overflow-hidden bg-[#F0F1F3]">
        <Sidebar activeItem="movimentacoes" />
        <div className="flex flex-1 flex-col overflow-hidden">
          <TopBar />
          <main className="flex flex-1 items-center justify-center p-8">
            <div className="text-center">
              <h2 className="mb-2 text-xl font-semibold text-[#383E49]">Movimentação não encontrada</h2>
              <button
                onClick={() => router.push('/movements')}
                className="text-[#1366D9] hover:underline"
              >
                Voltar para lista de movimentações
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const handleSaveStatus = async () => {
    try {
      await updateStatusMutation({
        id: movement.id,
        data: {
          status: status === 'IN_STOCK' ? 'EM_ESTOQUE' : 'INSTALADO',
        }
      }).unwrap();
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update movement status', err);
      alert('Erro ao atualizar status');
    }
  };

  const handleDeleteProduct = async () => {
    const confirm = window.confirm('Tem certeza que deseja excluir este produto e todas as suas movimentações associadas? Esta ação é irreversível.');
    if (!confirm) return;

    try {
      await deleteProductMutation(movement.productId).unwrap();
      router.push('/movements');
    } catch (err) {
      console.error('Failed to delete product', err);
      alert((err as { data?: { message?: string } })?.data?.message || 'Erro ao excluir o produto. Verifique se ele não possui unidades instaladas.');
    }
  };

  const displayNome = movement.name || movement.produto;
  const displayTipo = movement.type === 'SOLAR_PANEL' ? 'Painel Solar' : movement.type === 'INVERTER' ? 'Inversor' : movement.type === 'STRUCTURE' ? 'Estrutura' : movement.tipo;
  const displayValor = movement.cost ?? movement.valor;
  const displayComprador = movement.customer || movement.comprador;
  const displayDataEntrada = movement.entryStockDate || movement.dataEntrada;
  const displayFornecedor = movement.vendor || movement.fornecedor;
  const displayDescricao = movement.description || movement.descricao;
  const displayImagem = movement.image || movement.imagem;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#F0F1F3]">
      <Sidebar activeItem="movimentacoes" />

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar />

        <main className="flex-1 overflow-y-auto px-8 py-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push('/movements')}
                className="flex h-8 w-8 items-center justify-center rounded-full text-[#858D9D] hover:bg-white hover:text-[#383E49] hover:shadow-sm transition-all"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <h1 className="text-xl font-medium text-[#383E49]">Detalhes da Movimentação</h1>
            </div>
            
            <div className="flex gap-3">

              {isEditing ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setStatus(movement.status === 'EM_ESTOQUE' ? 'IN_STOCK' : movement.status === 'INSTALADO' ? 'INSTALLED' : movement.status);
                    }}
                    className="flex h-10 items-center justify-center rounded border border-[#F0F1F3] bg-white px-5 text-sm font-medium text-[#858D9D] transition-all hover:bg-gray-50 active:translate-y-px"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSaveStatus}
                    className="flex h-10 items-center justify-center rounded bg-[#1366D9] px-5 text-sm font-medium text-white transition-all hover:bg-[#1157B5] active:translate-y-px"
                  >
                    Salvar
                  </button>
                </div>
              ) : isEngineering && (
                <div className="flex gap-2">
                  <button
                    onClick={handleDeleteProduct}
                    disabled={isDeleting}
                    className="flex h-10 items-center gap-2 rounded-lg border border-[#FCA5A5] bg-white px-4 text-sm font-medium text-[#EF4444] shadow-sm transition-all hover:bg-[#FEF2F2] active:translate-y-px disabled:opacity-50"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.5 4H13.5M5 4V2.5C5 2.10218 5.15804 1.72064 5.43934 1.43934C5.72064 1.15804 6.10218 1 6.5 1H9.5C9.89782 1 10.2794 1.15804 10.5607 1.43934C10.842 1.72064 11 2.10218 11 2.5V4M12.5 4V13.5C12.5 13.8978 12.342 14.2794 12.0607 14.5607C11.7794 14.842 11.3978 15 11 15H5C4.60218 15 4.22064 14.842 3.93934 14.5607C3.65804 14.2794 3.5 13.8978 3.5 13.5V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {isDeleting ? 'Excluindo...' : 'Excluir Produto'}
                  </button>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex h-10 items-center gap-2 rounded-lg border border-[#D0D3D9] bg-white px-4 text-sm font-medium text-[#5D6679] shadow-sm transition-all hover:bg-gray-50 active:translate-y-px"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.3333 2.00004C11.5084 1.82494 11.7163 1.68605 11.9451 1.59129C12.1739 1.49653 12.4191 1.44775 12.6667 1.44775C12.9143 1.44775 13.1594 1.49653 13.3882 1.59129C13.617 1.68605 13.8249 1.82494 14 2.00004C14.1751 2.17513 14.314 2.383 14.4088 2.61184C14.5035 2.84067 14.5523 3.08581 14.5523 3.33337C14.5523 3.58093 14.5035 3.82607 14.4088 4.0549C14.314 4.28374 14.1751 4.49161 14 4.66671L4.33333 14.3334L1.33333 15L2 12L11.3333 2.00004Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Alterar Status
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-[1fr_300px] gap-6">
            {/* Main Info */}
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-lg font-semibold text-[#383E49]">Informações da Movimentação</h2>
              
              <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                <div>
                  <p className="mb-1 text-sm text-[#858D9D]">Nome do Produto</p>
                  <p className="text-base font-medium text-[#48505E]">{displayNome}</p>
                </div>
                
                <div>
                  <p className="mb-1 text-sm text-[#858D9D]">Tipo</p>
                  <p className="text-base font-medium text-[#48505E]">{displayTipo}</p>
                </div>
                
                <div>
                  <p className="mb-1 text-sm text-[#858D9D]">Valor</p>
                  <p className="text-base font-medium text-[#48505E]">{formatCurrency(displayValor)}</p>
                </div>
                
                <div>
                  <p className="mb-1 text-sm text-[#858D9D]">Comprador</p>
                  <p className="text-base font-medium text-[#48505E]">{displayComprador || '—'}</p>
                </div>

                <div>
                  <p className="mb-1 text-sm text-[#858D9D]">Data de Entrada</p>
                  <p className="text-base font-medium text-[#48505E]">{formatDate(displayDataEntrada)}</p>
                </div>

                <div>
                  <p className="mb-1 text-sm text-[#858D9D]">Fornecedor</p>
                  <p className="text-base font-medium text-[#48505E]">{displayFornecedor}</p>
                </div>

                {displayDescricao && (
                  <div className="col-span-2">
                    <p className="mb-1 text-sm text-[#858D9D]">Descrição</p>
                    <p className="text-base text-[#48505E] leading-relaxed">{displayDescricao}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Side Info */}
            <div className="flex flex-col gap-6">
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-base font-semibold text-[#383E49]">Imagem do Produto</h2>
                {displayImagem ? (
                  <div className="aspect-square w-full rounded-lg bg-gray-100 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={displayImagem} alt={displayNome} className="h-full w-full object-cover" />
                  </div>
                ) : (
                  <div className="flex aspect-square w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#D0D3D9] bg-[#F9FAFB]">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-2 text-[#858D9D]">
                      <path d="M13.3333 30H26.6667C28.5334 30 30.4001 30 31.8227 28.5774C33.2452 27.1548 33.3333 25.2881 33.3333 23.4214V16.5786C33.3333 14.712 33.2452 12.8453 31.8227 11.4227C30.4001 10.0001 28.5334 10.0001 26.6667 10.0001H13.3333C11.4667 10.0001 9.60002 10.0001 8.17743 11.4227C6.75485 12.8453 6.66669 14.712 6.66669 16.5786V23.4214C6.66669 25.2881 6.75485 27.1548 8.17743 28.5774C9.60002 30 11.4667 30 13.3333 30Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12.5 17.5C13.8807 17.5 15 16.3807 15 15C15 13.6193 13.8807 12.5 12.5 12.5C11.1193 12.5 10 13.6193 10 15C10 16.3807 11.1193 17.5 12.5 17.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M33.3333 22.5L25 14.1667L10 29.1667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-sm font-medium text-[#858D9D]">Sem imagem</span>
                  </div>
                )}
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-base font-semibold text-[#383E49]">Status</h2>
                {isEditing ? (
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as MovementStatus)}
                    className="h-11 w-full rounded-lg border border-[#D0D5DD] bg-white px-3.5 text-base text-[#48505E] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] outline-none transition-colors focus:border-[#1366D9] focus:ring-2 focus:ring-[#1366D9]/10"
                  >
                    <option value="IN_STOCK">Em Estoque</option>
                    <option value="INSTALLED">Instalado</option>
                  </select>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${status === 'IN_STOCK' ? 'bg-[#22C55E]' : 'bg-[#3B82F6]'}`} />
                    <span className="text-base font-medium text-[#48505E]">
                      {status === 'IN_STOCK' ? 'Em Estoque' : 'Instalado'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

