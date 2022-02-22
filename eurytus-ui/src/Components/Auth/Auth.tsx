import { useEffect, useState } from "react";
import LoginForm from "./AuthForms/LoginForm";
import RegisterForm from "./AuthForms/RegisterForm";
import {useParams} from 'react-router-dom'

function Auth() {

  const {page} = useParams();
  const [leftPanelActive, triggerLeftPanelActive] = useState(false);

  useEffect(()=>{
    if(page==='register'){
      triggerLeftPanelActive(false)
    }else{
      triggerLeftPanelActive(true)
    }
  },[page])



  return (
    <div className="flex justify-center flex-column align-middle mt-6">
      <div className="bg-white hidden shadow-xl max-h-[600px] m-auto w-6/12 xl:w-8/12 2xl:w-7/12 3xl:w-6/12 lg:w-9/12 md:w-11/12 md:flex justify-center flex-column relative align-middle rounded-2xl overflow-hidden">
        <div className={`w-2/4 py-14 px-7 ${leftPanelActive? 'transform -translate-x-0 duration-500 z-10': 'transform translate-x-full duration-500 opacity-0 z-0'}`}>
          <LoginForm/>
        </div>
        <div className={`py-14 px-7 w-2/4 ${leftPanelActive? 'transform -translate-x-full duration-500 opacity-0 z-0': 'transform translate-x-0 duration-500 z-10'}`}>
          <RegisterForm/>
        </div>
        
        <div className={`w-2/4 absolute left-0 h-full ${leftPanelActive? 'transform translate-x-full duration-500 opacity-0 z-0': 'transform -translate-x-0 duration-500 z-20 '}`}>
          <div className="h-full bg-secondary flex justify-center align-middle flex-col p-16">
            <h1 className="font-bold text-white text-3xl mb-6">Welcome Back!</h1>
            <p className="text-white text-lg mb-8">To keep connected with us please login with your personal info!</p>
            <div className="w-full flex justify-center">
              <button className="font-bold text-white border-white border-solid border p-2 rounded-2xl w-6/12 hover:bg-white hover:text-secondary" onClick={()=>triggerLeftPanelActive(true)}>Login</button>
            </div>
          </div>
        </div>
        
        <div className={`w-2/4 absolute right-0 h-full ${leftPanelActive? 'transform translate-x-0 duration-500 z-20': 'transform -translate-x-full duration-500 opacity-0 '}`}>
          <div className="h-full bg-secondary flex justify-center align-middle flex-col p-16">
            <h1 className="font-bold text-white text-3xl mb-6">Hello, There!</h1>
            <p className="text-white text-lg mb-8">Enter your personal details and start your journey with us!</p>
            <div className="w-full flex justify-center">
              <button className="font-bold text-white border-white border-solid border p-2 rounded-2xl w-6/12 hover:bg-white hover:text-secondary" onClick={()=>triggerLeftPanelActive(false)}>Register</button>
            </div>
          </div>
        </div>
      </div>
      {/*mobile*/}
      <div className="md:hidden md:w-2/4 h-full w-10/12">
        <div className="bg-white shadow-xl min-h-[400px] m-auto sm:w-full flex justify-center flex-col relative align-middle rounded-2xl overflow-hidden">
          <div className="w-full flex justify-center">
            <div className="flex flex-row justify-around mt-12 shadow border w-72 rounded-3xl relative overflow-hidden">
              <button className={`z-20 p-2 font-bold text-xl ${leftPanelActive? 'text-white': ''}`} onClick={()=>triggerLeftPanelActive(true)}>Login</button>
              <button className={`z-20 p-2 font-bold text-xl ${!leftPanelActive? 'text-white': ''}`} onClick={()=>triggerLeftPanelActive(false)}>Register</button>
              <div className={`w-1/2 h-full p-2 absolute left-0 z-10 rounded-3xl ${leftPanelActive?'bg-secondary transform translate-x-0 duration-500':'bg-secondary transform translate-x-full duration-500'}`}></div>
            </div>
          </div>
          
          <div className="flex flex-row h-full relative w-full justify-center">
            <div className={`left-0 py-7 px-7 absolute w-full md:w-5/6 xl:w-4/6 ${!leftPanelActive? 'transform -translate-x-full duration-500 opacity-0 z-0': 'z-10 transform translate-x-0 duration-500'}`}>
              <LoginForm/>
            </div>
            <div className={`left-0 py-7 px-7 w-full md:w-5/6 xl:w-4/6 ${leftPanelActive? 'transform translate-x-full duration-500 opacity-0 z-0 left-0': 'z-10 transform translate-x-0 duration-500'}`}>
              <RegisterForm/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;