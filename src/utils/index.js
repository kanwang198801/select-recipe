import { message } from 'antd'

export const isUserNameUsed = (history, userName) => {
  const isFound = !!history.find((record) => record.userName === userName)
  if (isFound) {
    message.error('User name is used')
  } else {
    message.success('Added')
  }
  return isFound
}
