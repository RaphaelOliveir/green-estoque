---
trigger: manual
---

# Arquitetura Feature-Based — Next.js

## Estrutura

```
src/
├── app/                        # Apenas rotas e layouts (App Router)
├── features/[feature]/
│   ├── components/             # Componentes da feature
│   ├── hooks/                  # Hooks locais
│   ├── queries/                # TanStack Query
│   ├── store/                  # Zustand (só UI state)
│   ├── types/                  # Tipos e interfaces
│   ├── utils/
│   ├── __tests__/
│   └── index.ts                # Barrel export
└── shared/
    ├── components/ui/
    ├── hooks/
    ├── lib/                    # queryClient, http, cn
    ├── store/                  # Estado cross-feature
    └── types/
```

---

## TypeScript

- **Proibido:** `any`, type assertions (`as`) sem narrowing, `// @ts-ignore`
- **Obrigatório:** `import type`, retorno explícito em funções não-triviais, type guards
- Use `type` para unions, `interface` para objetos extensíveis
- Use `satisfies` para validar literais; `as const` em configs e enums

```ts
// ✅
export type Status = 'active' | 'inactive' | 'archived';
export interface Product { id: string; name: string; status: Status; }
export type CreateProductInput = Omit<Product, 'id'>;

const LABELS = { active: 'Ativo', inactive: 'Inativo' } satisfies Record<Status, string>;
```

---

## TanStack Query

**Query keys — factory pattern:**
```ts
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (f: Filters) => [...productKeys.lists(), f] as const,
  detail: (id: string) => [...productKeys.all, 'detail', id] as const,
};
```

**queryOptions para reutilização:**
```ts
export const productsQueryOptions = (filters: Filters) =>
  queryOptions({
    queryKey: productKeys.list(filters),
    queryFn: () => fetchProducts(filters),
    staleTime: 1000 * 60 * 5,
  });
```

**Mutations com invalidação:**
```ts
export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => qc.invalidateQueries({ queryKey: productKeys.lists() }),
  });
}
```

- Use `useSuspenseQuery` em componentes com Suspense boundary
- **Nunca** armazene dados de servidor no Zustand

---

## Zustand — UI State Only

```ts
// features/[feature]/store/featureStore.ts
interface ProductUIState {
  isModalOpen: boolean;
  selectedId: string | null;
  openModal: () => void;
  closeModal: () => void;
  select: (id: string | null) => void;
}

export const useProductUIStore = create<ProductUIState>()(
  devtools((set) => ({
    isModalOpen: false,
    selectedId: null,
    openModal: () => set({ isModalOpen: true }, false, 'openModal'),
    closeModal: () => set({ isModalOpen: false }, false, 'closeModal'),
    select: (id) => set({ selectedId: id }, false, 'select'),
  }), { name: 'ProductUIStore' }),
);

// Selectors para evitar re-renders
export const useSelectedId = () => useProductUIStore((s) => s.selectedId);
```

---

## Tailwind CSS

```ts
// shared/lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export const cn = (...i: ClassValue[]) => twMerge(clsx(i));

// Variantes com cva
const btn = cva('rounded-md text-sm font-medium transition-colors', {
  variants: {
    variant: { default: 'bg-primary text-white', outline: 'border border-input' },
    size: { sm: 'h-8 px-3', md: 'h-10 px-4' },
  },
  defaultVariants: { variant: 'default', size: 'md' },
});
```

- Sem CSS Modules ou CSS-in-JS
- `prettier-plugin-tailwindcss` ativo (ordenação automática)

---

## Vitest

```ts
// Wrapper compartilhado — shared/test/queryWrapper.tsx
export const createWrapper = () => {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={qc}>{children}</QueryClientProvider>
  );
};

// Padrão AAA
describe('useProducts', () => {
  beforeEach(() => vi.clearAllMocks());

  it('retorna dados com sucesso', async () => {
    vi.mocked(fetchProducts).mockResolvedValue(mockData);           // Arrange
    const { result } = renderHook(() => useProducts({}), { wrapper: createWrapper() }); // Act
    await waitFor(() => expect(result.current.isSuccess).toBe(true)); // Assert
  });
});
```

- Resete o estado do store no `beforeEach`
- Cobertura mínima: happy path + caso de erro

---

## ESLint + Prettier

Regras obrigatórias:
```js
'@typescript-eslint/no-explicit-any': 'error',
'@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
'@typescript-eslint/no-floating-promises': 'error',
'react-hooks/exhaustive-deps': 'warn',
'@tanstack/query/exhaustive-deps': 'error',
'tailwindcss/classnames-order': 'warn',
```

Prettier:
```json
{ "singleQuote": true, "trailingComma": "all", "printWidth": 100, "plugins": ["prettier-plugin-tailwindcss"] }
```

---

## Checklist

- [ ] Feature isolada em `src/features/[name]/` com barrel export
- [ ] Tipos em `feature.types.ts`; sem `any`; `import type` usado
- [ ] Query keys com factory pattern; mutations invalidam corretamente
- [ ] Zustand apenas para UI state; sem dados de servidor
- [ ] Classes condicionais via `cn()`; sem CSS Modules
- [ ] Testes: happy path + erro; mocks e store resetados por teste
- [ ] ESLint e Prettier sem erros