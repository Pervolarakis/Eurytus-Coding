import React, { useContext, useEffect, useState } from "react";
import SignInForm from "./AuthForms/SignInForm";
import SignUpForm from "./AuthForms/SignUpForm";
import axios from "axios";
import { UserContext } from "../../Contexts/UserContext";
import {useNavigate} from 'react-router-dom'

function Auth() {
  let navigate = useNavigate();
  const {user, setUser} = useContext(UserContext);
  
  const [rightPanelActive, triggerRightPanelActive] = useState(true);

  const [logInMail, setLogInMail] = useState('');
  const [logInPass, setLogInPass] = useState('');

  const logIn = () => {
    axios.post('http://eurytus.com/api/v1/users/auth/login',{
      email: logInMail,
      password: logInPass
    })
    .then((res)=>{
      console.log(res)
      axios.get('http://eurytus.com/api/v1/users/auth/currentuser')
        .then((res)=>{setUser(res.data.data); navigate('/challenges')})
    })
    .catch((err)=>console.log(err))
  }

  return (
    <div className="flex justify-center flex-column align-middle mt-6">
      <div className="bg-white hidden shadow-xl max-h-[400px] m-auto w-6/12 xl:w-8/12 2xl:w-6/12 lg:w-9/12 md:w-11/12 md:flex justify-center flex-column relative align-middle rounded-2xl overflow-hidden">
        <div className={`w-2/4 py-14 px-7 ${rightPanelActive? 'transform -translate-x-0 duration-500 z-10': 'transform translate-x-full duration-500 opacity-0 z-0'}`}>
          <SignInForm logInMail={logInMail} logInPass={logInPass} setLogInMail={(mail)=> setLogInMail(mail)} setLogInPass={(pass)=> setLogInPass(pass)} logIn={logIn}/>
        </div>
        <div className={`py-14 px-7 w-2/4 ${rightPanelActive? 'transform -translate-x-full duration-500 opacity-0 z-0': 'transform translate-x-0 duration-500 z-10'}`}>
          <SignUpForm/>
        </div>
        
        <div className={`w-2/4 absolute left-0 h-full ${rightPanelActive? 'transform translate-x-full duration-500 opacity-0 z-0': 'transform -translate-x-0 duration-500 z-20 '}`}>
          <div className="h-full bg-gradient-to-r from-auth to-auth_secondary flex justify-center align-middle flex-col p-16">
            <h1 className="font-bold text-white text-3xl mb-6">Welcome Back!</h1>
            <p className="text-white text-lg mb-8">To keep connected with us please login with your personal info!</p>
            <div className="w-full flex justify-center">
              <button className="font-bold text-white border-white border-solid border p-2 rounded-2xl w-6/12 hover:bg-white hover:text-auth" onClick={()=>triggerRightPanelActive(true)}>Sign in</button>
            </div>
          </div>
        </div>
        
        <div className={`w-2/4 absolute right-0 h-full ${rightPanelActive? 'transform translate-x-0 duration-500 z-20': 'transform -translate-x-full duration-500 opacity-0 '}`}>
          <div className="h-full bg-gradient-to-l from-auth to-auth_secondary flex justify-center align-middle flex-col p-16">
            <h1 className="font-bold text-white text-3xl mb-6">Hello, There!</h1>
            <p className="text-white text-lg mb-8">Enter your personal details and start your journey with us!</p>
            <div className="w-full flex justify-center">
              <button className="font-bold text-white border-white border-solid border p-2 rounded-2xl w-6/12 hover:bg-white hover:text-auth" onClick={()=>triggerRightPanelActive(false)}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
      {/*mobile*/}
      <div className="md:hidden md:w-2/4 h-full w-10/12">
        <div className="bg-white shadow-xl min-h-[400px] m-auto sm:w-full flex justify-center flex-col relative align-middle rounded-2xl overflow-hidden">
          <div className="w-full flex justify-center">
            <div className="flex flex-row justify-around mt-12 shadow border w-72 rounded-3xl relative overflow-hidden">
              <button className={`z-20 p-2 font-bold text-xl ${rightPanelActive? 'text-white': ''}`} onClick={()=>triggerRightPanelActive(true)}>Log In</button>
              <button className={`z-20 p-2 font-bold text-xl ${!rightPanelActive? 'text-white': ''}`} onClick={()=>triggerRightPanelActive(false)}>Register</button>
              <div className={`w-1/2 h-full p-2 absolute left-0 z-10 rounded-3xl ${rightPanelActive?'bg-gradient-to-r from-auth to-auth_secondary transform translate-x-0 duration-500':'bg-gradient-to-l from-auth to-auth_secondary transform translate-x-full duration-500'}`}></div>
            </div>
          </div>
          
          <div className="flex flex-row h-full relative w-full justify-center">
            <div className={`left-0 py-7 px-7 absolute w-full md:w-5/6 xl:w-4/6 ${!rightPanelActive? 'transform -translate-x-full duration-500 opacity-0 z-0': 'z-10 transform translate-x-0 duration-500'}`}>
              <SignInForm logInMail={logInMail} logInPass={logInPass} setLogInMail={(mail)=> setLogInMail(mail)} setLogInPass={(pass)=> setLogInPass(pass)} logIn={logIn}/>
            </div>
            <div className={`left-0 py-7 px-7 w-full md:w-5/6 xl:w-4/6 ${rightPanelActive? 'transform translate-x-full duration-500 opacity-0 z-0 left-0': 'z-10 transform translate-x-0 duration-500'}`}>
              <SignUpForm/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;