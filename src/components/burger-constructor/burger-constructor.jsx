import React from 'react';
import styles from './burger-constructor.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructor() {
  return (
    <section className={`mt-10 mr-5 ${styles.constructor}`}>
      <p className={`text text_type_main-large`}>Burger constructor</p>
    </section>
  );
}

export default BurgerConstructor;
