import { store } from '../store';

describe('Redux Store', () => {
  it('should initialize with the correct slice keys', () => {
    const state = store.getState();
    expect(state).toHaveProperty('auth');
    expect(state).toHaveProperty('api');
  });

  it('should initialize auth slice with default values', () => {
    const { auth } = store.getState();
    expect(auth.user).toBeNull();
    expect(auth.token).toBeNull();
    expect(auth.isAuthenticated).toBe(false);
  });

  it('should have a dispatch function', () => {
    expect(typeof store.dispatch).toBe('function');
  });

  it('should have a getState function', () => {
    expect(typeof store.getState).toBe('function');
  });
});
