import { useState, useEffect } from 'react'
import * as ServiceResult from './serviceResult'

const usePromise = (getPromise, dependencies = []) => {
  const [result, setResult] = useState(ServiceResult.pending)

  useEffect(() => {
    const promise = getPromise()
    ServiceResult.fromPromise(promise).then(setResult)
  }, dependencies)

  return result
}

export default usePromise
