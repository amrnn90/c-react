import axios from 'axios';

export default function () {
  let cancel;
  const instance = axios.create();

  const wrapper = (methodName) => {
    const original = instance[methodName];
    return (...args) => {
      if (cancel) {
        cancel();
      }

      const cancelToken = new axios.CancelToken(function (c) {
        cancel = c;
      });

      instance.defaults.cancelToken = cancelToken;

      return original.bind(instance)(...args)
        .then(res => {
          cancel = null;
          return res;
        });
    }
  }

  instance.get = wrapper('get');
  instance.post = wrapper('post');
  instance.put = wrapper('put');
  instance.patch = wrapper('patch');
  instance.delete = wrapper('delete');

  return instance;
};