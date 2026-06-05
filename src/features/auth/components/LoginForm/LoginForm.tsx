'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MOCK_REDIRECTS } from '@/mocked-routes';

export function LoginForm() {
  const router = useRouter();

  const handleLogin = () => {
    router.push(MOCK_REDIRECTS.onLoginSuccess);
  };

  return (
    <div className="flex w-[360px] flex-col gap-6">
      <form className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium leading-5 text-text-secondary" htmlFor="email">E-mail</label>
          <div className="flex h-11 w-full items-center rounded-lg border border-border bg-white px-3.5 py-2.5 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-colors focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
            <input 
              className="w-full bg-transparent text-base leading-6 text-text-main outline-none placeholder:text-text-muted" 
              type="email" 
              id="email" 
              placeholder="Digite seu e-mail" 
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
            />
          </div>
        </div>
      </form>

      <div className="flex w-full">
        <Link href="#" className="text-sm font-medium leading-5 text-primary transition-colors hover:text-primary-hover">Esqueceu a senha?</Link>
      </div>

      <div className="flex flex-col gap-4">
        <button
          className="flex h-11 w-full cursor-pointer items-center justify-center rounded border border-primary bg-primary text-base font-medium leading-6 text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-all hover:bg-primary-hover active:translate-y-[1px]"
          type="button"
          onClick={handleLogin}
        >
          Entrar
        </button>
        <button
          className="flex h-11 w-full cursor-pointer items-center justify-center gap-3 rounded border border-border bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-all hover:bg-gray-50 active:translate-y-[1px]"
          type="button"
          onClick={handleLogin}
        >
          <Image
            src="/images/google-icon.svg"
            alt="Google logo"
            width={24}
            height={24}
            className="block"
          />
          <span className="text-base font-medium leading-6 text-[#383E49]">Continuar com o Google</span>
        </button>
      </div>

      <div className="flex w-full items-center justify-center gap-1">
        <span className="text-sm leading-5 text-text-muted">Não tem uma conta?</span>
        <Link href="/register" className="text-sm font-medium leading-5 text-primary transition-colors hover:text-primary-hover">Cadastre-se</Link>
      </div>
    </div>
  );
}
