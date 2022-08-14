import React from 'react'
import Message, { PlaceholderMessage } from './Message'

const MessageList = ({ messages, MessageComponent = Message, className, ...otherProps }) => {
  return (
    <ul className={className}>
      {messages.map(message => (
        <MessageComponent key={message.ts} data={message} {...otherProps} />
     ))}
    </ul>
  )
}

const PlaceholderMessageList = () => MessageList({
  className: "mb-[10000vh]", // For scroll restoration
  messages: Array.from({ length: 100 }, (_, i) => ({ ts: `${i}` })),
  MessageComponent: PlaceholderMessage,
})

export default MessageList

export {
  PlaceholderMessageList,
}
