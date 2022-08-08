import { useState, useEffect } from 'react'

const usePromise = getPromise => {
  const [promiseState, setPromiseState] = useState({
    state: 'pending',
  })

  useEffect(() => {
    const promise = getPromise()

    promise
      .then(value => setPromiseState({ state: 'resolved', data: value }))
      .catch(error => setPromiseState({ state: 'rejected', data: error }))
  }, [])

  return handlers => handlers[promiseState.state](promiseState.data)
}

export default usePromise
