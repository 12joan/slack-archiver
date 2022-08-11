import React from 'react'
import useFetch from '../utils/useFetch'
import MessageList, { PlaceholderMessageList } from '../components/MessageList'

const ViewChannel = () => {
  if (import.meta.env.SSR)
    return <PlaceholderMessageList />

  // Encode the token in the URL fragment to prevent leakage via Referer header
  const token = window.location.hash.slice(1)
  const handleFetch = useFetch(`/api/view/${token}`)

  return handleFetch({
    pending: () => <PlaceholderMessageList />,
    resolved: messages => <MessageList messages={messages} />,
    rejected: error => <p>{error.message}</p>,
  })
}

export default ViewChannel
