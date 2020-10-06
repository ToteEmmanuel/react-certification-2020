import React from 'react';
import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import AuthProvider, { useAuth } from './Auth.provider';

describe('UseAuth tests', () => {
  it('Login tests - loggedUser', () => {
    const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.authenticated).toBe(false);
    cleanup();
  });
  it('Login tests - log user', async () => {
    const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), { wrapper });
    act(() => result.current.login('Jorge', 'wize'));
    await waitForNextUpdate(500);
    expect(result.current.authenticated).toBe(true);
    cleanup();
  });
  it('Login tests - fail log user', async () => {
    const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), { wrapper });
    act(() => result.current.login('xxxx', 'xxxx'));
    await waitForNextUpdate(500);
    expect(result.current.authenticated).toBe(false);
    cleanup();
  });
  it('Login tests - logout user', async () => {
    const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), { wrapper });
    act(() => result.current.login('Jorge', 'wize'));
    await waitForNextUpdate(500);
    expect(result.current.authenticated).toBe(true);
    act(() => result.current.logout());
    expect(result.current.authenticated).toBe(false);
    cleanup();
  });
});

describe('UseAuth tests', () => {
  it('Login tests - loggedUser', async () => {
    const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), { wrapper });
    act(() => result.current.login('Jorge', 'wize'));
    await waitForNextUpdate(500);
    expect(result.current.authenticated).toBe(true);
    expect(result.current.loggedUser.favorites.length).toBe(2);
    cleanup();
  });
  it('Login tests - loggedUser', async () => {
    const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), { wrapper });
    act(() => result.current.login('Jorge', 'wize'));
    await waitForNextUpdate(500);
    expect(result.current.authenticated).toBe(true);
    expect(result.current.loggedUser.favorites.length).toBe(2);
    act(() => result.current.addFavorite('VideoId', result.current.loggedUser));
    expect(result.current.loggedUser.favorites.length).toBe(3);
    cleanup();
  });
});
