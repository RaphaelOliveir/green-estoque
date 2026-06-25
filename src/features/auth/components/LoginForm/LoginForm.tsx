'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLoginMutation } from '@/shared/api/apiSlice';

import { useDispatch } from 'react-redux';
import { setCredentials } from '@/features/auth/authSlice';

export function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loginMutation, { isLoading }] = useLoginMutation();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await loginMutation({ email, password }).unwrap();
      if (response.access_token && response.user) {
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('user', JSON.stringify(response.user));
        dispatch(setCredentials({ user: response.user, access_token: response.access_token }));
        router.push('/dashboard');
      } else {
        setError('Erro ao efetuar login. Token não recebido.');
      }
    } catch (err) {
      setError((err as { data?: { message?: string } })?.data?.message || 'E-mail ou senha incorretos.');
    }
  };

  return (
    <div className="flex w-[360px] flex-col gap-6">
      <form className="flex flex-col gap-5" onSubmit={handleLogin}>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium leading-5 text-text-secondary" htmlFor="email">E-mail</label>
          <div className="flex h-11 w-full items-center rounded-lg border border-border bg-white px-3.5 py-2.5 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-colors focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
            <input 
              className="w-full bg-transparent text-base leading-6 text-text-main outline-none placeholder:text-text-muted" 
              type="email" 
              id="email" 
              placeholder="Digite seu e-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium leading-5 text-text-secondary" htmlFor="password">Senha</label>
          <div className="flex h-11 w-full items-center rounded-lg border border-border bg-white px-3.5 py-2.5 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-colors focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
            <input 
              className="w-full bg-transparent text-base leading-6 text-text-main outline-none placeholder:text-text-muted" 
              type="password" 
              id="password" 
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>
        
        {error && <span className="text-sm text-red-500">{error}</span>}
        
        <button type="submit" className="hidden" />
      </form>

      <div className="flex w-full">
        <Link href="#" className="text-sm font-medium leading-5 text-primary transition-colors hover:text-primary-hover">Esqueceu a senha?</Link>
      </div>

      <div className="flex flex-col gap-4">
        <button
          id="btn-entrar"
          className="flex h-11 w-full cursor-pointer items-center justify-center rounded border border-primary bg-primary text-base font-medium leading-6 text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-all hover:bg-primary-hover active:translate-y-[1px] disabled:opacity-50"
          type="button"
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? 'Entrando...' : 'Entrar'}
        </button>
      </div>

      <div className="flex w-full items-center justify-center gap-1">
        <span className="text-sm leading-5 text-text-muted">Não tem uma conta?</span>
        <Link href="/register" className="text-sm font-medium leading-5 text-primary transition-colors hover:text-primary-hover">Cadastre-se</Link>
      </div>
    </div>
  );
}

