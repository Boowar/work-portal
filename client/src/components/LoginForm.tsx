import { FC, useState } from "react";
import { useForm } from "react-hook-form";

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { login } from "../store/slice/authSlice";

interface ILoginForm {
    username: string;
    password: string;
}

const LoginForm: FC= () => {
    const dispatch = useDispatch<AppDispatch>();
    const { register, handleSubmit } = useForm<ILoginForm>();
    const [data, setData] = useState('');
    //const {login} = useActions()

    return (
        <div className="loginform">
            <form onSubmit={handleSubmit( (data) => {setData(JSON.stringify(data));
            console.log('loginform data:', data)
            dispatch(login(data))
        }              
                )}>
                <input {...register("username")} 
                    placeholder="Username" 
                    className="input"/>
                <input {...register("password")} 
                    placeholder="Password" 
                    type="password" 
                    className="input"/>
            <p>{data}</p>
            <input type="submit" className="submit-button"/>
            </form>
        </div>
    )
}

export default LoginForm