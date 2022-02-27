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
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const { user, status } = useAppSelector(state => state.user);
  const shouldShowBtns = useMemo(
    () => name !== user.name || email !== user.email,
    [user, name, email]
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
      <form onSubmit={handleSubmit} className={styles.form}>
        <InputWrapper>
          <Input
            name="name"
            type="text"
            value={name}
            onChange={evt => setName(evt.target.value)}
            icon="EditIcon"
            placeholder="Имя"
            onIconClick={async () => {
              await setInputsState({ ...innitialInputState, nameState: false });
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
            onChange={evt => setEmail(evt.target.value)}
            icon="EditIcon"
            placeholder="Логин"
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
            onChange={evt => setPass(evt.target.value)}
            icon="EditIcon"
            placeholder="Пароль"
            onIconClick={async () => {
              await setInputsState({ ...innitialInputState, pwdState: false });
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
    </main>
  );
};

export default Profile;
