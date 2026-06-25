import React from 'react';
import '@testing-library/jest-dom';

// ─── next/navigation ────────────────────────────────────────────────────────
const mockPush = jest.fn();
const mockReplace = jest.fn();
const mockBack = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
    back: mockBack,
    prefetch: jest.fn(),
    pathname: '/',
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// ─── next/image ─────────────────────────────────────────────────────────────
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    priority,
    ...props
  }: {
    src: string;
    alt: string;
    priority?: boolean;
    [key: string]: unknown;
  }) =>
    // Strip Next.js-specific props that aren't valid DOM attributes
    React.createElement('img', { src, alt, ...props }),
}));

// ─── next/link ───────────────────────────────────────────────────────────────
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) =>
    React.createElement('a', { href }, children),
}));

// ─── Polyfill fetch for RTK Query in jsdom ───────────────────────────────────
if (!global.fetch) {
  global.fetch = jest.fn() as typeof global.fetch;
}

// Reset all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
});
