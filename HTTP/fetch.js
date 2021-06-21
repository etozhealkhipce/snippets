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
  const params = Object.entries(data).reduce(
    (acc, [key, value], index) =>
      acc + (index ? `&${key}=${value}` : `${key}=${value}`),
    "?"
  );
  return params;
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

      if (method === METHODS.GET) {
        xhr.open(method, url + queryStringify(data));
      } else {
        xhr.open(method, url);
      }

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          resolve(xhr);
        }
      };

      xhr.send(data);
    });
  };
}

new HTTPTransport()
  .get("https://jsonplaceholder.typicode.com/comments", {
    timeout: 1000,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    data: {
      postId: 1,
    },
  })
  .then((res) => console.log(res));
