import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../utils/useFetch'
import MessageList from '../components/MessageList'

const ViewChannel = () => {
  const { token } = useParams()
  const handleFetch = useFetch(`/api/view/${token}`)

  return (
    <main>
      {handleFetch({
        pending: () => <p>Loading...</p>,
        resolved: messages => <MessageList messages={messages} />,
        rejected: error => <p>{error.message}</p>,
      })}
    </main>
  )
}

export default ViewChannel
