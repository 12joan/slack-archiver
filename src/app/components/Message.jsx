import React from 'react'
import { toHTML as renderMarkdown } from 'slack-markdown'
import MessageAttachment from './MessageAttachment'

const Message = ({ data }) => {
  const renderedText = renderMarkdown(data.text, {
    escapeHtml: true,
    slackOnly: true,
  })

  return (
    <div>
      <strong>{data.user}</strong>

      <div dangerouslySetInnerHTML={{ __html: renderedText }} />

      {(data.attachments ?? []).map((attachment, i) => (
        <MessageAttachment key={i} data={attachment} />
      ))}

      <p>{JSON.stringify(data)}</p>
    </div>
  )
}

export default Message
