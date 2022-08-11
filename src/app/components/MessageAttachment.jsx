import React from 'react'

const MessageAttachment = ({ data }) => {
  return (
    <div className="mt-4 border-l-4 border-slate-500 pl-4 py-2 space-y-4">
      {(data.service_name || data.text) && (
        <div>
          {data.service_name && (
            <strong className="flex gap-2 items-center">
              {data.service_icon && (
                <img src={data.service_icon} aria-hidden="true" className="max-h-4" />
              )}

              {data.service_name}
            </strong>
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
