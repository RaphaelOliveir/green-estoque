import React from 'react';
import Image from 'next/image';
import styles from './LoginPage.module.css';
import { LoginForm } from '../LoginForm/LoginForm';

export function LoginPage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.leftSection}>
        <div className={styles.logoContainer}>
          <Image 
            src="/images/logo.png" 
            alt="Green Estoque Logo" 
            width={90} 
            height={90} 
            className={styles.logoImage}
            priority
          />
          <h1 className={styles.logoText}>GREEN ESTOQUE</h1>
        </div>
      </div>
      
      <div className={styles.rightSection}>
        <LoginForm />
      </div>
    </div>
  );
}
