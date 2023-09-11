import { useState } from 'react'

import Button from '../../../components/inputs/button'
import TextField from '../../../components/inputs/textfield'
import Notify from '../../../components/utils/Notify'
import validateInput from '../../../utils/validator'
import { useNavigate } from "react-router-dom";
import { setUser } from '../../../utils/localStorage'

function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({email: "", password: ""});

  const updateForm = (params: string, value: string) => {
    setForm({...form, [params]: value})
  }
  const mockVerification = (email: string, password: string) => {
    if (email != "asd@asd.com" || password != "Password123$$") {
      const error = "user cannot be found"
      Notify(error, 'error');
      throw new Error(error)
    }
  }
  const submitForm = () => {
    try {
      setLoading(true);
      // validations
      validateInput("email", form.email, `email cannot be blank`)
      validateInput("password", form.password, `password cannot be blank`)
      // timer
      const _timer = setTimeout(()=> {
        setLoading(false)
        // verifications
        clearTimeout(_timer)
        mockVerification(form.email, form.password)
        // successful
        Notify('Login Successful', 'success');
        navigate("/admin");
        setUser(form);
      }, 1000)
    } catch (error: unknown) {
      console.log((error as Error).message, 'eror')
      Notify((error as Error).message, 'error');
      setLoading(false);
    }
  }
  const dividerCss = 'after:content-[""] after:absolute after:block after:z-[-1] after:top-[45%] after:left-[-100%] after:w-[300%] after:h-[1px] after:bg-gray-200 after:sm:block after:hidden'
  const loginCardCss = 'grid place-items-center h-[calc(100vh)] inset-0 text-center';
  return (
    <main className={loginCardCss}>
      <section className='max-w-[450px] space-y-[20px] border-[1px] border-gray-200 rounded-lg py-[50px] px-[20px] sm:px-[50px] m-[10px]'>
        <header className='space-y-[14px] pb-[10px]'>
          <h1 className='font-header font-semibold text-[22px] pb-[4px]'>Sign in to <strong className='font-semibold text-primary'>Machi-Kunzult</strong></h1>
          <p className='font-secondary text-grey text-[14px] font-normal'>Welcome to Machi-Kunzult, please enter your login details below to continue.</p>
        </header>
        <form className='space-y-[12px]'>
          <TextField text='Email Address' type="email" value={form.email} onChange={(e) => updateForm("email", e.target.value)}/>
          <TextField text='Password' type='password' icon="eye" value={form.password} onChange={(e) => updateForm("password", e.target.value)}/>
          <p className='font-header font-semibold text-[14px] pb-[4px] text-primary-100 cursor-not-allowed'>Forgot the password?</p>
          <Button 
            text="Login"
            loading={loading}
            onClick={submitForm}
          />
        </form>
        <div className={`${dividerCss} mx-auto relative w-fit px-[40px] bg-white font-header text-[14px] text-grey`}>
          OR
        </div>
          <Button 
            text="Signin with Google" 
            type='outline'
            icon="google"
            disabled={true}
            className='cursor-not-allowed'
          />
        <div className='text-[14px] text-grey font-regular'>Don't have an account? <strong className='font-semibold text-primary-100 cursor-not-allowed'>Sign Up</strong></div>
      </section>
    </main>
  )
}

export default App
