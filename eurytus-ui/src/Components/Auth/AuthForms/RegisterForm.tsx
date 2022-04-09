import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axios } from "../../../Api/eurytusInstance";
import { UserContext } from "../../../Contexts/UserContext";
import FloatingLabel from "../../FloatingLabel/FloatingLabel";

const RegisterForm = () => {

    const {setUser} = useContext(UserContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    let navigate = useNavigate();

    const register = () => {
        if(password===confirmPassword){
            axios.post('/users/auth/signup',{
                email: email,
                password: password,
                firstName: firstName, 
                lastName: lastName,
              })
              .then((res)=>{
                // console.log(res)
                axios.get('/users/auth/currentuser')
                  .then((res)=>{setUser(res.data.data); navigate('/challenges')})
                  .catch(err=>toast.error(err.response?.data.error||'There was an error fetching current user!'))
              })
              .catch(err=>{(typeof err.response.data.error === 'object')?err.response.data.error.map((err:{message: string, field: string})=>
                  toast.error(err.message)
              ):toast.error(err.response.data.error||'There was an error registering!')})
        }else{
            toast.error(`Passwords don't match!`)
        }
    }

    return (
        <form className="flex flex-wrap flex-col align-middle justify-center" onSubmit={(e)=>{e.preventDefault();register()}}>
            <h1 className="font-bold text-4xl mb-3">Register</h1>
            <FloatingLabel name="First Name" type="text" value={firstName} onChange={(val)=>setFirstName(val)}/>
            <FloatingLabel name="Last Name" type="text" value={lastName} onChange={(val)=>setLastName(val)}/>
            <FloatingLabel name="Email" type="email" value={email} onChange={(val)=>setEmail(val)}/>
            <FloatingLabel name="Password" type="password" value={password} onChange={(val)=>setPassword(val)}/>
            <FloatingLabel name="Confirm Password" type="password" value={confirmPassword} onChange={(val)=>setConfirmPassword(val)}/>
            <div className="w-full flex justify-center mt-4">
                <input type="submit" className="rounded-2xl border-solid bg-secondary text-white font-bold uppercase border py-3 px-11 md:w-6/12 transform transition duration-250 hover:scale-110" value="Register" />
            </div>
        </form>
    )
}

export default RegisterForm;