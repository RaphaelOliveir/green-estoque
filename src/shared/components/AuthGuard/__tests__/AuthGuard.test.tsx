import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthGuard } from '../AuthGuard';

// useRouter is already mocked globally in setup.ts
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe('AuthGuard', () => {
  it('shows a redirecting message when no token is in localStorage', () => {
    // localStorage is cleared in beforeEach via setup.ts
    render(<AuthGuard><div>Protected Content</div></AuthGuard>);
    expect(screen.getByText('Redirecionando...')).toBeInTheDocument();
  });

  it('redirects to "/" when no token is present', () => {
    render(<AuthGuard><div>Protected Content</div></AuthGuard>);
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('renders children when a valid token exists in localStorage', async () => {
    localStorage.setItem('token', 'valid-token');
    render(<AuthGuard><div>Protected Content</div></AuthGuard>);
    // After the effect runs the component re-renders and shows children
    expect(await screen.findByText('Protected Content')).toBeInTheDocument();
  });

  it('does NOT redirect when a token is present', async () => {
    localStorage.setItem('token', 'valid-token');
    render(<AuthGuard><div>Protected Content</div></AuthGuard>);
    await screen.findByText('Protected Content');
    expect(mockPush).not.toHaveBeenCalled();
  });
});
