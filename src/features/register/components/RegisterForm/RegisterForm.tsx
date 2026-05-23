import React from 'react';
import styles from './RegisterForm.module.css';
import Link from 'next/link';

export function RegisterForm() {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="name">Nome*</label>
          <div className={styles.inputWrapper}>
            <input 
              className={styles.input} 
              type="text" 
              id="name" 
              placeholder="Digite seu nome" 
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="email">E-mail*</label>
          <div className={styles.inputWrapper}>
            <input 
              className={styles.input} 
              type="email" 
              id="email" 
              placeholder="Digite seu e-mail" 
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="password">Senha*</label>
          <div className={styles.inputWrapper}>
            <input 
              className={styles.input} 
              type="password" 
              id="password" 
              placeholder="Digite sua senha" 
            />
          </div>
          <span className={styles.hintText}>Deve ter no minímo 8 caracteres</span>
        </div>
      </form>

      <div className={styles.actions}>
        <button className={styles.submitButton} type="button">
          Cadastrar
        </button>
      </div>

      <div className={styles.footerRow}>
        <span className={styles.footerText}>Já tem uma conta?</span>
        <Link href="/" className={styles.loginLink}>Fazer login</Link>
      </div>
    </div>
  );
}
