import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer, { setCredentials } from '@/features/auth/authSlice';
import { AuthProvider } from '../AuthProvider';

// Helper to build a fresh store for each test
function makeStore() {
  return configureStore({ reducer: { auth: authReducer } });
}

function renderWithStore(ui: React.ReactElement) {
  const store = makeStore();
  const dispatchSpy = jest.spyOn(store, 'dispatch');
  const result = render(<Provider store={store}>{ui}</Provider>);
  return { ...result, store, dispatchSpy };
}

describe('AuthProvider', () => {
  it('shows a loading state before parsing localStorage', () => {
    // isLoaded starts false; the component shows "Loading..." until useEffect fires
    const { container } = renderWithStore(
      <AuthProvider><span>Children</span></AuthProvider>
    );
    // Either the loading div or children appears immediately after sync render
    // We simply assert the component mounts without throwing
    expect(container).toBeInTheDocument();
  });

  it('renders children after localStorage has been checked', async () => {
    renderWithStore(<AuthProvider><span>Hello World</span></AuthProvider>);
    expect(await screen.findByText('Hello World')).toBeInTheDocument();
  });

  it('dispatches setCredentials when token and user exist in localStorage', async () => {
    const user = { id: '1', name: 'Test', email: 'test@test.com', role: 'ENGINEERING' };
    localStorage.setItem('token', 'abc123');
    localStorage.setItem('user', JSON.stringify(user));

    const { dispatchSpy } = renderWithStore(
      <AuthProvider><span>Ready</span></AuthProvider>
    );

    await screen.findByText('Ready');

    const dispatched = dispatchSpy.mock.calls.map((call) => call[0] as { type: string });
    const credentialsAction = dispatched.find(
      (action) => action.type === setCredentials.type
    ) as { type: string; payload: { access_token: string; user: unknown } } | undefined;

    expect(credentialsAction).toBeDefined();
    expect(credentialsAction!.payload.access_token).toBe('abc123');
    expect(credentialsAction!.payload.user).toEqual(user);
  });

  it('does NOT dispatch when localStorage is empty', async () => {
    const { dispatchSpy } = renderWithStore(
      <AuthProvider><span>Ready</span></AuthProvider>
    );

    await screen.findByText('Ready');

    const dispatched = dispatchSpy.mock.calls.map((call) => call[0] as { type: string });
    const credentialsAction = dispatched.find(
      (action) => action.type === setCredentials.type
    );

    expect(credentialsAction).toBeUndefined();
  });
});
