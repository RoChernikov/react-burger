import styles from './forgot-password.module.css';
import React, { FC, useState } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../../components/form/form';
import Submit from '../../components/form/components/submit/submit';
import InputWrapper from '../../components/form/components/input-wrapper/input-wrapper';
import FormHint from '../../components/form/components/form-hint/form-hint';
//--------------------------------------------------------------------------------

const handleSubmit = () => {
  console.log('Submit');
};

const ForgotPassPage: FC = () => {
  const [email, setEmail] = useState('');

  return (
    <main className={styles.main}>
      <Form onSubmit={handleSubmit} title="Восстановление пароля">
        <InputWrapper>
          <Input
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="text"
            placeholder="Укажите e-mail"
            error={false}
            errorText="Ошибка"
          />
        </InputWrapper>
        <Submit>Восстановить</Submit>
        <FormHint link="/login" caption="Войти">
          Вспомнили пароль?
        </FormHint>
      </Form>
    </main>
  );
};

export default ForgotPassPage;
