import React from 'react';
import Image from 'next/image';
import { RegisterForm } from '../RegisterForm/RegisterForm';

export function RegisterPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white md:flex-row">
      <div className="flex flex-1 flex-col items-center justify-center p-10 md:p-0">
        <div className="flex flex-col items-center justify-center gap-8 animate-in fade-in duration-700">
          <Image 
            src="/images/logo.png" 
            alt="Green Estoque Logo" 
            width={90} 
            height={90} 
            className="block"
            priority
          />
          <h1 className="m-0 text-center text-[47px] font-semibold leading-[57px] text-[#009ED8]">
            GREEN ESTOQUE
          </h1>
        </div>
      </div>
      
      <div className="flex flex-1 items-start justify-center p-5 md:items-center md:p-0 animate-in slide-in-from-left-5 fade-in duration-500">
        <RegisterForm />
      </div>
    </div>
  );
}
