import styles from './profile.module.css';
import React, {
  FC,
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo
} from 'react';
import {
  checkValidate,
  nameSchema,
  emailSchema,
  passSchema
} from '../../validations/user-validation';
import {
  Input,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import ProfileNav from '../../components/profile-nav/profile-nav';
import InputWrapper from '../../components/form/components/input-wrapper/input-wrapper';
import Loader from '../../components/loader/loader';
import Submit from '../../components/submit/submit';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { patchUser } from '../../services/slices/user';
import { Route } from 'react-router-dom';
import Orders from '../../components/orders/orders';
import { wsInitWithCustomUrl, wsClose } from '../../services/slices/ws-orders';
import Message from '../../components/message/message';
import { getCookie } from '../../utils/cookie';
//--------------------------------------------------------------------------------

const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const loginInputRef = useRef<HTMLInputElement>(null);
  const pwdInputRef = useRef<HTMLInputElement>(null);
  const innitialInputState = {
    nameState: true,
    loginState: true,
    pwdState: true
  };
  const [inputsState, setInputsState] = useState(innitialInputState);
  const [name, setName] = useState('');
  const [nameErr, setNameErr] = useState(false);
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState(false);
  const [pass, setPass] = useState('');
  const [passErr, setPassErr] = useState(false);
  const disable = nameErr || emailErr || passErr || name === '' || email === '';
  const { user, status } = useAppSelector(state => state.user);
  const shouldShowBtns = useMemo(
    () => name !== user.name || email !== user.email || pass !== '',
    [user, name, email, pass]
  );
  const { orders } = useAppSelector(state => state.wsOrders);
  //-------------------------------------------------------------------------------

  useEffect(() => {
    dispatch(
      wsInitWithCustomUrl(
        `wss://norma.nomoreparties.space/orders?token=${getCookie(
          'accessToken'
        )}`
      )
    );

    return () => {
      dispatch(wsClose());
    };
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setName(user.name);
    }
  }, [user]);

  const handleSubmit = useCallback(
    (evt: React.SyntheticEvent) => {
      evt.preventDefault();
      dispatch(patchUser({ name, email, password: pass }));
    },
    [dispatch, name, email, pass]
  );

  const handleReset = useCallback(
    (evt: React.SyntheticEvent) => {
      evt.preventDefault();
      setName(user.name);
      setEmail(user.email);
      setPass('');
      setPassErr(false);
      checkValidate(nameSchema, setNameErr, user.name);
      checkValidate(emailSchema, setEmailErr, user.email);
    },
    [user]
  );

  return status === 'pending' ? (
    <div style={{ paddingTop: 220 }}>
      <Loader />
    </div>
  ) : (
    <>
      {status !== 'failed' ? (
        <main className={styles.main}>
          <ProfileNav />
          <Route exact path="/profile">
            <section className={styles.section}>
              <form onSubmit={handleSubmit} className={styles.form}>
                <InputWrapper>
                  <Input
                    name="name"
                    type="text"
                    value={name}
                    onChange={e => {
                      setName(e.target.value);
                      checkValidate(nameSchema, setNameErr, e.target.value);
                    }}
                    icon="EditIcon"
                    placeholder="Имя"
                    error={nameErr}
                    errorText={
                      name === ''
                        ? 'Заполните поле'
                        : 'Некорректный формат имени'
                    }
                    onIconClick={async () => {
                      await setInputsState({
                        ...innitialInputState,
                        nameState: false
                      });
                      nameInputRef.current && nameInputRef.current.focus();
                    }}
                    onBlur={() => {
                      setInputsState({
                        ...innitialInputState,
                        nameState: true
                      });
                    }}
                    disabled={inputsState.nameState}
                    ref={nameInputRef}
                  />
                </InputWrapper>

                <InputWrapper>
                  <Input
                    name="login"
                    type="text"
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value);
                      checkValidate(emailSchema, setEmailErr, e.target.value);
                    }}
                    icon="EditIcon"
                    placeholder="Логин"
                    error={emailErr}
                    errorText={
                      email === ''
                        ? 'Заполните поле'
                        : 'Некорректный формат e-mail'
                    }
                    onIconClick={async () => {
                      await setInputsState({
                        ...innitialInputState,
                        loginState: false
                      });
                      loginInputRef.current && loginInputRef.current.focus();
                    }}
                    onBlur={() => {
                      setInputsState({
                        ...innitialInputState,
                        loginState: true
                      });
                    }}
                    disabled={inputsState.loginState}
                    ref={loginInputRef}
                  />
                </InputWrapper>
                <InputWrapper>
                  <Input
                    name="newPass"
                    type="password"
                    value={pass}
                    onChange={e => {
                      setPass(e.target.value);
                      checkValidate(passSchema, setPassErr, e.target.value);
                    }}
                    icon="EditIcon"
                    placeholder="Пароль"
                    error={passErr}
                    errorText="Некорректный пароль"
                    onIconClick={async () => {
                      await setInputsState({
                        ...innitialInputState,
                        pwdState: false
                      });
                      pwdInputRef.current && pwdInputRef.current.focus();
                    }}
                    onBlur={() => {
                      setInputsState({ ...innitialInputState, pwdState: true });
                    }}
                    disabled={inputsState.pwdState}
                    ref={pwdInputRef}
                  />
                </InputWrapper>
                {shouldShowBtns && (
                  <div className={styles.buttons}>
                    <Button type="secondary" size="small" onClick={handleReset}>
                      Отмена
                    </Button>
                    <Submit disabled={disable}>Сохранить</Submit>
                  </div>
                )}
              </form>
            </section>
          </Route>
          <Route path="/profile/orders">
            <section className={styles.section}>
              <Orders
                path="/profile/orders/"
                withStatus
                orders={orders && [...orders].reverse()}
              />
            </section>
          </Route>
        </main>
      ) : (
        <Message>Не удалось загрузить данные!</Message>
      )}
    </>
  );
};

export default Profile;
