import usePromise from './usePromise'

const useFetch = (url, fetchArgs = {}, dependencies) => {
  return usePromise(async () => {
    const response = await fetch(url, fetchArgs)

    if (!response.ok)
      throw new Error(`${response.status} ${response.statusText}`)

    if (!response.headers.get('content-type').includes('application/json'))
      throw new Error('Content type is not json')

    const json = await response.json()

    if (!json.ok)
      throw new Error(json.error ?? 'Unknown error')

    return json.data
  }, dependencies)
}

export default useFetch
