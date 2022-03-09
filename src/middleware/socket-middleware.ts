import { Middleware } from 'redux';
import { getCookie } from '../utils/cookie';

export const socketMiddleware = (
  wsUrl: string,
  wsActions: { [key: string]: string }
): Middleware => {
  return store => {
    let socket: WebSocket | null = null;
    return next => (action: any) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const accessToken = getCookie('accessToken');
      const {
        wsInit,
        wsSendMessage,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsClose
      } = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(wsUrl);
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({ type: onOpen });
        };

        socket.onerror = () => {
          dispatch({ type: onError });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = () => {
          dispatch({ type: onClose });
        };

        if (type === wsSendMessage) {
          const message = { ...payload, token: accessToken };
          socket.send(JSON.stringify(message));
        }
        if (type === wsClose) {
          socket.close();
        }
      }

      next(action);
    };
  };
};
