import { FormEvent, useState, ChangeEvent } from 'react'
import SearchBox from './components/SearchBox'
import Button from './components/Button'
import Weather from './components/Weather'

const App = () => {
  const [city, setCity] = useState('')
  const [searchCity, setSearchCity] = useState('')

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSearchCity(city)
    setCity('')
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex lg:flex-row flex-col lg:px-20 lg:space-x-3 pt-3">
        <SearchBox name="city" value={city} onChange={handleInputChange} />
        <Button value="Search" />
      </form>
      {searchCity && <Weather city={searchCity} />}
    </>
  )
}

export default App