const SignUpForm = () => {
    return (
        <form className="flex flex-wrap flex-col align-middle justify-center">
            <h1 className="font-bold text-4xl mb-3">Sign Up</h1>
            <input className="auth-input" type="text" placeholder="First Name" />
            <input className="auth-input"  type="text" placeholder="Last Name" />
            <input className="auth-input" type="email" placeholder="Email" />
            <input className="auth-input"  type="password" placeholder="Password" />
            <input className="auth-input"  type="password" placeholder="Confirm Password" />
            <div className="w-full flex justify-center mt-4">
                <button className="rounded-2xl border-solid bg-gradient-to-l from-auth to-auth_secondary text-white font-bold uppercase border border-auth py-3 px-11 focus:scale-90 md:w-6/12 transform transition duration-500 hover:scale-110" onClick={(e)=>e.preventDefault()}>Sign Up</button>
            </div>
        </form>
    )
}

export default SignUpForm;