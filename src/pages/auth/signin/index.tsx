import { useEffect, useState } from 'react'
import { print } from './script'

import Button from '../../../components/inputs/button'
import TextField from '../../../components/inputs/textfield'

function App() {
  const [loading, setLoading] = useState(false);
  useEffect(()=> {
    print()
  })
  const dividerCss = 'after:content-[""] after:absolute after:block after:z-[-1] after:top-[45%] after:left-[-100%] after:w-[300%] after:h-[1px] after:bg-gray-200 after:sm:block after:hidden'
  const loginCardCss = 'grid place-items-center h-[calc(100vh)] inset-0 text-center';
  return (
    <div className={loginCardCss}>
      <section className='max-w-[450px] space-y-[20px] border-[1px] border-gray-200 rounded-lg py-[50px] px-[20px] sm:px-[50px] m-[10px]'>
        <header className='space-y-[14px] pb-[10px]'>
          <h1 className='font-header font-semibold text-[22px] pb-[4px]'>Sign in to <strong className='font-semibold text-primary'>Machi-Kunzult</strong></h1>
          <p className='font-secondary text-grey text-[14px] font-normal'>Welcome to Machi-Kunzult, please enter your login details below to continue.</p>
        </header>
        <form className='space-y-[12px]'>
          <TextField text='Email Address'/>
          <TextField text='Password' icon="eye"/>
          <p className='font-header font-semibold text-[14px] pb-[4px] text-primary-100'>Forgot the password?</p>
          <Button 
            text="Login"
            loading={loading}
            onClick={() => setLoading((prevState) => !prevState)}
          />
        </form>
        <div className={`${dividerCss} mx-auto relative w-fit px-[40px] bg-white font-header text-[14px] text-grey`}>
          OR
        </div>
          <Button 
            text="Signin with Google" 
            type='outline'
            icon="google"
          />
        <div className='text-[14px] text-grey font-regular'>Don't have an account? <strong className='font-semibold text-primary-100'>Sign Up</strong></div>
      </section>
    </div>
  )
}

export default App
