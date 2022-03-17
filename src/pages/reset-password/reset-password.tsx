import styles from './reset-password.module.scss';
import React, { FC, useState, useCallback } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import {
  checkValidate,
  passSchema,
  resetCodeSchema
} from '../../validations/user-validation';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../../components/form/form';
import Submit from '../../components/submit/submit';
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
  const [passErr, setPassErr] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [code, setCode] = useState('');
  const [codeErr, setCodeErr] = useState(false);
  const disable = passErr || codeErr || password === '' || code === '';
  const { isAuth, canResetPwd } = useAppSelector(state => state.user);
  //-------------------------------------------------------------------------------
  const handleSubmit = useCallback(
    (evt: React.SyntheticEvent) => {
      evt.preventDefault();
      dispatch(
        resetPassword(password, code, () => {
          history.replace({ pathname: '/login' });
        })
      );
    },
    [dispatch, password, code, history]
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

  if (canResetPwd === false) {
    return (
      <Redirect
        to={{
          pathname: '/forgot-password'
        }}
      />
    );
  }

  return (
    <main className={styles.content}>
      <Form onSubmit={handleSubmit} title="Восстановление пароля">
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
        <InputWrapper>
          <Input
            name="code"
            value={code}
            onChange={e => {
              setCode(e.target.value);
              checkValidate(resetCodeSchema, setCodeErr, e.target.value);
            }}
            type="text"
            placeholder="Введите код из письма"
            error={codeErr}
            errorText={code === '' ? 'Заполните поле' : 'Неверный формат кода'}
          />
        </InputWrapper>
        <Submit disabled={disable} wrapStyles={{ marginBottom: '80px' }}>
          Сохранить
        </Submit>
        <FormHint link="/login" caption="Войти">
          Вспомнили пароль?
        </FormHint>
      </Form>
    </main>
  );
};

export default ResetPassPage;
