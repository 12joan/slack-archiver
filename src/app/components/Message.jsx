import React from 'react'
import { toHTML as renderMarkdown } from 'slack-markdown'
import MessageAttachment from './MessageAttachment'

const Message = ({ data, context }) => {
  const { lookupUserName, lookupUserAvatar } = context

  const renderedText = renderMarkdown(data.text, {
    escapeHtml: true,
    slackCallbacks: {
      user: ({ id }) => lookupUserName(id),
    },
  })

  return (
    <MessageContainer avatar={lookupUserAvatar(data.user)}>
      <strong>{lookupUserName(data.user)}</strong>

      <div
        className="message-text"
        dangerouslySetInnerHTML={{ __html: renderedText }}
      />

      {(data.attachments ?? []).map((attachment, i) => (
        <MessageAttachment key={i} data={attachment} />
      ))}
    </MessageContainer>
  )
}

const PlaceholderMessage = () => {
  return (
    <MessageContainer>
      <div className="space-y-4">
        <div className="h-3 w-auto max-w-[12em] bg-slate-200 rounded-full" />
        <div className="h-3 w-auto max-w-md bg-slate-200 rounded-full" />
      </div>
    </MessageContainer>
  )
}

const MessageContainer = ({ children, avatar = null }) => {
  const avatarClassName = 'shrink-0 w-12 h-12 bg-slate-200 rounded'
  return (
    <li className="flex space-x-4">
      {avatar === null
        ? <div className={avatarClassName} />
        : <img className={avatarClassName} src={avatar} />
      }

      <div className="grow">
        {children}
      </div>
    </li>
  )
}

export default Message

export {
  PlaceholderMessage,
}