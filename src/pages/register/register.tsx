import styles from './register.module.css';
import React, { FC, useCallback, useState } from 'react';
import { Redirect } from 'react-router-dom';
import {
  checkValidate,
  nameSchema,
  emailSchema,
  passSchema
} from '../../validations/user-validation';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../../components/form/form';
import Submit from '../../components/submit/submit';
import InputWrapper from '../../components/form/components/input-wrapper/input-wrapper';
import FormHint from '../../components/form/components/form-hint/form-hint';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { register } from '../../services/slices/user';
//--------------------------------------------------------------------------------

const RegisterPage: FC = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [nameErr, setNameErr] = useState(false);
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState(false);
  const [password, setPassword] = useState('');
  const [passErr, setPassErr] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const disable =
    nameErr ||
    emailErr ||
    passErr ||
    name === '' ||
    email === '' ||
    password === '';
  const { isAuth } = useAppSelector(state => state.user);
  //-------------------------------------------------------------------------------

  const handleSubmit = useCallback(
    (evt: React.SyntheticEvent) => {
      evt.preventDefault();
      dispatch(register({ name, email, password }));
    },
    [dispatch, name, email, password]
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
      <Form onSubmit={handleSubmit} title="Регистрация">
        <InputWrapper>
          <Input
            name="name"
            value={name}
            onChange={e => {
              setName(e.target.value);
              checkValidate(nameSchema, setNameErr, e.target.value);
            }}
            type="text"
            placeholder="Имя"
            error={nameErr}
            errorText={
              name === '' ? 'Заполните поле' : 'Некорректный формат имени'
            }
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            name="email"
            value={email}
            type="text"
            placeholder="E-mail"
            error={emailErr}
            errorText={
              email === '' ? 'Заполните поле' : 'Некорректный формат e-mail'
            }
            onChange={e => {
              setEmail(e.target.value);
              checkValidate(emailSchema, setEmailErr, e.target.value);
            }}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            type={showPass ? 'text' : 'password'}
            placeholder="Пароль"
            value={password}
            error={passErr}
            errorText={
              password === '' ? 'Заполните поле' : 'Некорректный пароль'
            }
            name={'password'}
            size="default"
            icon="ShowIcon"
            onIconClick={() => setShowPass(!showPass)}
            onChange={e => {
              setPassword(e.target.value);
              checkValidate(passSchema, setPassErr, e.target.value);
            }}
          />
        </InputWrapper>
        <Submit disabled={disable} wrapStyles={{ marginBottom: '80px' }}>
          Зарегистрироваться
        </Submit>
        <FormHint link="/login" caption="Войти">
          Уже зарегистрированы?
        </FormHint>
      </Form>
    </main>
  );
};

export default RegisterPage;
