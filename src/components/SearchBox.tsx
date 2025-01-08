import { ChangeEvent } from 'react'

interface SearchBoxProps {
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBox : React.FC<SearchBoxProps> = ({ name, value, onChange }) => {
  return (
    <>
      <div className="lg:mx-0 mx-auto lg:mb-0 mb-2">
        <input
          className="lg:w-80 w-full h-10 rounded-xl py-1 px-4 text-gray-700 shadow appearance-none border focus:outline-none focus:ring focus:border-blue-700 outline-offset-1 font-serif"
          type="text"
          value={value}
          name={name}
          id="location"
          placeholder="Search location"
          onChange={onChange}
        />
      </div>
    </>
  )
}

export default SearchBox