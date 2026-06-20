import { MovementsPage } from '@/features/movements';
import { AuthGuard } from '@/shared/components/AuthGuard/AuthGuard';

export default function MovimentacoesRoute() {
  return (
    <AuthGuard>
      <MovementsPage />
    </AuthGuard>
  );
}
