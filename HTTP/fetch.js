const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const METHODS = {
  GET: "GET",
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

  request = (url, options) => {
    const { method, data, timeout, headers } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      if (method === METHODS.GET) {
        xhr.open(method, url + queryStringify(data));
      } else {
        xhr.open(method, url);
      }

      xhr.timeout = timeout;
      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

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
