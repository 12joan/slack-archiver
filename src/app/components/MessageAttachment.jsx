import React from 'react'
import SafeLink from './SafeLink'

const MessageAttachment = ({ data }) => {
  return (
    <div className="mt-2 pl-4 py-2 space-y-2 relative before:block before:absolute before:inset-0 before:w-1 before:bg-slate-200 before:dark:bg-slate-700 before:rounded-full">
      {(data.service_name || data.text) && (
        <div>
          {data.service_name && (
            <strong className="flex gap-2 items-center">
              {data.service_icon && <img
                src={data.service_icon}
                aria-hidden="true"
                className="h-5 rounded"
              />}

              {data.service_name}
            </strong>
          )}

          {data.title && (
            data.title_link && (
              <SafeLink href={data.title_link} className="link">
                <strong>{data.title}</strong>
              </SafeLink>
            ) || (
              <strong>{data.title}</strong>
            )
          )}

          {data.text && <p>{data.text}</p>}
        </div>
      )}

      {data.image_url && (
        <SafeLink href={data.image_url} className="block">
          <img
            src={data.image_url}
            alt={data.fallback}
            className="rounded w-auto max-w-sm"
          />
        </SafeLink>
      )}
    </div>
  )
}

export default MessageAttachment
