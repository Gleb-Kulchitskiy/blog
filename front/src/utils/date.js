export const formatDate = timestamp => {
  const date = new Date(timestamp)
  const day = date.getDay()
  const month = date.getMonth()
  const hours = date.getHours()
  const minutes = date.getMinutes()

  return {
    date: `${day > 9 ? day : '0' + day}-${month > 9 ? month : '0' + month}-${date.getFullYear()}`,
    time: `${hours > 9 ? hours : '0' + hours}:${minutes > 9 ? minutes : '0' + minutes}`
  }
}