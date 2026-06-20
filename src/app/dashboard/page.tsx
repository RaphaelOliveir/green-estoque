import { DashboardPage } from '@/features/dashboard';
import { AuthGuard } from '@/shared/components/AuthGuard/AuthGuard';

export default function Dashboard() {
  return (
    <AuthGuard>
      <DashboardPage />
    </AuthGuard>
  );
}
