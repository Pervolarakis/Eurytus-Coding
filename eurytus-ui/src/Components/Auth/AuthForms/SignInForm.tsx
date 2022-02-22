const SignInForm = () => {
    return(
        <form className="flex flex-wrap flex-col align-middle text-center justify-center">
            <h1 className="font-bold text-4xl mb-3">Sign in</h1>
            <input className="auth-input" type="email" placeholder="Email" />
            <input className="auth-input"  type="password" placeholder="Password" />
            <a className="text-sm m-4" href="#">Forgot your password?</a>
            <div className="w-full flex justify-center">
                <button className="rounded-2xl border-solid bg-gradient-to-r from-auth to-auth_secondary text-white font-bold uppercase border border-auth py-3 px-11 focus:scale-90 md:w-6/12 transform transition duration-500 hover:scale-110" onClick={(e)=>e.preventDefault()}>Sign In</button>
            </div>
        </form>
    )
}

export default SignInForm;