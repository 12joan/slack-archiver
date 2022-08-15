import React from 'react'

const linkProps = {
  target: '_blank',
  rel: 'noopener noreferrer',
}

const santizeHref = href => {
  const url = new URL(href)

  return ['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol)
    ? url.href
    : undefined
}

const sanitizeAnchorEl = anchor => {
  anchor.setAttribute('href', santizeHref(anchor.href))
  Object.entries(linkProps).forEach(([key, value]) => anchor.setAttribute(key, value))
}

const SafeLink = ({ href, ...otherProps }) => {
  return <a
    href={santizeHref(href)}
    {...linkProps}
    {...otherProps}
  />
}

export default SafeLink

export {
  sanitizeAnchorEl,
}
