import React, { useEffect } from 'react'
import useFetch from '../utils/useFetch'
import MessageList, { PlaceholderMessageList } from '../components/MessageList'
import * as ServiceResult from '../utils/serviceResult'

const ViewChannel = () => {
  if (import.meta.env.SSR)
    return <PlaceholderMessageList />

  // Encode the token in the URL fragment to prevent leakage via Referer header
  const token = window.location.hash.slice(1)
  const fetchMessages = useFetch(`/api/messages/${token}`)
  const fetchUsers = useFetch(`/api/users/${token}`)

  useEffect(() => {
    if (fetchMessages.type === 'success' && window.scrollY === 0)
      window.scrollTo(0, document.body.scrollHeight)
  }, [fetchMessages.type])

  const lookupUser = userId => ServiceResult.bind(fetchUsers, users => {
    const user = users.find(user => user.id === userId)

    return user
      ? ServiceResult.success(user)
      : ServiceResult.failure(new Error(`User not found: ${userId}`))
  })

  const lookupUserAttribute = (userId, func, defaultValue) => lookupUser(userId).unwrap({
    pending: () => defaultValue,
    failure: error => {
      console.error('Failed to lookup user:', error)
      return defaultValue
    },
    success: user => func(user),
  })

  const lookupUserName = userId => lookupUserAttribute(
    userId,
    user => user.real_name,
    userId
  )

  const lookupUserAvatar = userId => lookupUserAttribute(
    userId,
    user => user.profile.image_512,
    null
  )

  return fetchMessages.unwrap({
    pending: () => <PlaceholderMessageList />,
    failure: error => <p>{error.message}</p>,
    success: messages => <MessageList
      messages={messages}
      context={{ lookupUserName, lookupUserAvatar }}
    />,
  })
}

export default ViewChannel
