import { cn } from '../utils';

describe('cn (class name utility)', () => {
  it('should merge simple class strings', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('should ignore falsy values', () => {
    expect(cn('foo', false && 'bar', undefined, null, '')).toBe('foo');
  });

  it('should support conditional object syntax', () => {
    expect(cn({ active: true, disabled: false })).toBe('active');
  });

  it('should merge conflicting Tailwind classes (last wins)', () => {
    // tailwind-merge should deduplicate padding utilities
    const result = cn('p-2', 'p-4');
    expect(result).toBe('p-4');
  });

  it('should merge conflicting text-color classes', () => {
    const result = cn('text-red-500', 'text-blue-500');
    expect(result).toBe('text-blue-500');
  });

  it('should handle an empty call', () => {
    expect(cn()).toBe('');
  });

  it('should handle a single class', () => {
    expect(cn('flex')).toBe('flex');
  });
});
