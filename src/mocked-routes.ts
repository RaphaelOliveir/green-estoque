/**
 * MOCKED ROUTES
 *
 * Este arquivo centraliza todo o roteamento entre telas enquanto a API real
 * ainda não está disponível. Não há validação de dados — apenas redirecionamentos.
 *
 * Quando a API estiver pronta, substitua o uso de `MOCK_ROUTES` pelos hooks/actions reais
 * e remova este arquivo.
 */

// ---------------------------------------------------------------------------
// Definição das rotas disponíveis na aplicação
// ---------------------------------------------------------------------------

export const ROUTES = {
  /** Página inicial (Login) */
  LOGIN: '/',

  /** Página de cadastro */
  REGISTER: '/register',

  /** Dashboard principal (pós-login) */
  DASHBOARD: '/dashboard',
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];

// ---------------------------------------------------------------------------
// Mapa de redirecionamentos mockados
// Descreve: de qual rota → para qual rota o usuário é enviado após uma ação
// ---------------------------------------------------------------------------

export const MOCK_REDIRECTS = {
  /**
   * Login bem-sucedido (sem validação) → Dashboard
   */
  onLoginSuccess: ROUTES.DASHBOARD,

  /**
   * Cadastro bem-sucedido (sem validação) → Login
   */
  onRegisterSuccess: ROUTES.LOGIN,

  /**
   * Logout → Login
   */
  onLogout: ROUTES.LOGIN,

  /**
   * Usuário não autenticado tenta acessar rota protegida → Login
   */
  onUnauthorized: ROUTES.LOGIN,
} as const;
