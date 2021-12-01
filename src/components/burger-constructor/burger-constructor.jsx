import React from 'react';
import styles from './burger-constructor.module.css';

function BurgerConstructor() {
  return (
    <section className={`mt-10 mr-5 ${styles.constructor}`}>
      <p className={`text text_type_main-large`}>Burger constructor</p>
    </section>
  );
}

export default BurgerConstructor;
