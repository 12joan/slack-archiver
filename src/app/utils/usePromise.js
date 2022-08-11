import { useState, useEffect } from 'react'
import * as ServiceResult from './serviceResult'

const usePromise = getPromise => {
  const [result, setResult] = useState(ServiceResult.pending)

  useEffect(() => {
    const promise = getPromise()
    ServiceResult.fromPromise(promise).then(setResult)
  }, [])

  return result
}

export default usePromise
