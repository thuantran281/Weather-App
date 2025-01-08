import spinner from '../assets/spinner.gif'

const Spinner = () => {
  return (
    <>
      <div className="flex justify-center items-center">
        <img src={spinner} alt="Loading..." />
      </div>
    </>
  )
}

export default Spinner