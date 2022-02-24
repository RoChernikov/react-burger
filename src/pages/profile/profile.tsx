import styles from './profile.module.css';
import React, { FC, useState, useEffect, useCallback } from 'react';
import {
  Input,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import ProfileNav from '../../components/profile-nav/profile-nav';
import InputWrapper from '../../components/form/components/input-wrapper/input-wrapper';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { useHistory } from 'react-router-dom';
import { patchUser } from '../../services/slices/user';
//--------------------------------------------------------------------------------

const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const { user, userRequest } = useAppSelector(state => state.user);

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setName(user.name);
    }
  }, [user]);

  const handleSubmit = useCallback(
    (evt: React.SyntheticEvent) => {
      evt.preventDefault();
      dispatch(patchUser({ name, email }));
      if (!userRequest) {
        history.replace('/profile');
      }
    },
    [dispatch, name, email, history, userRequest]
  );

  const handleReset = useCallback(
    (evt: React.SyntheticEvent) => {
      evt.preventDefault();
      setName(user.name);
      setEmail(user.email);
      if (!userRequest) {
        history.replace('/profile');
      }
    },
    [dispatch, name, email, history, userRequest]
  );

  return (
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
          />
        </InputWrapper>

        <InputWrapper>
          <Input
            name="password"
            type="password"
            value="password"
            onChange={() => {}}
            icon="EditIcon"
            placeholder="Пароль"
          />
        </InputWrapper>
        <div className={styles.buttons}>
          <Button type="secondary" size="medium" onClick={handleReset}>
            Отмена
          </Button>
          <Button size="small">Сохранить</Button>
        </div>
      </form>
    </main>
  );
};

export default Profile;
