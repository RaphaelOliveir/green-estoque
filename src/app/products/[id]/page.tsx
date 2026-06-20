import { ProductDetailsPage } from '../../../features/products/components/ProductDetailsPage/ProductDetailsPage';
import { AuthGuard } from '@/shared/components/AuthGuard/AuthGuard';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return (
    <AuthGuard>
      <ProductDetailsPage productId={resolvedParams.id} />
    </AuthGuard>
  );
}
