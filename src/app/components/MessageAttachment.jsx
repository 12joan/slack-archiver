import React from 'react'

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
              <a
                href={data.title_link}
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                <strong>{data.title}</strong>
              </a>
            ) || (
              <strong>{data.title}</strong>
            )
          )}

          {data.text && <p>{data.text}</p>}
        </div>
      )}

      {data.image_url && (
        <a
          href={data.image_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block">
          <img
            src={data.image_url}
            alt={data.fallback}
            className="rounded w-auto max-w-sm"
          />
        </a>
      )}
    </div>
  )
}

export default MessageAttachment
