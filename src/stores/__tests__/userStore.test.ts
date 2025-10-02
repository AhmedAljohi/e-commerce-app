import { renderHook, act } from '@testing-library/react';
import { useUserStore } from '../userStore';

describe('User Store', () => {
  beforeEach(() => {
    // Reset store state before each test
    useUserStore.getState().logout();
  });

  it('should have initial state', () => {
    const { result } = renderHook(() => useUserStore());

    expect(result.current.user).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle login', async () => {
    const { result } = renderHook(() => useUserStore());

    await act(async () => {
      await result.current.login('test@example.com', 'password');
    });

    expect(result.current.user).not.toBeNull();
    expect(result.current.user?.email).toBe('test@example.com');
    expect(result.current.user?.isLoggedIn).toBe(true);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle logout', async () => {
    const { result } = renderHook(() => useUserStore());

    // First login
    await act(async () => {
      await result.current.login('test@example.com', 'password');
    });

    expect(result.current.user).not.toBeNull();

    // Then logout
    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should update user profile', async () => {
    const { result } = renderHook(() => useUserStore());

    await act(async () => {
      await result.current.login('test@example.com', 'password');
    });

    act(() => {
      result.current.updateProfile({ name: 'Updated Name' });
    });

    expect(result.current.user?.name).toBe('Updated Name');
  });

  it('should set loading state', () => {
    const { result } = renderHook(() => useUserStore());

    act(() => {
      result.current.setLoading(true);
    });

    expect(result.current.isLoading).toBe(true);

    act(() => {
      result.current.setLoading(false);
    });

    expect(result.current.isLoading).toBe(false);
  });

  it('should set error state', () => {
    const { result } = renderHook(() => useUserStore());

    act(() => {
      result.current.setError('Test error');
    });

    expect(result.current.error).toBe('Test error');

    act(() => {
      result.current.setError(null);
    });

    expect(result.current.error).toBeNull();
  });
});
