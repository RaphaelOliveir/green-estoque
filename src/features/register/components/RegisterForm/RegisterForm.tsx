import React from 'react';
import Link from 'next/link';

export function RegisterForm() {
  return (
    <div className="flex w-[360px] flex-col gap-6">
      <form className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium leading-5 text-text-secondary" htmlFor="name">Nome*</label>
          <div className="flex h-11 w-full items-center rounded-lg border border-border bg-white px-3.5 py-2.5 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-colors focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
            <input 
              className="w-full bg-transparent text-base leading-6 text-text-main outline-none placeholder:text-text-muted" 
              type="text" 
              id="name" 
              placeholder="Digite seu nome" 
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium leading-5 text-text-secondary" htmlFor="email">E-mail*</label>
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
          <label className="text-sm font-medium leading-5 text-text-secondary" htmlFor="password">Senha*</label>
          <div className="flex h-11 w-full items-center rounded-lg border border-border bg-white px-3.5 py-2.5 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-colors focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
            <input 
              className="w-full bg-transparent text-base leading-6 text-text-main outline-none placeholder:text-text-muted" 
              type="password" 
              id="password" 
              placeholder="Digite sua senha" 
            />
          </div>
          <span className="mt-0.5 text-sm leading-5 text-text-muted">Deve ter no minímo 8 caracteres</span>
        </div>
      </form>

      <div className="flex flex-col">
        <button className="flex h-11 w-full cursor-pointer items-center justify-center rounded-lg border border-primary bg-primary text-base font-medium leading-6 text-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-all hover:bg-primary-hover active:translate-y-[1px]" type="button">
          Cadastrar
        </button>
      </div>

      <div className="flex w-full items-center justify-center gap-1">
        <span className="text-sm leading-5 text-text-muted">Já tem uma conta?</span>
        <Link href="/" className="text-sm font-medium leading-5 text-[#0F50AA] transition-colors hover:text-[#0b3d82]">Fazer login</Link>
      </div>
    </div>
  );
}
