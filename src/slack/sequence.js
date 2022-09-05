const sequence = promiseProducers => promiseProducers.reduce(
  async (resultsPromise, promiseProducer) => {
    const results = await resultsPromise
    const result = await promiseProducer()
    return [...results, result]
  },
  Promise.resolve([]),
)

export default sequence
