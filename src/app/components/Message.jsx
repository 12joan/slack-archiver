import React, { useMemo } from 'react'
import { toHTML as renderMarkdown } from 'slack-markdown'
import SafeLink, { sanitizeAnchorEl } from './SafeLink'
import MessageAttachment from './MessageAttachment'
import MessageFile from './MessageFile'

const Message = ({ data, context }) => {
  const { lookupUserName, lookupUserAvatar } = context

  const renderedText = useMemo(() => {
    const html = renderMarkdown(data.text, {
      escapeHtml: true,
      slackCallbacks: {
        user: ({ id }) => lookupUserName(id),
      },
      cssModuleNames: {
        's-mention': 'p-1 rounded bg-sky-50 dark:bg-sky-500/25 text-sky-600 dark:text-sky-500 hover:bg-sky-100 hover:dark:bg-sky-600/25 cursor-pointer',
        's-user': 'before:content-["@"]',
      },
    })

    const tempEl = document.createElement('div')
    tempEl.innerHTML = html
    tempEl.querySelectorAll('a').forEach(sanitizeAnchorEl)
    return tempEl.innerHTML
  }, [data.text, lookupUserName])

  return (
    <MessageContainer
      avatar={lookupUserAvatar(data.user)}
      onClick={() => console.log(data)}
    >
      <div className="flex space-x-2">
        <strong className="hover:underline cursor-pointer">
          {lookupUserName(data.user)}
        </strong>

        <span className="text-slate-600 dark:text-slate-400 hover:underline cursor-pointer">
          {new Date(parseFloat(data.ts) * 1000).toLocaleString()}
        </span>
      </div>

      <div
        className="message-text"
        dangerouslySetInnerHTML={{ __html: renderedText }}
      />

      {(data.files ?? []).map((file, i) => (
        <MessageFile key={i} data={file} />
      ))}

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
        <div className="h-3 w-auto max-w-[12em] bg-slate-200 dark:bg-slate-700 rounded-full" />
        <div className="h-3 w-auto max-w-md bg-slate-200 dark:bg-slate-700 rounded-full" />
      </div>
    </MessageContainer>
  )
}

const MessageContainer = ({ children, avatar = null, ...otherProps }) => {
  const avatarClassName = 'shrink-0 w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded overflow-hidden'

  return (
    <li
      className="flex space-x-3 hover:bg-slate-50 hover:dark:bg-slate-900 -mx-4 px-4 py-2"
      {...otherProps}
    >
      {avatar === null
        ? <div className={avatarClassName} />
        : <SafeLink
          href={avatar}
          className={avatarClassName}
          children={<img src={avatar} alt="Avatar" />}
        />
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
