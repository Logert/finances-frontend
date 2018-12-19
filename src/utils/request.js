import { notification } from 'antd';
import hash from 'hash.js';

const codeMessage = {
  200: 'Сервер успешно возвратил запрошенные данные.',
  201: 'Создание или изменение данных успешно.',
  202: 'Запрос был поставлен в очередь в фоновом режиме (асинхронная задача).',
  204: 'Данные были успешно удалены.',
  400: 'Запрос был сделан с ошибкой, и сервер не выполнял никаких новых или измененных операций с данными.',
  401: 'У пользователя нет разрешения (токен, имя пользователя, пароль неверны).',
  403: 'Пользователь авторизован, но доступ запрещен.',
  404: 'Запрос делается для записи, которая не существует, и сервер не работает.',
  406: 'Формат запроса недоступен. ',
  410: 'Запрошенный ресурс удаляется навсегда и больше не будет получен. ',
  422: 'При создании объекта произошла ошибка проверки. ',
  500: 'Сервер имеет ошибку, пожалуйста, проверьте сервер. ',
  502: 'Ошибка шлюза. ',
  503: 'Услуга недоступна, сервер временно перегружен или поддерживается. ',
  504: 'Шлюз погас. ',
};

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  notification.error({
    message: `Ошибка запроса ${response.status}: ${response.url}`,
    description: errortext,
  });
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
};

const checkData = data => {
  const message = data.error || '';
  const description = data.message || '';
  notification.error({ message, description });
  const error = new Error(message);
  error.name = message;
  error.message = description;
  throw error;
};

const cachedSave = (response, hashcode) => {
  /**
   * Clone a response data and store it in sessionStorage
   * Does not support data other than json, Cache only json
   */
  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.match(/application\/json/i)) {
    // All data is saved as text
    response
      .clone()
      .text()
      .then(content => {
        sessionStorage.setItem(hashcode, content);
        sessionStorage.setItem(`${hashcode}:timestamp`, Date.now());
      });
  }
  return response;
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [option] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(
  url,
  option,
) {
  const options = {
    ...option,
  };
  /**
   * Produce fingerprints based on url and parameters
   * Maybe url has the same parameters
   */
  const fingerprint = url + (options.body ? JSON.stringify(options.body) : '');
  const hashcode = hash
    .sha256()
    .update(fingerprint)
    .digest('hex');

  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };
  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'DELETE'
  ) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }

  const expirys = options.expirys && 60;
  // options.expirys !== false, return the cache,
  if (options.expirys !== false) {
    const cached = sessionStorage.getItem(hashcode);
    const whenCached = sessionStorage.getItem(`${hashcode}:timestamp`);
    if (cached !== null && whenCached !== null) {
      const age = (Date.now() - whenCached) / 1000;
      if (age < expirys) {
        const response = new Response(new Blob([cached]));
        return response.json();
      }
      sessionStorage.removeItem(hashcode);
      sessionStorage.removeItem(`${hashcode}:timestamp`);
    }
  }
  return fetch(url, newOptions)
    .then(checkStatus)
    .then(response => cachedSave(response, hashcode))
    .then(response => {
      // DELETE and 204 do not return data by default
      // using .json will report an error.
      if (newOptions.method === 'DELETE' || response.status === 204) {
        return response.text();
      }
      return response.json();
    })
    .then(data => {
      if (data.error) {
        return checkData(data);
      }
      return data;
    })
    .catch(e => {
      return {
        error: e,
      };
      // const status = e.name;
      // if (status === 401) {
      //   // // @HACK
      //   // /* eslint-disable no-underscore-dangle */
      //   // window.g_app._store.dispatch({
      //   //   type: 'login/logout',
      //   // });
      // }
      // // environment should not be used
      // if (status === 403) {
      //   router.push('/exception/403');
      //   return;
      // }
      // if (status <= 504 && status >= 500) {
      //   router.push('/exception/500');
      //   return;
      // }
      // if (status >= 404 && status < 422) {
      //   router.push('/exception/404');
      // }
    });
}
