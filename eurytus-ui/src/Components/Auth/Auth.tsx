import React, { useEffect, useState } from "react";

function Auth() {

  const [rightPanelActive, triggerRightPanelActive] = useState(true);

  useEffect(()=>{
    console.log(rightPanelActive)
  },[rightPanelActive])

  return (
    <div className="flex justify-center flex-column align-middle mt-6">
      <div className="bg-white hidden shadow-xl max-h-[400px] m-auto w-6/12 xl:w-8/12 2xl:w-6/12 lg:w-9/12 md:w-11/12 md:flex justify-center flex-column relative align-middle rounded-2xl overflow-hidden">
        <div className={`w-2/4 ${rightPanelActive? 'transform -translate-x-0 duration-500 z-10': 'transform translate-x-full duration-500 opacity-0 z-0'}`}>
          <form className="flex flex-wrap flex-col align-middle text-center justify-center py-14 px-7">
            <h1 className="font-bold text-4xl mb-3">Sign in</h1>
            <input className="bg-gray-200 border-none m-2 p-3" type="email" placeholder="Email" />
            <input className="bg-gray-200 border-none m-2 p-3"  type="password" placeholder="Password" />
            <a className="text-sm m-4" href="#">Forgot your password?</a>
            <div className="w-full flex justify-center">
              <button className="rounded-2xl border-solid bg-secondary text-white font-bold uppercase border border-secondary py-3 px-11 focus:scale-90 w-8/12 xl:w-6/12 transform transition duration-500 hover:scale-110" onClick={(e)=>e.preventDefault()}>Sign In</button>
            </div>
          </form>
        </div>
        <div className={`w-2/4 ${rightPanelActive? 'transform -translate-x-full duration-500 opacity-0 z-0': 'transform translate-x-0 duration-500 z-10'}`}>
          <form className="flex flex-wrap flex-col align-middle justify-center py-14 px-7">
            <h1 className="font-bold text-4xl mb-3">Sign Up</h1>
            <input className="bg-gray-200 border-none m-2 p-3" type="text" placeholder="First Name" />
            <input className="bg-gray-200 border-none m-2 p-3"  type="text" placeholder="Last Name" />
            <input className="bg-gray-200 border-none m-2 p-3" type="email" placeholder="Email" />
            <input className="bg-gray-200 border-none m-2 p-3"  type="password" placeholder="Password" />
            <input className="bg-gray-200 border-none m-2 p-3"  type="password" placeholder="Confirm Password" />
            <div className="w-full flex justify-center">
              <button className="rounded-2xl border-solid bg-secondary text-white font-bold uppercase border border-secondary py-3 px-11 focus:scale-90 w-8/12 xl:w-6/12 transform transition duration-500 hover:scale-110" onClick={(e)=>e.preventDefault()}>Sign Up</button>
            </div>
          </form>
        </div>
        
        <div className={`w-2/4 absolute left-0 h-full ${rightPanelActive? 'transform translate-x-full duration-500 opacity-0 z-0': 'transform -translate-x-0 duration-500 z-20 '}`}>
          <div className="h-full bg-secondary flex justify-center align-middle flex-col p-16">
            <h1 className="font-bold text-white text-3xl mb-6">Welcome Back!</h1>
            <p className="text-white text-lg mb-8">To keep connected with us please login with your personal info!</p>
            <div className="w-full flex justify-center">
              <button className="font-bold text-white border-white border-solid border p-2 rounded-2xl w-8/12 xl:w-6/12 hover:bg-white hover:text-secondary" onClick={()=>triggerRightPanelActive(true)}>Sign in</button>
            </div>
          </div>
        </div>
        
        <div className={`w-2/4 absolute right-0 h-full ${rightPanelActive? 'transform translate-x-0 duration-500 z-20': 'transform -translate-x-full duration-500 opacity-0 '}`}>
          <div className="h-full bg-secondary flex justify-center align-middle flex-col p-16">
            <h1 className="font-bold text-white text-3xl mb-6">Hello, There!</h1>
            <p className="text-white text-lg mb-8">Enter your personal details and start your journey with us!</p>
            <div className="w-full flex justify-center">
              <button className="font-bold text-white border-white border-solid border p-2 rounded-2xl w-8/12 xl:w-6/12 hover:bg-white hover:text-secondary" onClick={()=>triggerRightPanelActive(false)}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
      {/*modile*/}
      <div className="md:hidden md:w-2/4 w-10/12">
        <div className="bg-white shadow-xl min-h-[400px] m-auto sm:w-full flex justify-center flex-col relative align-middle rounded-2xl overflow-hidden">
          <div className="w-full flex justify-center">
            <div className="flex flex-row justify-around mt-12 shadow border w-72 rounded-3xl relative overflow-hidden">
              <button className={`z-20 p-2 font-bold text-xl ${rightPanelActive? 'text-white': ''}`} onClick={()=>triggerRightPanelActive(true)}>Log In</button>
              <button className={`z-20 p-2 font-bold text-xl ${!rightPanelActive? 'text-white': ''}`} onClick={()=>triggerRightPanelActive(false)}>Register</button>
              <div className={`w-1/2 h-full p-2 bg-secondary absolute left-0 z-10 rounded-3xl ${rightPanelActive?'transform translate-x-0 duration-500':'transform translate-x-full duration-500'}`}></div>
            </div>
          </div>
          
          <div className="flex flex-row w-full justify-center">
            <form className={`left-0 flex flex-wrap flex-col align-middle text-center justify-center py-7 px-7 w-full md:w-5/6 xl:w-4/6 ${!rightPanelActive? 'transform -translate-x-full duration-500 opacity-0 z-0': 'z-10 transform translate-x-0 duration-500'}`}>
              <h1 className="font-bold text-4xl mb-3">Sign in</h1>
              <input className="bg-gray-200 border-none m-2 p-3" type="email" placeholder="Email" />
              <input className="bg-gray-200 border-none m-2 p-3"  type="password" placeholder="Password" />
              <a className="text-sm m-4" href="#">Forgot your password?</a>
              <div className="w-full flex justify-center">
                <button className="rounded-2xl border-solid bg-secondary text-white font-bold uppercase border border-secondary py-3 px-11 focus:scale-90 transform transition duration-500 hover:scale-110" onClick={(e)=>e.preventDefault()}>Sign In</button>
              </div>
            </form>
            <form className={`flex flex-wrap flex-col align-middle text-center absolute justify-center py-7 px-7 w-full md:w-5/6 xl:w-4/6 ${rightPanelActive? 'transform translate-x-full duration-500 opacity-0 z-0 left-0': 'z-10 transform translate-x-0 duration-500'}`}>
              <h1 className="font-bold text-4xl mb-3">Sign Up</h1>
              <input className="bg-gray-200 border-none m-2 p-3" type="text" placeholder="First Name" />
              <input className="bg-gray-200 border-none m-2 p-3"  type="text" placeholder="Last Name" />
              <input className="bg-gray-200 border-none m-2 p-3" type="email" placeholder="Email" />
              <input className="bg-gray-200 border-none m-2 p-3"  type="password" placeholder="Password" />
              <input className="bg-gray-200 border-none m-2 p-3"  type="password" placeholder="Confirm Password" />
              <div className="w-full flex justify-center">
                <button className="rounded-2xl border-solid bg-secondary text-white font-bold uppercase border border-secondary py-3 px-11 focus:scale-90 transform transition duration-500 hover:scale-110" onClick={(e)=>e.preventDefault()}>Sign Up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;