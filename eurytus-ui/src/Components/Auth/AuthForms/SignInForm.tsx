import FloatingLabel from "../../FloatingLabel/FloatingLabel";

interface SignInFormProps{
    setLogInPass(pass: string): void,
    setLogInMail(mail: string): void,
    logIn():void,
    logInMail: string
    logInPass: string
}

const SignInForm = ({setLogInPass, setLogInMail, logInMail, logInPass, logIn}: SignInFormProps) => {
    return(
        <form className="flex flex-wrap flex-col align-middle text-center justify-center">
            <h1 className="font-bold text-4xl mb-3">Sign in</h1>
            <FloatingLabel name="Email" type="Email" value={logInMail} onChange={setLogInMail}/>
            <FloatingLabel name="Password" type="password" value={logInPass} onChange={setLogInPass}/>
            <a className="text-sm m-4" href="#">Forgot your password?</a>
            <div className="w-full flex justify-center">
                <button className="rounded-2xl border-solid bg-secondary text-white font-bold uppercase border py-3 px-11 md:w-6/12 transform transition duration-250 hover:scale-110" onClick={(e)=>{e.preventDefault(); logIn()}}>Sign In</button>
            </div>
        </form>
    )
}

export default SignInForm;