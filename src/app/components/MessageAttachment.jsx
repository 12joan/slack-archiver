import React from 'react'

const MessageAttachment = ({ data }) => {
  return (
    <div style={{ borderLeft: '0.25rem solid #ccc', paddingLeft: '1em' }}>
      {data.service_name && (
        <strong style={{ display: 'block' }}>
          {data.service_icon && (
            <img src={data.service_icon} aria-hidden="true" style={{ maxHeight: '1em' }} />
          )} {data.service_name}
        </strong>
      )}

      {data.text && <p>{data.text}</p>}

      {data.image_url && (
        <img src={data.image_url} alt={data.fallback} style={{ maxWidth: '100%' }} />
      )}
    </div>
  )
}

export default MessageAttachment
