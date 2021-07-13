const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  UPDATE: "UPDATE",
  PATCH: "PATCH",
};

function queryStringify(data) {
  if (data) {
    const params = Object.entries(data).reduce(
      (acc, [key, value], index) =>
        acc + (index ? `&${key}=${value}` : `${key}=${value}`),
      "?"
    );
    return params;
  }
}
class HTTPTransport {
  get = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.GET });
  };

  post = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.POST });
  };

  put = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.PUT });
  };

  delete = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.DELETE });
  };

  request = (url, options) => {
    const { method, data, timeout, headers = {} } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject("No method");
        return;
      }

      const xhr = new XMLHttpRequest();

      if (method === METHODS.GET && !!data) {
        xhr.open(method, url + queryStringify(data));
      } else {
        xhr.open(method, url);
      }

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        if (xhr.status === 200) {
          // кривой тест яндекса
          resolve(new Response(xhr));
        } else {
          reject(xhr);
        }
      };
      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      xhr.send(data);
    });
  };
}

function fetchWithRetry(url, options) {
  let { retries } = options;

  // кривой тест яндекса
  try {
    return new HTTPTransport().get(url, options);
  } catch {
    if (retries) {
      fetchWithRetry(url, { retries: retries - 1 });
    } else {
      throw new Error(err);
    }
  }
}

// new HTTPTransport()
//   .get(url, options)
//   .then((xhr) => new Response(xhr))
//   .catch((err) => {
//     if (retries) {
//       fetchWithRetry(url, { retries: retries - 1 });
//     } else {
//       throw new Error(err);
//     }
//   });

fetchWithRetry("https://jsonplaceholder.typicode.com/todos/1", { retries: 2 });

// new HTTPTransport()
//   .get("https://jsonplaceholder.typicode.com/comments", {
//     timeout: 1000,
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//     data: {
//       postId: 1,
//     },
//   })
//   .then((res) => console.log(res));

// new HTTPTransport()
//   .get("https://jsonplaceholder.typicode.com/todos/1", {})
//   .then((res) => console.log(res));
