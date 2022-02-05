import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axios } from "../../../Api/eurytusInstance";
import { UserContext } from "../../../Contexts/UserContext";
import FloatingLabel from "../../FloatingLabel/FloatingLabel";


const LoginForm = () => {
    
    const {user, setUser} = useContext(UserContext);
    const [logInMail, setLogInMail] = useState('');
    const [logInPass, setLogInPass] = useState('');
    let navigate = useNavigate();

    const logIn = () => {
        axios.post('/users/auth/login',{
          email: logInMail,
          password: logInPass
        })
        .then((res)=>{
          // console.log(res)
          axios.get('/users/auth/currentuser')
            .then((res)=>{setUser(res.data.data); navigate('/challenges')})
            .catch(err=>toast.error(err.response?.data.error||'There was an error fetching current user!'))
        })
        .catch(err=>toast.error(err.response?.data.error||'There was an error Logging in!'))
    }
    
    return(
        <form className="flex flex-wrap flex-col align-middle text-center justify-center">
            <h1 className="font-bold text-4xl mb-3">Login</h1>
            <FloatingLabel name="Email" type="Email" value={logInMail} onChange={setLogInMail}/>
            <FloatingLabel name="Password" type="password" value={logInPass} onChange={setLogInPass}/>
            <a className="text-sm m-4" href="#">Forgot your password?</a>
            <div className="w-full flex justify-center">
                <button className="rounded-2xl border-solid bg-secondary text-white font-bold uppercase border py-3 px-11 md:w-6/12 transform transition duration-250 hover:scale-110" onClick={(e)=>{e.preventDefault(); logIn()}}>Login</button>
            </div>
        </form>
    )
}

export default LoginForm;