import React from 'react'

const Button = props => {
  return (
    <button
      type="button"
      className="px-4 py-2 font-medium bg-slate-100 rounded-lg hover:bg-slate-50 dark:bg-slate-800 hover:dark:bg-slate-700"
      {...props}
    />
  )
}

export default Button
