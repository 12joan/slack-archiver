const makeResult = (type, data = undefined) => ({
  type,
  data,
  unwrap: handlers => handlers[type](data),
})

const pending = makeResult('pending')
const success = data => makeResult('success', data)
const failure = data => makeResult('failure', data)

const fromPromise = (promise) => promise
  .then(data => Promise.resolve(success(data)))
  .catch(error => Promise.resolve(failure(error)))

const bind = (result, func) => result.unwrap({
  pending: () => pending,
  failure: error => failure(error),
  success: func,
})

const map = (result, func) => result.unwrap({
  pending: () => pending,
  failure: error => failure(error),
  success: x => success(func(x)),
})

export {
  pending,
  success,
  failure,
  fromPromise,
  bind,
  map,
}
