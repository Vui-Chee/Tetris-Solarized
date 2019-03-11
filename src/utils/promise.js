// Resolves promise and returns 2 values,
// error and data.
export const promiseWrapper = promise => {
  return promise
    .then(data => {
      return [null, data];
    })
    .catch(err => [err]);
};
