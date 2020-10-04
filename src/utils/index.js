export const isUserNameUsed = (history, userName) => {
  const isFound = !!history.find((record) => record.userName === userName)
  return isFound
}

export const replaceExistingRecordByUserName = (history, existingUserNameData) => {
  const newHistory = history.filter(
    (record) => record.userName !== existingUserNameData.userName
  )
  return newHistory.concat(existingUserNameData)
}
