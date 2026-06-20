import { ProductsPage } from '@/features/products';
import { AuthGuard } from '@/shared/components/AuthGuard/AuthGuard';

export default function ProdutosRoute() {
  return (
    <AuthGuard>
      <ProductsPage />
    </AuthGuard>
  );
}
