import { MovementDetailsPage } from '../../../features/movements/components/MovementDetailsPage/MovementDetailsPage';
import { AuthGuard } from '@/shared/components/AuthGuard/AuthGuard';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return (
    <AuthGuard>
      <MovementDetailsPage movementId={resolvedParams.id} />
    </AuthGuard>
  );
}
