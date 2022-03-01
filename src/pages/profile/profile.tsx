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
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { patchUser } from '../../services/slices/user';
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
  const { user, status } = useAppSelector(state => state.user);
  const shouldShowBtns = useMemo(
    () => name !== user.name || email !== user.email || pass !== '',
    [user, name, email, pass]
  );
  //-------------------------------------------------------------------------------

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
    <main className={styles.main}>
      <ProfileNav />
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
              errorText="Некорректное имя"
              onIconClick={async () => {
                await setInputsState({
                  ...innitialInputState,
                  nameState: false
                });
                nameInputRef.current && nameInputRef.current.focus();
              }}
              onBlur={() => {
                setInputsState({ ...innitialInputState, nameState: true });
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
              errorText="Некорректный формат e-mail"
              onIconClick={async () => {
                await setInputsState({
                  ...innitialInputState,
                  loginState: false
                });
                loginInputRef.current && loginInputRef.current.focus();
              }}
              onBlur={() => {
                setInputsState({ ...innitialInputState, loginState: true });
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
              <Button type="secondary" size="medium" onClick={handleReset}>
                Отмена
              </Button>
              <Button size="small">Сохранить</Button>
            </div>
          )}
        </form>
      </section>
    </main>
  );
};

export default Profile;
