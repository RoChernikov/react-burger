import styles from './login.module.css';
import React, { FC, useState, useCallback } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import {
  Input,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../../components/form/form';
import Submit from '../../components/form/components/submit/submit';
import InputWrapper from '../../components/form/components/input-wrapper/input-wrapper';
import FormHint from '../../components/form/components/form-hint/form-hint';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { signIn } from '../../services/slices/user';
//--------------------------------------------------------------------------------

const LoginPage: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isAuth } = useAppSelector(state => state.user);
  //-------------------------------------------------------------------------------

  const handleSubmit = useCallback(
    (evt: React.SyntheticEvent) => {
      evt.preventDefault();
      dispatch(
        signIn({ email, password }, () => {
          history.replace({ pathname: '/' });
        })
      );
    },
    [dispatch, email, password, history]
  );

  if (isAuth) {
    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    );
  }

  return (
    <main className={styles.main}>
      <Form onSubmit={handleSubmit} title="Вход">
        <InputWrapper>
          <Input
            name="email"
            value={email}
            type="text"
            placeholder="E-mail"
            error={false}
            errorText="Ошибка"
            onChange={e => setEmail(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <PasswordInput
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </InputWrapper>
        <Submit>Войти</Submit>
        <FormHint link="/register" caption="Зарегистрироваться">
          Вы - новый пользователь?
        </FormHint>
        <div className="mt-4">
          <FormHint link="/forgot-password" caption="Восстановить пароль">
            Забыли пароль?
          </FormHint>
        </div>
      </Form>
    </main>
  );
};

export default LoginPage;
