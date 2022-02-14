import React, { FC } from 'react';
import {
  Input,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import Form from '../../components/form/form';
import Submit from '../../components/form/components/submit/submit';
import InputWrapper from '../../components/form/components/input-wrapper/input-wrapper';
import FormHint from '../../components/form/components/form-hint/form-hint';
//--------------------------------------------------------------------------------

const handleSubmit = () => {
  console.log('Submit');
};

const LoginPage: FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
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
  );
};

export default LoginPage;
