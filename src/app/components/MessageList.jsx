import React from 'react'
import Message from './Message'

const MessageList = ({ messages }) => {
  return (
    <ul>
      {messages.map(message => (
        <li key={message.ts}>
          <Message data={message} />
        </li>
      ))}
    </ul>
  )
}

export default MessageList
