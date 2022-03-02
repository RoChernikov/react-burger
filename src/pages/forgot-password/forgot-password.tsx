import styles from './forgot-password.module.css';
import React, { FC, useState, useCallback } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { checkValidate, emailSchema } from '../../validations/user-validation';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../../components/form/form';
import Submit from '../../components/submit/submit';
import InputWrapper from '../../components/form/components/input-wrapper/input-wrapper';
import FormHint from '../../components/form/components/form-hint/form-hint';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { forgotPassword } from '../../services/slices/user';
//--------------------------------------------------------------------------------

const ForgotPassPage: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState(false);
  const disable = emailErr || email === '';
  const { isAuth } = useAppSelector(state => state.user);
  //-------------------------------------------------------------------------------

  const handleSubmit = useCallback(
    (evt: React.SyntheticEvent) => {
      evt.preventDefault();
      dispatch(
        forgotPassword(email, () => {
          history.replace({ pathname: '/reset-password' });
        })
      );
    },
    [dispatch, email, history]
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
      <Form onSubmit={handleSubmit} title="Восстановление пароля">
        <InputWrapper>
          <Input
            name="email"
            value={email}
            type="text"
            placeholder="E-mail"
            error={emailErr || email === ''}
            errorText={
              email === '' ? 'Заполните поле' : 'Некорректный формат e-mail'
            }
            onChange={e => {
              setEmail(e.target.value);
              checkValidate(emailSchema, setEmailErr, e.target.value);
            }}
          />
        </InputWrapper>
        <Submit disabled={disable} wrapStyles={{ marginBottom: '80px' }}>
          Восстановить
        </Submit>
        <FormHint link="/login" caption="Войти">
          Вспомнили пароль?
        </FormHint>
      </Form>
    </main>
  );
};

export default ForgotPassPage;
