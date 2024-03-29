<h1 align="center"><a  href="https://stellarburgers.vercel.app/" target="_blank"><img src="./readme_src/stellar-burger_header.jpg" width="100%" alt="шапка"></a></h1>

## Краткое описание:

<p align="Left"> "Stellar Burgers" - одностраничное приложение, позволяющее собрать и заказать свой уникальный межгалактический бургер</p>
Проект сверстан для настольных компьютеров (разрешение 1280x720 и выше, статическая верстка).

[Открыть в браузере](https://stellarburgers.vercel.app/)
<br>

Для полноценного тестирования необходимо зарегистрироваться или авторизоваться.
<br>

Тестовые данные для авторизации:
<br>
**e-mail:** stellarburgers@test.com 
<br>
**Пароль:** password

## Функционал:

- с помощью перетаскивания соберите свой межгалактический бургер
- список ингредиентов приходит с публичного API
- регистрация/авторизация пользователя, восстановление пароля
- Хранение токенов в cookie
- Защищенный роутинг
- Лента заказов (WebSocket)

<a  href="https://stellarburgers.vercel.app/" target="_blank" align="center"><img src="./readme_src/demo.gif" width="100%" alt="Демо"></a>

<a  href="https://stellarburgers.vercel.app/" target="_blank" align="center"><img src="./readme_src/demo2.gif" width="100%" alt="Демо2"></a>

<a  href="https://stellarburgers.vercel.app/" target="_blank" align="center"><img src="./readme_src/demo3.gif" width="100%" alt="Демо3"></a>

## Технологии, использованные при создании:

- React.js (CRA)
- TypeScript
- Redux (Redux-toolkit, thunk)
- React DND
- React Router
- Работа с публичным API
- JWT Token
- WebSocket
- Flexbox
- Grid Layout
- CSS - animation
- Семантическая верстка
- Использована библиотека UI-компонентов [Яндекс.Практикум.Реакт](https://github.com/yandex-praktikum/react-developer-burger-ui-components)

## Языки:

- HTML
- CSS
- TypeScript
- JSX

## Внешние компоненты

Для работы с проектом вам понадобятся git, NodeJS

- [Как установить git.](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Как установить NodeJS.](https://nodejs.org/en/download/package-manager/)

## Локальная установка:

В командной строке перейдите в папку, где будет развернут проект. После чего скопируйте его с GitHub:
```sh
`$ git clone git@github.com:RoChernikov/react-burger.git`
```

Далее переходим в папку с проектом и устанавливаем компоненты:
```sh
`$ npm install`
```

Далее можно запускать проект на локальном сервере:
```sh
`$ npm start`
```


## Деплой проекта:

Устанавливаем пакет для выкладывания проекта на gh-pages:
```sh
`$ npm install gh-pages --save-dev`
```

Деплой:
```sh
`$ npm run deploy`
```

## Ссылки:

[Макет](<https://www.figma.com/file/Z8DHldjVbvhQXtrkmJR8CU/React-%2F-Проектные-задачи-(3-месяца)?node-id=0%3A1>)

- [Ссылка на деплой](https://stellarburgers.vercel.app/)

- [По вопросам доработки сайта](https://t.me/ro_runner)

## Проектная работа: "Stellar Burgers". Создана в рамках учебы в [Яндекс.Практикум](https://praktikum.yandex.ru/) на курсе ["Веб-разработчик плюс"](https://practicum.yandex.ru/web-plus/).
