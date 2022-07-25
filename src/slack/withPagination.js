const withPagination = producer => consumer => {
  const getNextPage = async ({ cursor }) => {
    const response = await producer(cursor)

    await consumer(response)

    if (response.has_more)
      await getNextPage({ cursor: response.response_metadata.next_cursor })
  }

  return getNextPage({ cursor: undefined })
}

export default withPagination
