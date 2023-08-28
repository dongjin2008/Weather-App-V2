const toDay = (dates: string[]) => {
  const date = dates.map((x) => new Date(x))
  const day = date.map((x) => x.getDay())
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const dayName = day.map((x) => dayNames[x])
  return dayName
}

export default toDay;