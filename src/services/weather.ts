export const fromCtoF = (celsius: number) => {
  const fahrenheit = ((celsius * 9) / 5) + 32
  return fahrenheit.toFixed()
}

export const unixTimeConverter = (time: number) => {
  const date = new Date(time * 1000)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}