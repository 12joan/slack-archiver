import React from 'react'
import bytes from '../utils/bytes'

const MessageFile = ({ data }) => {
  return (
    <a
      href={data.url_private}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-2 block border border-slate-200 rounded p-3 bg-white space-y-1 hover:bg-slate-50 dark:border-slate-700 dark:bg-black dark:hover:bg-slate-900"
    >
      <div className="space-x-2">
        <span className="font-medium">{data.name}</span>
        <span className="text-slate-600 dark:text-slate-400">{bytes(data.size)}</span>
      </div>

      <div>
        Click to view file. You may need to sign in with Slack.
      </div>
    </a>
  )
}

export default MessageFile
