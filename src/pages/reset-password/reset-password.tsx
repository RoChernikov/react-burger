import styles from './reset-password.module.css';
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
import { resetPassword } from '../../services/slices/user';
import { ILocationParams } from '../../utils/interfaces';
//--------------------------------------------------------------------------------

const ResetPassPage: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory<ILocationParams>();
  const [password, setPassword] = useState('');
  const [value, setValue] = useState('');
  const { isAuth, canResetPwd } = useAppSelector(state => state.user);
  //-------------------------------------------------------------------------------
  const handleSubmit = useCallback(
    (evt: React.SyntheticEvent) => {
      evt.preventDefault();
      dispatch(
        resetPassword(password, value, () => {
          history.replace({ pathname: '/login' });
        })
      );
    },
    [dispatch, password, value, history]
  );

  if (canResetPwd === false) {
    return (
      <Redirect
        to={{
          pathname: '/forgot-password'
        }}
      />
    );
  }

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
