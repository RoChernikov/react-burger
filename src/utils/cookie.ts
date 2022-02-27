import { ICookieProps } from './interfaces';
//--------------------------------------------------------------------------------

export function getCookie(name: string): string {
  const matches: RegExpMatchArray | null = document.cookie.match(
    new RegExp(
      '(?:^|; )' + name.replace(/([$?*|{}\]\\^])/g, '\\$1') + '=([^;]*)'
    )
  );
  return matches ? decodeURIComponent(matches[1]) : '';
}

export function setCookie(
  name: string,
  value: string | number | boolean,
  props: ICookieProps = {}
): void {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = d;
  }
  if (exp instanceof Date && exp) {
    exp = exp.toUTCString();
  }
  const cookieValue: string = encodeURIComponent(value);
  let updatedCookie: string = name + '=' + cookieValue;
  let propName: keyof ICookieProps;
  for (propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (!propValue) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name: string): void {
  setCookie(name, '', { expires: -1 });
}
