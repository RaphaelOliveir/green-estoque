import type { Disponibilidade } from '../../types/products.types';

interface DisponibilidadeBadgeProps {
  status: Disponibilidade;
}

const statusConfig: Record<
  Disponibilidade,
  { label: string; color: string }
> = {
  'Em estoque': { label: 'Em estoque', color: '#10A760' },
  'Sem estoque': { label: 'Sem estoque', color: '#DA3E33' },
  'Pouco estoque': { label: 'Pouco estoque', color: '#E19133' },
};

export function DisponibilidadeBadge({ status }: DisponibilidadeBadgeProps) {
  const config = statusConfig[status];

  return (
    <span style={{ color: config.color }} className="text-sm font-medium">
      {config.label}
    </span>
  );
}
