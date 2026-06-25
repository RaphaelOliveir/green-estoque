import authReducer, { setCredentials, logout } from '../authSlice';

describe('authSlice', () => {
  const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
  };

  const mockUser = {
    id: '1',
    name: 'João Silva',
    email: 'joao@example.com',
    role: 'ENGINEERING',
  };

  it('should return the initial state when called with undefined', () => {
    expect(authReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  describe('setCredentials', () => {
    it('should set user and token and mark as authenticated', () => {
      const state = authReducer(
        undefined,
        setCredentials({ user: mockUser, access_token: 'my-token' })
      );

      expect(state.user).toEqual(mockUser);
      expect(state.token).toBe('my-token');
      expect(state.isAuthenticated).toBe(true);
    });

    it('should overwrite an existing session with new credentials', () => {
      const oldUser = { id: '0', name: 'Old', email: 'old@e.com', role: 'FINANCE' };
      const existing = authReducer(
        undefined,
        setCredentials({ user: oldUser, access_token: 'old-token' })
      );

      const state = authReducer(
        existing,
        setCredentials({ user: mockUser, access_token: 'new-token' })
      );

      expect(state.user).toEqual(mockUser);
      expect(state.token).toBe('new-token');
    });
  });

  describe('logout', () => {
    it('should clear user, token and set isAuthenticated to false', () => {
      const authenticated = authReducer(
        undefined,
        setCredentials({ user: mockUser, access_token: 'my-token' })
      );

      const state = authReducer(authenticated, logout());

      expect(state.user).toBeNull();
      expect(state.token).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });

    it('should be idempotent — logout on an already-logged-out state', () => {
      const state = authReducer(undefined, logout());
      expect(state).toEqual(initialState);
    });
  });
});
