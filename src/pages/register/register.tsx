import styles from './register.module.css';
import React, { FC, useCallback, useState } from 'react';
import {
  Input,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../../components/form/form';
import Submit from '../../components/form/components/submit/submit';
import InputWrapper from '../../components/form/components/input-wrapper/input-wrapper';
import FormHint from '../../components/form/components/form-hint/form-hint';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { register } from '../../services/slices/user';
//--------------------------------------------------------------------------------

const RegisterPage: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { userRequest } = useAppSelector(state => state.user);

  const handleSubmit = useCallback(
    (evt: React.SyntheticEvent) => {
      evt.preventDefault();
      dispatch(register({ name, email, password }));
      if (!userRequest) {
        history.replace('/');
      }
    },
    [dispatch, name, email, password, history, userRequest]
  );

  return (
    <main className={styles.main}>
      <Form onSubmit={handleSubmit} title="Регистрация">
        <InputWrapper>
          <Input
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
            type="text"
            placeholder="Имя"
            error={false}
            errorText="Ошибка"
          />
        </InputWrapper>
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
        <Submit>Зарегистрироваться</Submit>
        <FormHint link="/login" caption="Войти">
          Уже зарегистрированы?
        </FormHint>
      </Form>
    </main>
  );
};

export default RegisterPage;
