import React from 'react';
import styles from './LoginForm.module.css';
import Image from 'next/image';

export function LoginForm() {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="email">E-mail</label>
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
          <label className={styles.label} htmlFor="password">Senha</label>
          <div className={styles.inputWrapper}>
            <input 
              className={styles.input} 
              type="password" 
              id="password" 
              placeholder="••••••••" 
            />
          </div>
        </div>
      </form>

      <div className={styles.forgotPasswordRow}>
        <a href="#" className={styles.forgotPasswordLink}>Esqueceu a senha?</a>
      </div>

      <div className={styles.actions}>
        <button className={styles.submitButton} type="button">
          Entrar
        </button>
        <button className={styles.socialButton} type="button">
          <Image 
            src="/images/google-icon.svg" 
            alt="Google logo" 
            width={24} 
            height={24} 
            className={styles.socialIcon}
          />
          <span className={styles.socialText}>Continuar com o Google</span>
        </button>
      </div>

      <div className={styles.footerRow}>
        <span className={styles.footerText}>Não tem uma conta?</span>
        <a href="#" className={styles.registerLink}>Cadastre-se</a>
      </div>
    </div>
  );
}
