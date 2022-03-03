import styles from './login.module.css';
import React, { FC, useState, useCallback } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import {
  checkValidate,
  emailSchema,
  passSchema
} from '../../validations/user-validation';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../../components/form/form';
import Submit from '../../components/submit/submit';
import InputWrapper from '../../components/form/components/input-wrapper/input-wrapper';
import FormHint from '../../components/form/components/form-hint/form-hint';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { signIn } from '../../services/slices/user';
import { ILocationParams } from '../../utils/interfaces';
//--------------------------------------------------------------------------------

const LoginPage: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory<ILocationParams>();
  const goBackPath = history.location.state?.from.pathname;
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState(false);
  const [password, setPassword] = useState('');
  const [passErr, setPassErr] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const disable = emailErr || passErr || email === '' || password === '';
  const { isAuth, loginError } = useAppSelector(state => state.user);
  //-------------------------------------------------------------------------------

  const handleSubmit = useCallback(
    (evt: React.SyntheticEvent) => {
      evt.preventDefault();
      dispatch(signIn({ email, password }));
    },
    [dispatch, email, password]
  );

  if (isAuth) {
    return (
      <Redirect
        to={{
          pathname: goBackPath || '/'
        }}
      />
    );
  }

  return (
    <main className={styles.main}>
      <Form onSubmit={handleSubmit} title="Вход">
        {loginError === 'email or password are incorrect' && (
          <p className={`text text_type_main-default ${styles.errorTitle}`}>
            Нeверный e-mail или пароль
          </p>
        )}
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
          Войти
        </Submit>
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
