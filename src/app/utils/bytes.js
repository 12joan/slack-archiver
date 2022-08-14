const bytes = size => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const power = Math.floor(Math.log(size) / Math.log(1024))
  return `${(size / Math.pow(1024, power)).toFixed(2)} ${units[power]}`
}

export default bytes
