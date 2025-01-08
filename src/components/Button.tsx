const Button = ({ value }: { value: string }) => {
  return (
    <>
      <div className="lg:mx-0 mx-auto">
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-2xl">
          {value}
        </button>
      </div>
    </>
  )
}

export default Button