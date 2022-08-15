import React, { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import useFetch from '../utils/useFetch'
import Button from '../components/Button'
import MessageList, { PlaceholderMessageList } from '../components/MessageList'
import * as ServiceResult from '../utils/serviceResult'

const ViewChannel = () => {
  if (import.meta.env.SSR)
    return <PlaceholderMessageList />

  const { token } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const pageNo = parseInt(searchParams.get('page')) || 1

  const fetchMessages = useFetch(
    `/api/messages/${token}?page=${pageNo}`,
    {},
    [token, pageNo]
  )

  const fetchUsers = useFetch(
    `/api/users/${token}`,
    {},
    [token]
  )

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
    success: ({ totalPages, messages }) => (
      <div className="space-y-4">
        {pageNo < totalPages && (
          <div className="text-center">
            <Button
              onClick={() => {
                window.scrollTo(0, document.body.scrollHeight)
                setSearchParams({ page: pageNo + 1 })
              }}
              children="Older messages"
            />
          </div>
        )}

        <MessageList
          messages={messages}
          context={{ lookupUserName, lookupUserAvatar }}
        />

        {pageNo > 1 && (
          <div className="text-center">
            <Button
              onClick={() => {
                window.scrollTo(0, 0)
                setSearchParams({ page: pageNo - 1 })
              }}
              children="Newer messages"
            />
          </div>
        )}
      </div>
    ),
  })
}

export default ViewChannel
