import { useEffect } from 'react'
import { print } from './script'

function App() {
  useEffect(()=> {
    print()
  })
  return (
    <>
    <div className='font-medium'>
      asd123
    </div>
    </>
  )
}

export default App
