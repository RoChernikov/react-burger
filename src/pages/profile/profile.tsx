import styles from './profile.module.css';
import React, { FC, useState } from 'react';
import {
  Input,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import ProfileNav from '../../components/profile-nav/profile-nav';
import InputWrapper from '../../components/form/components/input-wrapper/input-wrapper';
//--------------------------------------------------------------------------------

const handleSubmit = () => {
  console.log('Submit');
};

const Profile: FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

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
          <Button type="secondary" size="medium">
            Отмена
          </Button>
          <Button size="small">Сохранить</Button>
        </div>
      </form>
    </main>
  );
};

export default Profile;
