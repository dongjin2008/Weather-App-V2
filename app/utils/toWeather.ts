const toWeather = (weather: number[]) => {
  const weathercode: string[] = ["sun", "cloud", "rain", "fog","snow", "thunder"]
  const weathers: string[] = weather.map((x) => x === 0 ? weathercode[0] : x < 20 ? weathercode[1] : x < 40 ? weathercode[2] : x < 50 ? weathercode[3] : x < 80 ? weathercode[2] : weathercode[5])
  return weathers
}

export default toWeather;