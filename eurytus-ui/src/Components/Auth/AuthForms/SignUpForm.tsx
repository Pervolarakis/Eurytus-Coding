import FloatingLabel from "../../FloatingLabel/FloatingLabel";

const SignUpForm = () => {
    return (
        <form className="flex flex-wrap flex-col align-middle justify-center">
            <h1 className="font-bold text-4xl mb-3">Sign Up</h1>
            <FloatingLabel name="First Name" type="text" value={""} onChange={()=>null}/>
            <FloatingLabel name="Last Name" type="text" value={""} onChange={()=>null}/>
            <FloatingLabel name="Email" type="email" value={""} onChange={()=>null}/>
            <FloatingLabel name="Password" type="password" value={""} onChange={()=>null}/>
            <FloatingLabel name="Confirm Password" type="password" value={""} onChange={()=>null}/>
            <div className="w-full flex justify-center mt-4">
                <button className="rounded-2xl border-solid bg-secondary text-white font-bold uppercase border py-3 px-11 md:w-6/12 transform transition duration-250 hover:scale-110" onClick={(e)=>e.preventDefault()}>Sign Up</button>
            </div>
        </form>
    )
}

export default SignUpForm;