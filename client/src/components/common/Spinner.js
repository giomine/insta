import Spinner from 'react-bootstrap/Spinner'

const SpinnerComponent = () => {
  return (
    <div className='spinner'>
      <h3 className='title'> Loading ... </h3>
      <Spinner className='animation'/>
    </div>
  )
}

export default SpinnerComponent