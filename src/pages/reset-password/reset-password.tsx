import styles from './reset-password.module.css';
import React, { FC, useState } from 'react';
import {
  Input,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../../components/form/form';
import Submit from '../../components/form/components/submit/submit';
import InputWrapper from '../../components/form/components/input-wrapper/input-wrapper';
import FormHint from '../../components/form/components/form-hint/form-hint';
//--------------------------------------------------------------------------------

const ResetPassPage: FC = () => {
  const [password, setPassword] = useState('');
  const [value, setValue] = useState('');

  return (
    <main className={styles.main}>
      <Form title="Восстановление пароля">
        <InputWrapper>
          <PasswordInput
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            name="code"
            value={value}
            onChange={e => setValue(e.target.value)}
            type="text"
            placeholder="Введите код из письма"
            error={false}
            errorText="Ошибка"
          />
        </InputWrapper>
        <Submit>Сохранить</Submit>
        <FormHint link="/login" caption="Войти">
          Вспомнили пароль?
        </FormHint>
      </Form>
    </main>
  );
};

export default ResetPassPage;
